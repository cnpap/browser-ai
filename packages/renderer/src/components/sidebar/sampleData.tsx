import { Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { type SidebarItem, SidebarItemType } from "./types";

export const sampleNestedItems: SidebarItem[] = [
  {
    key: "home",
    href: "#",
    icon: "solar:home-2-linear",
    title: "首页",
  },
  {
    key: "projects",
    href: "#",
    icon: "solar:widget-2-outline",
    title: "项目",
    endContent: (
      <Icon
        className="text-default-400"
        icon="solar:add-circle-line-duotone"
        width={24}
      />
    ),
  },
  {
    key: "tasks",
    href: "#",
    icon: "solar:checklist-minimalistic-outline",
    title: "任务",
    endContent: (
      <Icon
        className="text-default-400"
        icon="solar:add-circle-line-duotone"
        width={24}
      />
    ),
  },
  {
    key: "team",
    href: "#",
    icon: "solar:users-group-two-rounded-outline",
    title: "团队",
  },
  {
    key: "tracker",
    href: "#",
    icon: "solar:sort-by-time-linear",
    title: "跟踪器",
    endContent: (
      <Chip size="sm" variant="flat">
        新
      </Chip>
    ),
  },
  {
    key: "analytics",
    href: "#",
    icon: "solar:chart-outline",
    title: "分析",
  },
  {
    key: "ai_capabilities",
    title: "AI 能力",
    icon: "solar:cpu-bolt-linear",
    type: SidebarItemType.Nest,
    items: [
      {
        key: "models",
        icon: "solar:cpu-linear",
        href: "#",
        title: "模型管理",
      },
      {
        key: "prompts",
        icon: "solar:notes-outline",
        href: "#",
        title: "Prompt 库",
      },
      {
        key: "chat",
        icon: "solar:chat-round-dots-linear",
        href: "#",
        title: "会话聊天",
      },
    ],
  },
  {
    key: "knowledge_base",
    title: "知识库",
    icon: "solar:book-2-linear",
    type: SidebarItemType.Nest,
    items: [
      {
        key: "collections",
        icon: "solar:folder-linear",
        href: "#",
        title: "知识库集合",
      },
      {
        key: "indexes",
        icon: "solar:magnifer-linear",
        href: "#",
        title: "索引检索",
      },
      {
        key: "faq",
        icon: "solar:question-circle-linear",
        href: "#",
        title: "FAQ 管理",
      },
    ],
  },
  {
    key: "settings",
    href: "#",
    icon: "solar:settings-outline",
    title: "设置",
  },
];
