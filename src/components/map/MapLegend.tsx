import { Building2, Camera } from "lucide-react";

const rows = [
  { color: "#dc2626", range: "16+", label: "Critical" },
  { color: "#f59e0b", range: "9 – 15", label: "High" },
  { color: "#16a34a", range: "3 – 8", label: "Moderate" },
  { color: "#2563eb", range: "0 – 2", label: "Low" },
];

export function MapLegend() {
  return (
    <div
      onPointerDown={(e) => e.stopPropagation()}
      className="absolute bottom-4 right-4 w-[188px] rounded-lg border border-panel-border bg-card p-3 shadow-panel"
    >
      <p className="text-[12px] font-semibold text-foreground">Legend</p>
      <p className="mt-0.5 text-[10px] text-muted-foreground">Heatmap (violations per camera)</p>
      <ul className="mt-2 space-y-1.5">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center gap-2 text-[11px]">
            <span
              className="size-2.5 shrink-0 rounded-full"
              style={{ background: r.color }}
              aria-hidden
            />
            <span className="w-[42px] font-medium text-foreground">{r.range}</span>
            <span className="text-muted-foreground">{r.label}</span>
          </li>
        ))}
      </ul>
      <div className="my-2 h-px bg-panel-border" />
      <ul className="space-y-1.5 text-[11px] text-muted-foreground">
        <li className="flex items-center gap-2">
          <Camera className="size-3.5 text-slate-500" />
          Camera
        </li>
        <li className="flex items-center gap-2">
          <Building2 className="size-3.5 text-slate-500" />
          Building
        </li>
      </ul>
    </div>
  );
}
