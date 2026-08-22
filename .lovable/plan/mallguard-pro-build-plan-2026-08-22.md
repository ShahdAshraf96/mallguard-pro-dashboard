# MallGuard Pro — Build Plan

Desktop-only internal dashboard for tracking mall security violations. No backend, no database. All data lives in mock files so it can be swapped for a real API later.

I'll build this in the four stages you laid out, starting with Stage 1 now and pausing after it so you can review before I continue.

## Foundations (built in Stage 1, used by every stage)

- `src/config/sites.ts` — array of `{ id, name, buildings: string[], activeUnits: number }`. No mall name or building letter is ever hardcoded in a component; sidebar building items, dropdowns, charts and map wings all read from here.
- `src/data/mockData.ts` — single source for every number on screen (KPIs, chart series, tables, activity, monitors, cameras).
- Shared shell: 235px fixed dark-navy sidebar (#0b2545 → #0e2f57 gradient), expandable nav groups, blue #2563eb active pill, bottom "Collapse Menu"; 68px white top bar with hamburger, search, date range "1 Jul – 31 Jul, 2026", buildings dropdown, language dropdown, bell with red "5", Shahd / Admin avatar. Body #f1f5f9, white cards at 12px radius, 1px #e6eaf0 border, subtle shadow.

## Stage 1 — Shell + Dashboard

Rows exactly as specified: 4 KPI cards with pastel icon tiles; amber reporting-change notice bar; Violations by Building donut / Incidents by Category bars / Violations Trend two-line chart (0–40 axis, your 31-day and 30-day series) / Top 5 Responsible Parties; Mall Overview (78%) with four floating building cards plus Quick Actions column; Recent Activity / Violations by Type donut / Records Logged by Monitor bars including the italic grey "Not recorded 71" and the footnote.

Explicitly excluded everywhere: SLA, on-time/overdue, open/closed status counts, severity, health scores, clock times or relative timestamps, floor selectors, cost/fines/photos. No invented numbers — if a panel lacks data I'll leave it out and tell you.

## Stage 2 — Interactive Map

Floor Plan / Satellite toggle, four filter cards (Violation Type, Responsible Party, Monitor, Heatmap Intensity gradient), 2x2 wing floor plan with central atrium, radial heat blobs sized C > A > D > B, eight camera pins (red for the two hotspots) that select into a Camera Details panel with the MallC-9240 stats and recent-violation rows, and four bottom KPI cards. No floor selector, no severity filter.

## Stage 3 — All Violations

Filter bar with search plus Building / Type / Responsible Party / Monitor / date range and "Clear all". Sortable, zebra-striped table (ID, Date, Day, Type chip, Responsible Party, Camera, Building chip, Monitor, actions), missing monitor as italic grey "—", pagination "Showing 1–10 of 625", row click opens a detail drawer. Add/Edit modal with validation, fixed 13-item violation-type dropdown, building auto-filled from camera prefix but editable.

## Stage 4 — Import + Settings

Three-step import wizard (upload .xlsx, map columns with preview and unmatched-value warnings, confirm with imported/skipped summary). Settings page with Buildings, Cameras, Tenants, Violation Types, Monitors, Users tabs — each an editable list scoped to the active site, feeding the dropdowns app-wide.

## Technical notes

- TanStack Router file routes: `/` (dashboard), `/map`, `/violations`, `/import`, `/settings`, plus building/report/analytics stubs linked from the sidebar so no nav item dead-ends.
- Recharts for donuts, bars and the trend chart; lucide-react icons; shadcn/ui for dropdowns, dialog, drawer, tabs, table.
- Colours added as semantic tokens in `src/styles.css` (navy sidebar, blue accent, amber/green/red status) rather than hardcoded utility classes.
- Import wizard parses .xlsx client-side (SheetJS) and stores results in memory only — no persistence until a backend is added.
- No Supabase/Cloud is enabled at any stage.
