import { app } from "electron";
import type { AppModule } from "./AppModule.js";
import type { ModuleContext } from "./ModuleContext.js";

class ModuleRunner {
  #promise: Promise<void>;

  constructor() {
    this.#promise = Promise.resolve();
  }

  init(module: AppModule) {
    const p = module.enable(this.#createModuleContext());

    if (p instanceof Promise) {
      this.#promise = this.#promise.then(() => p);
    }

    return this;
  }

  done(): Promise<void> {
    return this.#promise;
  }

  #createModuleContext(): ModuleContext {
    return {
      app,
    };
  }
}

export function createModuleRunner() {
  return new ModuleRunner();
}
