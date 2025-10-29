import type { PropsWithChildren } from "react";
import ThemeToggle from "./ThemeToggle";
import Title from "./Title";
import WindowControls from "./WindowControls";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <div
        className={`flex h-10 items-center justify-between border-b border-divider bg-content1 px-3`}
        style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
      >
        <Title />

        <div
          className="flex items-center gap-2"
          style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
        >
          <ThemeToggle />
          <WindowControls />
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">{children}</div>
    </div>
  );
}
