import { Panel } from "@/components/layout/AppShell";
import { topCameras } from "@/data/mockData";

const rankColors = ["#dc2626", "#ea580c", "#f59e0b", "#16a34a", "#2563eb"];

export function TopCameras() {
  const max = Math.max(...topCameras.map((c) => c.violations), 1);

  return (
    <Panel
      title="Top Cameras by Violations"
      action={
        <button type="button" className="text-[12px] font-medium text-brand hover:underline">
          View All
        </button>
      }
    >
      <ul className="space-y-2.5">
        {topCameras.map((c, i) => (
          <li key={c.id} className="flex items-center gap-3">
            <span className="w-4 text-right text-[12px] font-semibold text-muted-foreground">
              {i + 1}
            </span>
            <span className="w-[104px] shrink-0 text-[12.5px] font-medium text-foreground">
              {c.id}
            </span>
            <div className="h-2.5 flex-1 rounded-full bg-slate-100">
              <div
                className="h-2.5 rounded-full"
                style={{
                  width: `${(c.violations / max) * 100}%`,
                  background: rankColors[i] ?? rankColors[rankColors.length - 1],
                }}
              />
            </div>
            <span className="w-8 text-right text-[12.5px] font-semibold text-foreground">
              {c.violations}
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
