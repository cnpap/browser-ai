import { Button } from "@heroui/react";
import { useDarkMode } from "../hooks/useDarkMode";

export default function ThemeToggle() {
  const { isDark, toggle } = useDarkMode();

  return (
    <Button
      isIconOnly
      size="sm"
      variant="light"
      aria-label={isDark ? "切换为浅色模式" : "切换为暗色模式"}
      onPress={() => toggle()}
      className="text-foreground/80 hover:bg-content2"
    >
      {isDark ? (
        // Moon icon for dark mode
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
            d="M8.5 2.5a5.5 5.5 0 105.0 9.0A6 6 0 018.5 2.5z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      ) : (
        // Sun icon for light mode
        <svg
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-foreground/90"
        >
          <circle
            cx="8"
            cy="8"
            r="3.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.5 1.5M11.5 11.5L13 13M13 3l-1.5 1.5M3 13l1.5-1.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </Button>
  );
}
