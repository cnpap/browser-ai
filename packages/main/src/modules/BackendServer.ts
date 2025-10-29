import { createRequire } from "node:module";
import { ipcMain } from "electron";
import type { AppModule } from "../AppModule.js";
import type { ModuleContext } from "../ModuleContext.js";

// 从 backend 包导入启动函数
// 使用 backend 已编译后的产物（CJS），避免 Vite/esbuild 丢失 Nest 的装饰器元数据导致 DI 失败
const require = createRequire(import.meta.url);
const { bootstrap: startBackend } = require("backend/dist/bootstrap.js");

let backendBaseUrl: string | null = null;

export function getBackendBaseUrl(): string | null {
  return backendBaseUrl;
}

type Options = {
  preferredPort?: number; // 默认 3000
};

class BackendServer implements AppModule {
  readonly #preferredPort: number;

  constructor({ preferredPort = 3000 }: Options = {}) {
    this.#preferredPort = preferredPort;
  }

  async enable(_context: ModuleContext): Promise<void> {
    // 启动后端服务
    const result = await startBackend({ preferredPort: this.#preferredPort });
    backendBaseUrl = result.baseUrl;
    // 输出后端启动信息，便于定位端口/地址问题
    console.log("[backend] listening at:", backendBaseUrl);

    // 供渲染进程查询后端地址（备用）
    ipcMain.handle("backend:get-base-url", () => backendBaseUrl);
  }
}

export function createBackendServerModule(
  ...args: ConstructorParameters<typeof BackendServer>
) {
  return new BackendServer(...args);
}
