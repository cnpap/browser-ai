/**
 * Typed, ergonomic accessor for values exposed by the Electron preload script.
 *
 * Preload exposes values on `globalThis` using base64-encoded keys of their export names,
 * e.g. `globalThis[btoa('send')]`, `globalThis[btoa('platform')]`, etc.
 * This wrapper lets you call `g.platform()` or `g.send(...)` in renderer code
 * with proper TypeScript types, without touching `globalThis` directly.
 */

type PreloadAPI = {
  versions: NodeJS.ProcessVersions;
  sha256sum: (data: string | ArrayBuffer | ArrayBufferView) => string;
  send: (channel: string, message: string) => Promise<unknown>;
  platform: NodeJS.Platform;
  onFullScreenChanged: (cb: (isFullScreen: boolean) => void) => void;
};

function getGlobal<T extends keyof PreloadAPI>(
  key: T,
): PreloadAPI[T] | undefined {
  try {
    return (globalThis as unknown as Record<string, unknown>)[
      btoa(key)
    ] as PreloadAPI[T];
  } catch {
    return undefined;
  }
}

export const g = {
  versions(): PreloadAPI["versions"] | undefined {
    return getGlobal("versions");
  },
  sha256sum(
    data: Parameters<PreloadAPI["sha256sum"]>[0],
  ): ReturnType<PreloadAPI["sha256sum"]> | undefined {
    const fn = getGlobal("sha256sum");
    return fn ? fn(data as never) : undefined;
  },
  send(channel: string, message: string): Promise<unknown> | undefined {
    const fn = getGlobal("send");
    return fn?.(channel, message);
  },
  platform(): PreloadAPI["platform"] | undefined {
    return getGlobal("platform");
  },
  onFullScreenChanged(cb: (isFullScreen: boolean) => void): void {
    const fn = getGlobal("onFullScreenChanged");
    if (fn) {
      fn(cb);
    }
  },
} satisfies {
  versions: () => PreloadAPI["versions"] | undefined;
  sha256sum: (
    data: Parameters<PreloadAPI["sha256sum"]>[0],
  ) => ReturnType<PreloadAPI["sha256sum"]> | undefined;
  send: (channel: string, message: string) => Promise<unknown> | undefined;
  platform: () => PreloadAPI["platform"] | undefined;
  onFullScreenChanged: (cb: (isFullScreen: boolean) => void) => void;
};

export const get = <T extends keyof PreloadAPI>(
  key: T,
): PreloadAPI[T] | undefined => getGlobal(key);
