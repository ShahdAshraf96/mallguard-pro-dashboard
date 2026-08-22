import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Download, FileSpreadsheet, Plus, TriangleAlert } from "lucide-react";

import { AppShell, Panel } from "@/components/layout/AppShell";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { DonutChart, DonutLegend, HorizontalBars, TrendChart } from "@/components/dashboard/charts";
import {
  dashboardKpis,
  incidentsByCategory,
  mallOverview,
  monitorFootnote,
  recentActivity,
  recordsByMonitor,
  reportingNotice,
  topResponsibleParties,
  totalViolations,
  violationsByBuilding,
  violationsByType,
} from "@/data/mockData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — MallGuard Pro" },
      {
        name: "description",
        content:
          "MallGuard Pro dashboard: violations, incidents and camera activity across mall buildings for July 2026.",
      },
      { property: "og:title", content: "Dashboard — MallGuard Pro" },
      {
        property: "og:description",
        content:
          "Track violations, incidents and camera activity across every mall building in one dashboard.",
      },
    ],
  }),
  component: Dashboard,
});

const overviewTone: Record<string, string> = {
  red: "text-status-red",
  amber: "text-status-amber",
  green: "text-status-green",
};

const dotTone: Record<string, string> = {
  red: "bg-status-red",
  amber: "bg-status-amber",
  green: "bg-status-green",
  blue: "bg-status-blue",
  purple: "bg-status-purple",
};

function Dashboard() {
  return (
    <AppShell>
      <h1 className="sr-only">MallGuard Pro dashboard</h1>

      <div className="grid grid-cols-4 gap-5">
        {dashboardKpis.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-xl border border-notice-border bg-notice-bg px-5 py-4">
        <TriangleAlert className="mt-0.5 size-5 shrink-0 text-notice-border" />
        <p className="text-[13px] leading-relaxed text-notice-foreground">{reportingNotice}</p>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-5">
        <Panel title="Violations by Building">
          <div className="flex items-center gap-4">
            <DonutChart data={violationsByBuilding} total={totalViolations} />
            <DonutLegend data={violationsByBuilding} />
          </div>
        </Panel>

        <Panel title="Incidents by Category">
          <div className="pt-4">
            <HorizontalBars data={incidentsByCategory} color="var(--status-red)" />
          </div>
        </Panel>

        <Panel title="Violations Trend">
          <div className="mb-1 flex items-center gap-4 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-0.5 w-5 bg-brand" /> This Month
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-0.5 w-5 border-t-2 border-dashed border-status-blue/60" /> Last
              Month
            </span>
          </div>
          <TrendChart />
        </Panel>

        <Panel title="Top 5 Responsible Parties">
          <ul className="space-y-3.5 pt-2">
            {topResponsibleParties.map((party) => (
              <li key={party.name} className="flex items-center gap-3 text-[13px]">
                <span className="flex size-8 items-center justify-center rounded-full bg-brand/10 text-xs font-semibold text-brand">
                  {party.name.charAt(0)}
                </span>
                <span className="flex-1 truncate text-foreground/80">{party.name}</span>
                <span className="font-semibold">{party.value}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-5 grid grid-cols-[78%_1fr] gap-5">
        <Panel title="Mall Overview">
          <div className="relative h-[230px] overflow-hidden rounded-lg bg-gradient-to-b from-slate-200 to-slate-100">
            <div className="absolute inset-0 grid grid-cols-4 items-center gap-4 px-6">
              {mallOverview.map((b) => (
                <div
                  key={b.building}
                  className="rounded-lg border border-panel-border bg-card px-4 py-3 text-center shadow-panel"
                >
                  <div className="text-[13px] font-semibold">{b.building}</div>
                  <div className={`text-xl font-semibold ${overviewTone[b.tone]}`}>
                    {b.violations}
                  </div>
                  <div className="text-[11px] text-muted-foreground">violations</div>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel title="Quick Actions">
          <div className="space-y-3 pt-2">
            <Link
              to="/violations/new"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90"
            >
              <Plus className="size-4" /> Add Violation
            </Link>
            <Link
              to="/incidents/new"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-status-red/10 text-sm font-medium text-status-red transition-colors hover:bg-status-red/15"
            >
              <Plus className="size-4" /> Add Incident
            </Link>
            <Link
              to="/import"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-panel-border text-sm font-medium transition-colors hover:bg-muted"
            >
              <FileSpreadsheet className="size-4" /> Import Excel Sheet
            </Link>
            <button
              type="button"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-panel-border text-sm font-medium transition-colors hover:bg-muted"
            >
              <Download className="size-4" /> Export Report
            </button>
          </div>
        </Panel>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-5">
        <Panel
          title="Recent Activity"
          footer={
            <Link
              to="/violations"
              className="flex items-center justify-center gap-1 text-[13px] font-medium text-brand"
            >
              View All Activity <ArrowRight className="size-3.5" />
            </Link>
          }
        >
          <ul className="space-y-4 pt-1">
            {recentActivity.map((item) => (
              <li key={item.description} className="flex items-center gap-3 text-[13px]">
                <span className={`size-2.5 shrink-0 rounded-full ${dotTone[item.tone]}`} />
                <span className="flex-1 truncate">{item.description}</span>
                <span className="rounded bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                  {item.building}
                </span>
                <span className="w-12 text-right text-[11px] text-muted-foreground">
                  {item.date}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Violations by Type">
          <div className="flex items-center gap-4">
            <DonutChart data={violationsByType} total={totalViolations} />
            <DonutLegend data={violationsByType} />
          </div>
        </Panel>

        <Panel title="Records Logged by Monitor">
          <div className="pt-2">
            <HorizontalBars data={recordsByMonitor} />
            <p className="mt-4 text-[11px] italic text-muted-foreground">{monitorFootnote}</p>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
