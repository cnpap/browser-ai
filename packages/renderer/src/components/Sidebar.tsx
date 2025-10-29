import {
  BookOpenText,
  Bot,
  Cog,
  FlaskConical,
  FolderTree,
  Gauge,
  Globe,
  KeyRound,
  Layers,
  LayoutDashboard,
  Link,
  MessageSquare,
  NotebookText,
  ScrollText,
  Search,
  Shield,
  Tags,
  Users,
  Wallet,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

type MenuItem = {
  key: string;
  label: string;
  icon?: React.ElementType;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

const sections: MenuSection[] = [
  {
    title: "总览",
    items: [{ key: "dashboard", label: "仪表盘", icon: LayoutDashboard }],
  },
  {
    title: "权限与用户",
    items: [
      { key: "users", label: "用户管理", icon: Users },
      { key: "roles", label: "角色与权限", icon: Shield },
      { key: "audit", label: "审计日志", icon: ScrollText },
    ],
  },
  {
    title: "AI 能力",
    items: [
      { key: "models", label: "模型管理", icon: FlaskConical },
      { key: "prompts", label: "Prompt 库", icon: NotebookText },
      { key: "chat", label: "会话 / 聊天", icon: MessageSquare },
      { key: "agents", label: "Agent / 工作流", icon: Bot },
      { key: "apikeys", label: "API 密钥", icon: KeyRound },
      { key: "metrics", label: "监控与指标", icon: Gauge },
      { key: "billing", label: "费用与配额", icon: Wallet },
      { key: "settings", label: "设置", icon: Cog },
    ],
  },
  {
    title: "知识库",
    items: [
      { key: "sources", label: "数据源连接器", icon: Link },
      { key: "collections", label: "知识库集合", icon: FolderTree },
      { key: "indexes", label: "索引与检索", icon: Search },
      { key: "taxonomy", label: "标签与分类", icon: Tags },
      { key: "faq", label: "Q&A / FAQ 管理", icon: BookOpenText },
      { key: "crawlers", label: "网页抓取任务", icon: Globe },
      { key: "resumes", label: "简历与职位库", icon: NotebookText },
      { key: "catalogs", label: "电商商品库", icon: Layers },
    ],
  },
];

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState<"blocks" | "menu">("menu");

  return (
    <aside className="flex h-full w-60 flex-col border-r border-divider bg-content1">
      {/* Tabs header */}
      <div className="px-2 py-2 flex items-center justify-center border-b border-divider">
        <div className="inline-flex rounded-md bg-content2 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("blocks")}
            className={
              "min-w-[64px] rounded-sm px-3 py-1 text-sm" +
              (activeTab === "blocks"
                ? " bg-content3 text-foreground"
                : " text-default-500 hover:text-foreground")
            }
          >
            块
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("menu")}
            className={
              "min-w-[64px] rounded-sm px-3 py-1 text-sm" +
              (activeTab === "menu"
                ? " bg-content3 text-foreground"
                : " text-default-500 hover:text-foreground")
            }
          >
            菜单
          </button>
        </div>
      </div>

      {/* Content area */}
      {activeTab === "menu" ? (
        <nav className="flex-1 overflow-auto py-2 px-2">
          {sections.map((section) => (
            <div key={section.title} className="mb-2">
              <div className="px-1 py-2 text-[11px] font-medium uppercase text-default-500">
                {section.title}
              </div>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.key}>
                    <button
                      type="button"
                      className="group flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-foreground/90 hover:bg-content2"
                      aria-label={item.label}
                    >
                      {item.icon ? (
                        <item.icon className="h-4 w-4 text-foreground/70 group-hover:text-foreground" />
                      ) : null}
                      <span className="truncate">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      ) : (
        <div className="flex-1" />
      )}
    </aside>
  );
}
