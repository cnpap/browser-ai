import { BrowserWindow, ipcMain } from "electron";
import type { AppModule } from "../AppModule.js";
import type { ModuleContext } from "../ModuleContext.js";

/**
 * IPC handlers to control the current BrowserWindow from the renderer.
 * Channel: 'window-controls' with payloads: 'minimize' | 'maximize' | 'unmaximize' | 'close' | 'toggle-maximize'
 */
export class WindowControlsIpc implements AppModule {
  enable(context: ModuleContext): Promise<void> | void {
    void context;
    // Ensure handlers are registered once
    ipcMain.handle("window-controls", (event, action: string) => {
      const win = BrowserWindow.fromWebContents(event.sender);
      if (!win) {
        return false;
      }

      switch (action) {
        case "minimize":
          win.minimize();
          return true;
        case "maximize":
          win.maximize();
          return true;
        case "unmaximize":
          win.unmaximize();
          return true;
        case "toggle-maximize":
          if (win.isMaximized()) {
            win.unmaximize();
          } else {
            win.maximize();
          }
          return true;
        case "close":
          win.close();
          return true;
        default:
          return false;
      }
    });
  }
}

export function windowControlsIpc(
  ...args: ConstructorParameters<typeof WindowControlsIpc>
) {
  return new WindowControlsIpc(...args);
}
