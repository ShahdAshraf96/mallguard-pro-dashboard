import { ArrowUp, Camera, ClipboardList, Store, TriangleAlert } from "lucide-react";

import type { Kpi } from "@/data/mockData";

const iconFor = {
  "total-violations": ClipboardList,
  "total-incidents": TriangleAlert,
  "per-unit": Store,
  cameras: Camera,
} as const;

const toneClasses: Record<Kpi["tone"], string> = {
  red: "bg-status-red/10 text-status-red",
  amber: "bg-status-amber/15 text-status-amber",
  blue: "bg-brand/10 text-brand",
  green: "bg-status-green/12 text-status-green",
};

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const Icon = iconFor[kpi.id as keyof typeof iconFor] ?? ClipboardList;

  return (
    <div className="flex items-center gap-4 rounded-xl border border-panel-border bg-card p-5 shadow-panel">
      <span
        className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${toneClasses[kpi.tone]}`}
      >
        <Icon className="size-6" />
      </span>
      <div className="min-w-0">
        <div className="text-[13px] text-muted-foreground">{kpi.label}</div>
        <div className="mt-0.5 text-[28px] font-semibold leading-none">{kpi.value}</div>
        <div className="mt-2 flex items-center gap-1 text-xs">
          {kpi.deltaText && (
            <span className="flex items-center gap-0.5 font-semibold text-status-red">
              <ArrowUp className="size-3" />
              {kpi.deltaText}
            </span>
          )}
          <span className="text-muted-foreground">{kpi.note}</span>
        </div>
      </div>
    </div>
  );
}
