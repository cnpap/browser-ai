import { useEffect, useMemo, useState } from "react";
import { g } from "../lib/g";

type PreloadValues = {
  platform: NodeJS.Platform | undefined;
  versions: NodeJS.ProcessVersions | undefined;
  send: (channel: string, message: string) => Promise<unknown> | undefined;
  sha256sum: (
    data: string | ArrayBuffer | ArrayBufferView,
  ) => string | undefined;
  onFullScreenChanged: (cb: (isFullScreen: boolean) => void) => void;
};

/**
 * Read preload-exposed values once per component lifetime and provide
 * stable references to avoid repeated global lookups on re-render.
 */
export function usePreload(): PreloadValues {
  return useMemo(() => {
    return {
      platform: g.platform(),
      versions: g.versions(),
      send: g.send,
      sha256sum: (data) => g.sha256sum(data),
      onFullScreenChanged: g.onFullScreenChanged,
    };
  }, []);
}

/** Convenience hooks */
export function usePlatform(): NodeJS.Platform | undefined {
  return useMemo(() => g.platform(), []);
}

export function useVersions(): NodeJS.ProcessVersions | undefined {
  return useMemo(() => g.versions(), []);
}

/**
 * Subscribe to full screen changes from preload and expose a stable boolean state.
 * This keeps Layout and other components lightweight.
 */
export function useFullScreen(): boolean {
  const onFullScreenChanged = useMemo(() => g.onFullScreenChanged, []);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    onFullScreenChanged?.(setIsFullScreen);
  }, [onFullScreenChanged]);

  return isFullScreen;
}
