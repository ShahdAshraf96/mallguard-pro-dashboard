# MallGuard Watch

Lovable prompts — MallGuard Pro

Paste these one at a time, in order. Attach the design image to Prompt 1 only. Wait for each build to finish and check it before sending the next.

PROMPT 1 — Shell + Dashboard (attach the image)

Build a desktop-only internal dashboard called "MallGuard Pro" for tracking
security violations across shopping mall buildings. Match the attached design
image closely — layout, spacing, and colours.

STACK
React + TypeScript, Tailwind, shadcn/ui, Recharts, lucide-react icons.
No backend and no database yet. Put ALL data in a single file `src/data/mockData.ts`
so it can be swapped for a real API later.

MULTI-SITE REQUIREMENT (important)
This app must work for several different malls, not just this one. Nothing about
"Gateway Mall" or buildings "A/B/C/D" may be hardcoded in components. Put the site
configuration in `src/config/sites.ts` as an array of objects:
{ id, name, buildings: string[], activeUnits: number }
Every component reads building names from that config. Adding a mall with buildings
called "North/South/Plaza" must require zero component changes.

LAYOUT
Left sidebar, 235px, dark navy (#0b2545 to #0e2f57 vertical gradient), fixed:
- Shield logo, title "MallGuard Pro", subtitle "Violations & Incidents Management"
- Nav with expandable sub-items:
  Dashboard
  Violations > All Violations, Add New Violation, Violation Analytics
  Incidents > All Incidents, Add New Incident, Incident Analytics
  Buildings > (one item per building from site config)
  Interactive Map
  Reports > Monthly Reports, Building Reports, Responsible Party Reports
  Settings > General Settings, User Management, Language
- Active item is a blue (#2563eb) rounded pill
- "Collapse Menu" button pinned to the bottom

Top bar, white, 68px: hamburger, wide search input, date-range picker
("1 Jul – 31 Jul, 2026"), buildings dropdown, language dropdown, bell with red
badge "5", user avatar with name "Shahd" and role "Admin".

Body background #f1f5f9. White cards, 12px radius, 1px #e6eaf0 border, subtle shadow.

DASHBOARD CONTENT (use these exact numbers)

Row 1 — four KPI cards, each with a pastel rounded icon tile on the left:
- Total Violations | 625 | red "▲ 151.0%" then grey "vs June"
- Total Incidents | 35 | red "▲ 52.2%" then grey "vs June"
- Violations per Active Unit | 6.2 | grey "100 active tenants"
- Cameras Triggered | 141 | grey "of your camera fleet"

Row 2 — a full-width amber notice bar (#fffbeb bg, #fcd34d border, warning icon):
"The +151% jump is a reporting change, not a safety collapse — monitor names began
being logged in July. Judge by the ratio KPIs, not the raw count."

Row 3 — four panels side by side:
1. "Violations by Building" — donut, centre label 625 / "Total", legend right showing
   percent and count: Building C 39% (242), Building A 29% (183), Building D 16% (102),
   Building B 15% (94)
2. "Incidents by Category" — horizontal bars: Lost Property 10, Waste Management 6,
   Facility Damage 4, Drug Abuse 3, Physical Altercation 3, Medical Emergency 3
3. "Violations Trend" — line chart, two series. Solid blue "This Month", dashed light
   blue "Last Month". Y axis 0–40. Data below.
4. "Top 5 Responsible Parties" — avatar circle, name, count right-aligned:
   Security 83, Stereo 40, Housekeeping 30, Italian House 27, The One 26

Row 4 — "Mall Overview" (78% width) plus "Quick Actions" (rest):
Mall Overview shows one white card per building floating over a placeholder image
area, each with building name and violation count: A 183 (amber), B 94 (green),
C 242 (red), D 102 (amber).
Quick Actions: Add Violation (solid blue), Add Incident (light red), Import Excel
Sheet (outline), Export Report (outline).

Row 5 — three panels:
1. "Recent Activity" — coloured dot, description, grey building chip, date:
   Opening/Closing violation | Building C | Jul 31
   Waste at loading dock | Building A | Jul 31
   Corridor blocked by display | Building C | Jul 30
   Lost property (backpack) | Building B | Jul 30
   Improper presence, cinema | Building D | Jul 29
   Footer link "View All Activity →"
2. "Violations by Type" — donut, centre 625 / "Total", legend with percent and count:
   Opening/Closing 52% (327), Waste Mismanagement 8% (53), Improper Presence 6% (39),
   Misuse of Facilities 6% (35), Other (9 types) 27% (171)
3. "Records Logged by Monitor" — horizontal bars: Omar 225, Mohamed 104, Belal 86,
   Fouad 54, Abdelrahman 49, Mostafa Adel 35, and "Not recorded" 71 in italic grey
   with a grey bar. Footnote: "Reporting activity — not building risk. Blank for June."

TREND DATA
This Month (Jul 1–31): 31,19,12,16,28,33,40,32,18,13,19,24,27,27,23,20,9,17,22,18,
21,13,19,9,15,13,19,13,21,24,10
Last Month (Jun): 17,14,9,3,2,5,3,6,10,3,7,10,2,6,6,13,7,10,3,6,4,9,5,1,15,6,8,15,16,28

DO NOT ADD ANY OF THE FOLLOWING — the source data does not contain them:
- SLA compliance, on-time / overdue percentages
- Open / Closed / Overdue status counts
- Severity levels or a severity filter
- Health scores for the mall or per building
- Clock times or relative timestamps like "2 min ago" (dates only)
- Floor selectors or floor-level data
- Cost, fine amounts, or photos
Invent no numbers. If a panel needs data not listed above, leave it out and tell me.


PROMPT 2 — Interactive Map

Add an "Interactive Map" page reachable from the sidebar.

Header: title "Interactive Mall Map", subtitle "Violation density across all
buildings — July 2026". Top right: "Map View" label with a two-button toggle,
"Floor Plan" (active, blue outline) and "Satellite".

Filter row — four cards: Violation Type (All Types), Responsible Party (All Parties),
Monitor (All Monitors), and a "Heatmap Intensity" card containing a Low-to-High
gradient bar going blue → green → amber → red.

Main area, roughly 75% width: a light beige floor-plan placeholder containing four
rectangular building wings in a 2x2 arrangement with a small central atrium.
Green pill labels: BUILDING A, BUILDING B, BUILDING C, BUILDING D.
Over each wing, draw soft radial heat blobs (red core fading through amber and green
to transparent) sized by violation volume — Building C is the hottest, then A, then
D, then B.
Camera pins: white circle with a camera icon, plus a white label chip to the right
showing the camera ID. Red pin for hotspots, blue otherwise:
  Building A: MallA-9343 (red), MallA-9268
  Building B: MallB-9201, MallB-9189
  Building C: MallC-9240 (red), MallC-9417
  Building D: MallD-9213, MallD-9204
Clicking a pin selects it and updates the details panel.

Right panel, "Camera Details", with a close X. Selected camera MallC-9240,
"Building C — Ground Floor". Grey stat rows:
  Total Violations (July) 47 (red)
  Rank among 141 cameras #1 (red)
  Distinct violation types 5
  Most common type Opening/Closing
  Top responsible party Stereo
Then "Recent Violations" with a "View All" link and red-dot rows:
  Opening/Closing Hours Jul 30, Waste accumulation Jul 29, Blocking corridor Jul 28,
  Improper presence Jul 27, Opening/Closing Hours Jul 26
Then a full-width blue "View All Violations" button.

Bottom: four KPI cards — Total Violations (map) 625, Cameras with violations 141,
Hotspots (10+ each) 16, Cameras with only 1 61.

No floor selector and no severity filter — that data does not exist.


PROMPT 3 — Violations table

Add an "All Violations" page.

Filter bar: search input ("Search camera, tenant or description…"), plus dropdowns
for Building, Violation Type, Responsible Party, Monitor, and a date range.
A "Clear all" link on the right.

Table columns: ID, Date, Day, Type, Responsible Party, Camera, Building, Monitor,
and a right-hand actions column with edit and delete icons.
- Type renders as a light blue rounded chip
- Building renders as a small grey square chip
- A missing monitor renders as an italic grey dash "—", never as an empty cell
- Sortable column headers, zebra striping, pagination showing "Showing 1–10 of 625"
- Clicking a row opens a side drawer with the full record including the description

Add an "Add / Edit Violation" modal with fields: Date, Camera reference, Violation
Type (dropdown from a fixed list — never free text), Responsible Party (dropdown),
Building (auto-filled from the camera reference prefix, editable), Monitor name
(optional), Description (textarea). Validate that required fields are present
before saving.

Violation type list: Opening/Closing Hours, Waste Mismanagement, Improper Presence,
Misuse of Facilities, Safety & Security, Operations & Discipline, Blocking Corridors,
Visitor Disturbance, Public Conduct, Cleanliness & Appearance, Facility Maintenance,
Security Reports, Traffic & Movement.


PROMPT 4 — Import and Settings

Add an "Import Data" page: a three-step wizard.
Step 1 upload an .xlsx file. Step 2 map spreadsheet columns to the fields Date,
Violation Type, Responsible Party, Camera Reference, Monitor, Description — with a
preview table and a warning list for any values not matching the known lists.
Step 3 confirm and show a summary of rows imported and rows skipped.

Add a "Settings" page with tabs: Buildings, Cameras, Tenants, Violation Types,
Monitors, Users. Each tab is a simple editable list with add, edit and delete.
These lists must be per-site, driven by the site config — changing them must change
the dropdowns everywhere else in the app.


Notes before you start

Lovable will try to connect Supabase. Decline for now — Prompts 1–4 need no backend.

If it invents SLA panels, severity badges or health scores anyway, reply: "Remove the SLA panel, severity levels and health score — that data does not exist."

After each prompt, ask it: "List anything you added that was not in my instructions." It usually admits the extras.

Export the code to GitHub early so you keep a copy independent of Lovable.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f19f85d3-6f2e-4904-b7d0-e32e154b91fe).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
