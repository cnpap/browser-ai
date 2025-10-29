import { BrowserWindow, globalShortcut } from "electron";
import type { AppModule } from "../AppModule.js";
import type { ModuleContext } from "../ModuleContext.js";

/**
 * Register global shortcuts to open DevTools in detached window mode.
 * - F12
 * - CommandOrControl+Shift+I
 */
export class DevToolsShortcuts implements AppModule {
  enable({ app }: ModuleContext): Promise<void> | void {
    app.whenReady().then(() => {
      const register = (accelerator: string) => {
        const ok = globalShortcut.register(accelerator, () => {
          const win = BrowserWindow.getFocusedWindow();
          if (win && !win.isDestroyed()) {
            win.webContents.openDevTools({ mode: "detach" });
          }
        });
        if (!ok && import.meta.env.DEV) {
          console.warn(`[shortcuts] failed to register: ${accelerator}`);
        }
      };

      register("F12");
      register("CommandOrControl+Shift+I");
    });

    app.on("will-quit", () => {
      globalShortcut.unregister("F12");
      globalShortcut.unregister("CommandOrControl+Shift+I");
    });
  }
}

export function devToolsShortcuts(
  ..._args: ConstructorParameters<typeof DevToolsShortcuts>
) {
  return new DevToolsShortcuts(...(_args as []));
}
