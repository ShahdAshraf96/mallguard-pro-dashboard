import { Link, useRouterState } from "@tanstack/react-router";
import {
  AlertTriangle,
  Building2,
  ChevronDown,
  ChevronLeft,
  ClipboardList,
  FileText,
  LayoutDashboard,
  MapPin,
  Settings,
} from "lucide-react";
import { useState } from "react";

import { getSite } from "@/config/sites";
import { cn } from "@/lib/utils";

type NavChild = { label: string; to: string };
type NavItem = {
  label: string;
  icon: typeof LayoutDashboard;
  to?: string;
  children?: NavChild[];
};

export function AppSidebar({
  collapsed,
  onToggleCollapse,
}: {
  collapsed: boolean;
  onToggleCollapse: () => void;
}) {
  const site = getSite();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const items: NavItem[] = [
    { label: "Dashboard", icon: LayoutDashboard, to: "/" },
    {
      label: "Violations",
      icon: ClipboardList,
      children: [
        { label: "All Violations", to: "/violations" },
        { label: "Add New Violation", to: "/violations/new" },
        { label: "Violation Analytics", to: "/violations/analytics" },
      ],
    },
    {
      label: "Incidents",
      icon: AlertTriangle,
      children: [
        { label: "All Incidents", to: "/incidents" },
        { label: "Add New Incident", to: "/incidents/new" },
        { label: "Incident Analytics", to: "/incidents/analytics" },
      ],
    },
    {
      label: "Buildings",
      icon: Building2,
      children: site.buildings.map((b) => ({
        label: b,
        to: `/buildings/${encodeURIComponent(b.toLowerCase().replace(/\s+/g, "-"))}`,
      })),
    },
    { label: "Interactive Map", icon: MapPin, to: "/map" },
    {
      label: "Reports",
      icon: FileText,
      children: [
        { label: "Monthly Reports", to: "/reports/monthly" },
        { label: "Building Reports", to: "/reports/buildings" },
        { label: "Responsible Party Reports", to: "/reports/parties" },
      ],
    },
    {
      label: "Settings",
      icon: Settings,
      children: [
        { label: "General Settings", to: "/settings" },
        { label: "User Management", to: "/settings/users" },
        { label: "Language", to: "/settings/language" },
      ],
    },
  ];

  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(items.filter((i) => i.children).map((i) => [i.label, true])),
  );

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex flex-col bg-gradient-to-b from-sidebar-top to-sidebar-bottom text-sidebar-foreground transition-[width] duration-200",
        collapsed ? "w-[76px]" : "w-[235px]",
      )}
    >
      <div className="flex items-center gap-3 px-5 py-4">
        <img
          src="/tmg-logo.png"
          alt="TMG"
          className="h-[28px] w-auto shrink-0"
        />
        {!collapsed && (
          <div className="min-w-0">
            <div className="truncate text-[15px] font-semibold leading-tight">
              MallGuard Pro
            </div>
            <div className="truncate text-[9.5px] text-sidebar-muted">
              Violations &amp; Incidents Management
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-visible px-3 pb-2">
        <div className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = item.to ? pathname === item.to : false;
            const childActive = item.children?.some((c) => pathname === c.to);

            if (item.to) {
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={cn(
                    "flex h-[34px] items-center gap-3 rounded-[9px] px-3 text-[12.5px] font-medium transition-colors",
                    isActive
                      ? "mx-3 w-[calc(100%-24px)] bg-[#2563eb] text-brand-foreground"
                      : "text-sidebar-foreground/85 hover:bg-white/8",
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              );
            }

            const expanded = open[item.label] ?? false;
            return (
              <div key={item.label} className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => setOpen((o) => ({ ...o, [item.label]: !expanded }))}
                  className={cn(
                    "flex h-[34px] w-full items-center gap-3 rounded-[9px] px-3 text-[12.5px] font-medium transition-colors",
                    childActive
                      ? "mx-3 w-[calc(100%-24px)] bg-[#2563eb] text-brand-foreground"
                      : "text-sidebar-foreground/85 hover:bg-white/8",
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 truncate text-left">{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "size-4 transition-transform",
                          expanded ? "rotate-180" : "rotate-0",
                        )}
                      />
                    </>
                  )}
                </button>
                {!collapsed && expanded && (
                  <div className="space-y-0.5">
                    {item.children!.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className={cn(
                          "flex h-[27px] items-center rounded-lg pl-10 pr-3 text-[11px] transition-colors",
                          pathname === child.to
                            ? "bg-[#2563eb] text-brand-foreground"
                            : "text-[#9fb4cf] hover:text-white",
                        )}
                      >
                        <span className="truncate">{child.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      <div className="px-3 pb-2 pt-1">
        <div className="px-3 pb-2 text-[9px] text-[#5f7799]">Talaat Moustafa Group</div>
        <button
          type="button"
          onClick={onToggleCollapse}
          className="flex w-full items-center justify-between rounded-lg border border-white/12 px-3 py-2.5 text-[13px] text-sidebar-muted transition-colors hover:text-sidebar-foreground"
        >
          {!collapsed && <span>Collapse Menu</span>}
          <ChevronLeft className={cn("size-4", collapsed && "rotate-180")} />
        </button>
      </div>
    </aside>
  );
}
