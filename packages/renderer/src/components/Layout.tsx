import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import "./Layout.css";

export default function Layout({ children }: PropsWithChildren) {
  const send = (globalThis as Record<string, unknown>)["c2VuZA=="] as
    | ((channel: string, message: string) => Promise<unknown>)
    | undefined;
  const platform = (globalThis as Record<string, unknown>)["cGxhdGZvcm0="] as
    | string
    | undefined;
  const onFullScreenChanged = (globalThis as Record<string, unknown>)[
    "b25GdWxsU2NyZWVuQ2hhbmdlZA=="
  ] as ((cb: (isFullScreen: boolean) => void) => void) | undefined;

  const isMac = platform === "darwin";
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    onFullScreenChanged?.(setIsFullScreen);
  }, [onFullScreenChanged]);

  return (
    <div className="layout">
      <div
        className={`titlebar ${isMac ? "mac" : ""} ${
          isMac && isFullScreen ? "fullscreen" : ""
        }`}
      >
        <div className="window-title">Browser AI</div>
        {!isMac && (
          <div className="window-controls">
            <button
              className="win-btn"
              onClick={() => send?.("window-controls", "minimize")}
            >
              −
            </button>
            <button
              className="win-btn"
              onClick={() => send?.("window-controls", "toggle-maximize")}
            >
              ▢
            </button>
            <button
              className="win-btn close"
              onClick={() => send?.("window-controls", "close")}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      <div className="content">{children}</div>
    </div>
  );
}