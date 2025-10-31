import { useClerk, useUser } from "@clerk/clerk-react";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import type { Key } from "react";

/**
 * User avatar component integrated with Clerk authentication.
 * Shows user's real avatar and provides logout functionality.
 */
export default function UserAvatar() {
  const { user } = useUser();
  const { signOut } = useClerk();

  // 获取用户信息，提供 fallback
  const userName = user?.fullName || user?.firstName || "用户";
  const userEmail = user?.primaryEmailAddress?.emailAddress || "";
  const userAvatar = user?.imageUrl;

  const onAction = async (key: Key) => {
    switch (String(key)) {
      case "profile": {
        // 这里可接入路由或打开"个人信息"面板，目前先示例提示
        try {
          // 在 Electron/网页环境均可用的最简提示
          window.alert?.("打开个人信息（示例）");
        } catch {
          // no-op
        }
        break;
      }
      case "logout": {
        try {
          const ok = window.confirm?.("确定要退出登录吗？");
          if (ok) {
            await signOut();
          }
        } catch (error) {
          console.error("退出登录失败:", error);
        }
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className="flex items-center">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          {/* 使用原生 button 包裹 Avatar，确保可点击与可聚焦 */}
          <button
            type="button"
            aria-label="打开用户菜单"
            className="rounded-sm p-0 outline-none focus-visible:ring-2 focus-visible:ring-primary hover:opacity-90"
          >
            <Avatar
              name={userName}
              size="sm"
              src={userAvatar}
              radius="sm"
              color="primary"
              className="bg-content2 text-foreground/90"
              showFallback
            />
          </button>
        </DropdownTrigger>

        <DropdownMenu
          aria-label="用户菜单"
          variant="flat"
          onAction={onAction}
          className="min-w-[180px]"
        >
          <DropdownItem
            key="profile"
            textValue="个人信息"
            description={userEmail}
          >
            个人信息
          </DropdownItem>
          <DropdownItem
            key="logout"
            textValue="退出登录"
            className="text-danger"
            color="danger"
          >
            退出登录
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
