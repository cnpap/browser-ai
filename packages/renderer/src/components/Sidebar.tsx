import { useState } from "react";
import { NestedSidebar, sampleNestedItems } from "./sidebar/index";

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
        <div className="flex-1 overflow-auto py-2 px-2">
          <NestedSidebar
            defaultSelectedKey="home"
            items={sampleNestedItems}
            onSelect={(key) => {
              console.log("Selected:", key);
            }}
          />
        </div>
      ) : (
        <div className="flex-1" />
      )}
    </aside>
  );
}
