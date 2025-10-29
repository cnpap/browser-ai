import { Button, Switch } from "@heroui/react";
import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";

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
  const [dark, setDark] = useState<boolean>(() => {
    try {
      return document.documentElement.classList.contains("dark");
    } catch {
      return false;
    }
  });

  useEffect(() => {
    onFullScreenChanged?.(setIsFullScreen);
  }, [onFullScreenChanged]);

  // Apply dark mode at the document root so Tailwind/HeroUI variants work globally
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      {/* Titlebar */}
      <div
        className={`flex h-10 items-center justify-between border-b border-divider bg-content1 px-3 ${
          isMac && isFullScreen ? "" : ""
        }`}
        style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
      >
        {/* App title */}
        <div className="select-none text-small font-medium">Browser AI</div>

        {/* Right side actions: theme toggle and (on Win/Linux) window controls */}
        <div
          className="flex items-center gap-2"
          style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
        >
          {/* Dark mode toggle */}
          <Switch
            size="sm"
            isSelected={dark}
            onValueChange={setDark}
            aria-label="Toggle dark mode"
            className="text-foreground/80"
          >
            Dark
          </Switch>

          {/* Window controls (Windows/Linux only) */}
          {!isMac && (
            <div className="flex items-center gap-1">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                aria-label="Minimize"
                onPress={() => send?.("window-controls", "minimize")}
                className="text-foreground/80 hover:bg-content2"
              >
                {/* Minimize Icon */}
                <svg
                  aria-hidden="true"
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-foreground/90"
                >
                  <path
                    d="M3 8.5h10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </Button>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                aria-label="Toggle maximize"
                onPress={() => send?.("window-controls", "toggle-maximize")}
                className="text-foreground/80 hover:bg-content2"
              >
                {/* Maximize Icon */}
                <svg
                  aria-hidden="true"
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-foreground/90"
                >
                  <rect
                    x="3"
                    y="3"
                    width="10"
                    height="10"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </Button>
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                color="danger"
                aria-label="Close"
                onPress={() => send?.("window-controls", "close")}
                className="hover:bg-danger/20"
              >
                {/* Close Icon */}
                <svg
                  aria-hidden="true"
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-danger"
                >
                  <path
                    d="M4.5 4.5l7 7m0-7l-7 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-auto p-4">{children}</div>
    </div>
  );
}
