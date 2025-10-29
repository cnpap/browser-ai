import { Button } from "@heroui/react";
import { usePlatform, usePreload } from "../hooks/usePreload";

export default function WindowControls() {
  const { send } = usePreload();
  const platform = usePlatform();
  const isMac = platform === "darwin";
  const isWeb = platform === undefined;

  if (isMac || isWeb) {
    return null;
  }

  return (
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
  );
}
