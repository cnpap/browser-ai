import type { ElectronApplication, JSHandle } from "playwright";
import { _electron as electron } from "playwright";
import { expect, test as base, Page } from "@playwright/test";
import type { Page as PlaywrightPage } from "playwright";

import type { BrowserWindow } from "electron";
import { globSync } from "glob";
import { platform } from "node:process";
import { createHash } from "node:crypto";

process.env.PLAYWRIGHT_TEST = "true";

// Strongly-typed preload exposure keys (base64 of literal names)
const KEY_VERSIONS = "dmVyc2lvbnM=" as const; // btoa("versions")
const KEY_SHA256SUM = "c2hhMjU2c3Vt" as const; // btoa("sha256sum")
const KEY_SEND = "c2VuZA==" as const; // btoa("send")

type PreloadGlobals = {
  [KEY_VERSIONS]: NodeJS.ProcessVersions;
  [KEY_SHA256SUM]: (str: string) => string;
  [KEY_SEND]: (channel: string, ...args: unknown[]) => Promise<unknown>;
};

// Declare the types of your fixtures.
type TestFixtures = {
  page: PlaywrightPage;
  electronApp: ElectronApplication;
  electronVersions: NodeJS.ProcessVersions;
};

declare const g: <T extends keyof PreloadGlobals>(key: T) => PreloadGlobals[T];

const test = base.extend<TestFixtures>({
  electronApp: [
    async ({}, use) => {
      /**
       * Executable path depends on root package name!
       */
      let executablePattern = "dist/*/root{,.*}";
      if (platform === "darwin") {
        executablePattern += "/Contents/*/root";
      }

      const [executablePath] = globSync(executablePattern);
      if (!executablePath) {
        throw new Error("App Executable path not found");
      }

      const electronApp = await electron.launch({
        executablePath: executablePath,
        args: ["--no-sandbox"],
      });

      electronApp.on("console", (msg) => {
        if (msg.type() === "error") {
          console.error(`[electron][${msg.type()}] ${msg.text()}`);
        }
      });

      await use(electronApp);

      // This code runs after all the tests in the worker process.
      await electronApp.close();
    },
    { scope: "worker", auto: true } as any,
  ],

  page: async ({ electronApp }, use) => {
    const page = await electronApp.firstWindow();
    // capture errors
    page.on("pageerror", (error) => {
      console.error(error);
    });
    // capture console messages
    page.on("console", (msg) => {
      console.log(msg.text());
    });

    await page.waitForLoadState("load");
    // Inject a global accessor into the page context without using `any`
    await page.evaluate(() => {
      const get = <T extends keyof PreloadGlobals>(key: T): PreloadGlobals[T] =>
        (globalThis as unknown as PreloadGlobals)[key] as PreloadGlobals[T];
      (window as unknown as { g: typeof get }).g = get;
    });
    await use(page as Page);
  },

  electronVersions: async ({ electronApp }, use) => {
    await use(await electronApp.evaluate(() => process.versions));
  },
});

test("Main window state", async ({ electronApp, page }: TestFixtures) => {
  const window: JSHandle<BrowserWindow> = await electronApp.browserWindow(page);
  const windowState = await window.evaluate(
    (
      mainWindow
    ): Promise<{
      isVisible: boolean;
      isDevToolsOpened: boolean;
      isCrashed: boolean;
    }> => {
      const getState = () => ({
        isVisible: mainWindow.isVisible(),
        isDevToolsOpened: mainWindow.webContents.isDevToolsOpened(),
        isCrashed: mainWindow.webContents.isCrashed(),
      });

      return new Promise((resolve) => {
        /**
         * The main window is created hidden, and is shown only when it is ready.
         * See {@link ../packages/main/src/mainWindow.ts} function
         */
        if (mainWindow.isVisible()) {
          resolve(getState());
        } else {
          mainWindow.once("ready-to-show", () => resolve(getState()));
        }
      });
    }
  );

  expect(windowState.isCrashed, "The app has crashed").toEqual(false);
  expect(windowState.isVisible, "The main window was not visible").toEqual(
    true
  );
  expect(windowState.isDevToolsOpened, "The DevTools panel was open").toEqual(
    false
  );
});

test.describe("Preload context should be exposed", async () => {
  test.describe(`versions should be exposed`, async () => {
    test("with same type`", async ({ page }) => {
      const type = await page.evaluate((k) => typeof g(k), KEY_VERSIONS);
      expect(type).toEqual("object");
    });

    test("with same value", async ({ page, electronVersions }) => {
      const value = await page.evaluate((k) => g(k), KEY_VERSIONS);
      expect(value).toEqual(electronVersions);
    });
  });

  test.describe(`sha256sum should be exposed`, async () => {
    test("with same type`", async ({ page }) => {
      const type = await page.evaluate((k) => typeof g(k), KEY_SHA256SUM);
      expect(type).toEqual("function");
    });

    test("with same behavior", async ({ page }) => {
      const testString = btoa(`${Date.now() * Math.random()}`);
      const expectedValue = createHash("sha256")
        .update(testString)
        .digest("hex");
      const value = await page.evaluate(({ k, str }) => g(k)(str), {
        k: KEY_SHA256SUM,
        str: testString,
      });
      expect(value).toEqual(expectedValue);
    });
  });

  test.describe(`send should be exposed`, async () => {
    test("with same type`", async ({ page }) => {
      const type = await page.evaluate((k) => typeof g(k), KEY_SEND);
      expect(type).toEqual("function");
    });

    test("with same behavior", async ({ page, electronApp }) => {
      await electronApp.evaluate(async ({ ipcMain }) => {
        ipcMain.handle("test", (_event, message) => btoa(message));
      });

      const testString = btoa(`${Date.now() * Math.random()}`);
      const expectedValue = btoa(testString);
      const value = await page.evaluate(
        async ({ k, str }) => await g(k)("test", str),
        { k: KEY_SEND, str: testString }
      );
      expect(value).toEqual(expectedValue);
    });
  });
});
