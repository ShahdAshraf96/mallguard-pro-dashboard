import { useState, type ReactNode } from "react";

import { AppSidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed((c) => !c)} />
      <div
        className="flex min-h-screen flex-col transition-[padding] duration-200"
        style={{ paddingLeft: collapsed ? 76 : 235 }}
      >
        <TopBar onToggleSidebar={() => setCollapsed((c) => !c)} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

export function Panel({
  title,
  action,
  children,
  className,
  footer,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
}) {
  return (
    <section
      className={`flex flex-col rounded-xl border border-panel-border bg-card shadow-panel ${className ?? ""}`}
    >
      {title && (
        <header className="flex items-center justify-between px-5 pb-2 pt-4">
          <h2 className="text-[15px] font-semibold text-foreground">{title}</h2>
          {action}
        </header>
      )}
      <div className="flex-1 px-5 pb-5 pt-2">{children}</div>
      {footer && <div className="border-t border-panel-border px-5 py-3">{footer}</div>}
    </section>
  );
}
