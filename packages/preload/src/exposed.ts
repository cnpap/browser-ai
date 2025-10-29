import { contextBridge } from "electron";
import * as exports from "./index.js";

const isExport = (key: string): key is keyof typeof exports =>
  Object.hasOwn(exports, key);

// Avoid dynamic namespace property access; iterate entries instead
for (const [key, value] of Object.entries(exports) as Array<
  [string, unknown]
>) {
  if (isExport(key)) {
    contextBridge.exposeInMainWorld(btoa(key), value);
  }
}

// Re-export for tests
export * from "./index.js";
