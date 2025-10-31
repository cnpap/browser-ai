import type { PropsWithChildren } from "react";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";
import Title from "./Title";
import UserAvatar from "./UserAvatar";
import WindowControls from "./WindowControls";

interface LayoutProps extends PropsWithChildren {
  showSidebar?: boolean;
  showUserAvatar?: boolean;
}

export default function Layout({
  children,
  showSidebar = true,
  showUserAvatar = true,
}: LayoutProps) {
  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      {/* Top bar */}
      <div
        className={`flex h-10 items-center justify-between border-b border-divider bg-content1 px-4`}
        style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
      >
        <Title />

        <div
          className="flex items-center gap-2"
          style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
        >
          {/* User avatar to the left of ThemeToggle */}
          {showUserAvatar && <UserAvatar />}
          <ThemeToggle />
          <WindowControls />
        </div>
      </div>

      {/* Main area with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {showSidebar && <Sidebar />}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
