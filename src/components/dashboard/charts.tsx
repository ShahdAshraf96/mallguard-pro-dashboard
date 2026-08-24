import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { violationsTrend } from "@/data/mockData";

export const donutColors = [
  "var(--status-blue)",
  "var(--status-green)",
  "var(--status-amber)",
  "var(--status-red)",
  "var(--status-purple)",
];

export function DonutChart({
  data,
  total,
}: {
  data: { name: string; value: number }[];
  total: number;
}) {
  return (
    <div className="relative size-[132px] shrink-0">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={40}
            outerRadius={64}
            paddingAngle={1}
            stroke="none"
            isAnimationActive={false}
          >
            {data.map((entry, i) => (
              <Cell key={entry.name} fill={donutColors[i % donutColors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-semibold">{total}</span>
        <span className="text-xs text-muted-foreground">Total</span>
      </div>
    </div>
  );
}

export function DonutLegend({
  data,
}: {
  data: { name: string; value: number; percent: number }[];
}) {
  return (
    <ul className="min-w-0 flex-1 space-y-2.5">
      {data.map((item, i) => (
        <li key={item.name} className="flex items-center gap-1.5 text-[13px]">
          <span
            className="size-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: donutColors[i % donutColors.length] }}
          />
          <span className="flex-1 truncate text-[12px] text-foreground/80">{item.name}</span>
          <span className="shrink-0 text-[12px] font-semibold">{item.percent}%</span>
          <span className="shrink-0 text-[12px] text-muted-foreground">({item.value})</span>
        </li>
      ))}
    </ul>
  );
}

export function HorizontalBars({
  data,
  color = "var(--status-blue)",
}: {
  data: { name: string; value: number; recorded?: boolean }[];
  color?: string;
}) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <ul className="space-y-3">
      {data.map((item) => {
        const muted = item.recorded === false;
        return (
          <li key={item.name} className="grid grid-cols-[130px_1fr_36px] items-center gap-3">
            <span
              className={`truncate text-[13px] ${muted ? "italic text-muted-foreground" : "text-foreground/80"}`}
            >
              {item.name}
            </span>
            <span className="h-2.5 rounded-full bg-muted">
              <span
                className="block h-2.5 rounded-full"
                style={{
                  width: `${Math.max(4, (item.value / max) * 100)}%`,
                  backgroundColor: muted ? "var(--color-muted-foreground)" : color,
                }}
              />
            </span>
            <span
              className={`text-right text-[13px] font-semibold ${muted ? "italic text-muted-foreground" : ""}`}
            >
              {item.value}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function TrendChart() {
  return (
    <div className="h-[190px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={violationsTrend} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
          <CartesianGrid stroke="var(--panel-border)" vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            ticks={[1, 8, 15, 22, 29]}
            tickFormatter={(d: number) => `Jul ${d}`}
            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
          />
          <YAxis
            domain={[0, 40]}
            ticks={[0, 10, 20, 30, 40]}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
          />
          <Line
            type="monotone"
            dataKey="thisMonth"
            stroke="var(--brand)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="lastMonth"
            stroke="var(--status-blue)"
            strokeOpacity={0.55}
            strokeWidth={2}
            strokeDasharray="5 4"
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
