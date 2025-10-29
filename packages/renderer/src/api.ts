import { AppController } from "backend/src/app.controller";
import { _http } from "vtzac";

// 从 URL 查询参数中读取后端地址（Electron 主进程在载入窗口时注入），否则回退到默认 3000 端口
function resolveBackendBaseUrl(): string {
  try {
    const params = new URLSearchParams(globalThis.location?.search ?? "");
    const injected = params.get("backendBaseUrl");
    if (injected?.startsWith("http")) {
      return injected;
    }
  } catch {
    // ignore
  }
  return "http://localhost:3000";
}

const controller = _http({
  ofetchOptions: {
    baseURL: resolveBackendBaseUrl(),
    timeout: 5000,
  },
});

export const app = controller.controller(AppController);
