import { Bell, Building2, CalendarDays, ChevronDown, Globe, Menu, Search } from "lucide-react";

import { getSite } from "@/config/sites";
import { currentPeriod, currentUser, notificationCount } from "@/data/mockData";

function Pill({ icon: Icon, label }: { icon: typeof Globe; label: string }) {
  return (
    <button
      type="button"
      className="flex h-10 items-center gap-2 rounded-lg border border-panel-border bg-card px-3 text-[13px] text-foreground/80 transition-colors hover:bg-muted"
    >
      <Icon className="size-4 text-muted-foreground" />
      <span className="whitespace-nowrap">{label}</span>
      <ChevronDown className="size-4 text-muted-foreground" />
    </button>
  );
}

export function TopBar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const site = getSite();

  return (
    <header className="sticky top-0 z-20 flex h-[68px] items-center gap-4 border-b border-panel-border bg-card px-6">
      <button
        type="button"
        onClick={onToggleSidebar}
        aria-label="Toggle menu"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        <Menu className="size-5" />
      </button>

      <div className="relative w-[420px] max-w-[35%]">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search violations, incidents, cameras..."
          className="h-10 w-full rounded-lg border border-panel-border bg-card pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-brand"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <Pill icon={CalendarDays} label={currentPeriod.label} />
        <Pill icon={Building2} label={`All ${site.buildings.length > 0 ? "Buildings" : "Sites"}`} />
        <Pill icon={Globe} label="English" />

        <button type="button" aria-label="Notifications" className="relative px-1">
          <Bell className="size-5 text-muted-foreground" />
          <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-status-red text-[10px] font-semibold text-white">
            {notificationCount}
          </span>
        </button>

        <div className="flex items-center gap-2 pl-1">
          <span className="flex size-9 items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand">
            {currentUser.name.charAt(0)}
          </span>
          <div className="leading-tight">
            <div className="text-[13px] font-semibold">{currentUser.name}</div>
            <div className="text-[11px] text-muted-foreground">{currentUser.role}</div>
          </div>
          <ChevronDown className="size-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
