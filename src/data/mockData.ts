/**
 * Single source of mock data for MallGuard Pro.
 * Swap this module for a real API client later — components import from here only.
 */

import { getSite } from "@/config/sites";

export const currentPeriod = {
  label: "1 Jul – 31 Jul, 2026",
  monthName: "July 2026",
  previousMonthName: "June",
};

export type Kpi = {
  id: string;
  label: string;
  value: string;
  deltaText?: string;
  deltaDirection?: "up" | "down";
  note: string;
  tone: "red" | "amber" | "blue" | "green";
};

export const dashboardKpis: Kpi[] = [
  {
    id: "total-violations",
    label: "Total Violations",
    value: "625",
    deltaText: "151.0%",
    deltaDirection: "up",
    note: "vs June",
    tone: "red",
  },
  {
    id: "total-incidents",
    label: "Total Incidents",
    value: "35",
    deltaText: "52.2%",
    deltaDirection: "up",
    note: "vs June",
    tone: "amber",
  },
  {
    id: "per-unit",
    label: "Violations per Active Unit",
    value: "6.2",
    note: "100 active tenants",
    tone: "blue",
  },
  {
    id: "cameras",
    label: "Cameras Triggered",
    value: "141",
    note: "of your camera fleet",
    tone: "green",
  },
];

export const reportingNotice =
  "The +151% jump is a reporting change, not a safety collapse — monitor names began being logged in July. Judge by the ratio KPIs, not the raw count.";

const site = getSite();
const b = (i: number): string => site.buildings[i] ?? `Building ${i + 1}`;

export const violationsByBuilding = [
  { name: b(2), value: 242, percent: 39 },
  { name: b(0), value: 183, percent: 29 },
  { name: b(3), value: 102, percent: 16 },
  { name: b(1), value: 94, percent: 15 },
];

export const totalViolations = 625;

export const incidentsByCategory = [
  { name: "Lost Property", value: 10 },
  { name: "Waste Management", value: 6 },
  { name: "Facility Damage", value: 4 },
  { name: "Drug Abuse", value: 3 },
  { name: "Physical Altercation", value: 3 },
  { name: "Medical Emergency", value: 3 },
];

const thisMonthSeries = [
  31, 19, 12, 16, 28, 33, 40, 32, 18, 13, 19, 24, 27, 27, 23, 20, 9, 17, 22, 18, 21, 13, 19, 9, 15,
  13, 19, 13, 21, 24, 10,
];

const lastMonthSeries = [
  17, 14, 9, 3, 2, 5, 3, 6, 10, 3, 7, 10, 2, 6, 6, 13, 7, 10, 3, 6, 4, 9, 5, 1, 15, 6, 8, 15, 16, 28,
];

export const violationsTrend = thisMonthSeries.map((value, index) => ({
  day: index + 1,
  thisMonth: value,
  lastMonth: lastMonthSeries[index] ?? null,
}));

export const topResponsibleParties = [
  { name: "Security", value: 83 },
  { name: "Stereo", value: 40 },
  { name: "Housekeeping", value: 30 },
  { name: "Italian House", value: 27 },
  { name: "The One", value: 26 },
];

export type BuildingOverview = {
  building: string;
  violations: number;
  tone: "red" | "amber" | "green";
};

export const mallOverview: BuildingOverview[] = [
  { building: b(0), violations: 183, tone: "amber" },
  { building: b(1), violations: 94, tone: "green" },
  { building: b(2), violations: 242, tone: "red" },
  { building: b(3), violations: 102, tone: "amber" },
];

export const recentActivity = [
  { description: "Opening/Closing violation", building: b(2), date: "Jul 31", tone: "red" },
  { description: "Waste at loading dock", building: b(0), date: "Jul 31", tone: "amber" },
  { description: "Corridor blocked by display", building: b(2), date: "Jul 30", tone: "blue" },
  { description: "Lost property (backpack)", building: b(1), date: "Jul 30", tone: "green" },
  { description: "Improper presence, cinema", building: b(3), date: "Jul 29", tone: "purple" },
] as const;

export const violationsByType = [
  { name: "Opening/Closing", value: 327, percent: 52 },
  { name: "Waste Mismanagement", value: 53, percent: 8 },
  { name: "Improper Presence", value: 39, percent: 6 },
  { name: "Misuse of Facilities", value: 35, percent: 6 },
  { name: "Other (9 types)", value: 171, percent: 27 },
];

export const recordsByMonitor = [
  { name: "Omar", value: 225, recorded: true },
  { name: "Mohamed", value: 104, recorded: true },
  { name: "Belal", value: 86, recorded: true },
  { name: "Fouad", value: 54, recorded: true },
  { name: "Abdelrahman", value: 49, recorded: true },
  { name: "Mostafa Adel", value: 35, recorded: true },
  { name: "Not recorded", value: 71, recorded: false },
];

export const monitorFootnote = "Reporting activity — not building risk. Blank for June.";

export const violationTypes = [
  "Opening/Closing Hours",
  "Waste Mismanagement",
  "Improper Presence",
  "Misuse of Facilities",
  "Safety & Security",
  "Operations & Discipline",
  "Blocking Corridors",
  "Visitor Disturbance",
  "Public Conduct",
  "Cleanliness & Appearance",
  "Facility Maintenance",
  "Security Reports",
  "Traffic & Movement",
];

export const notificationCount = 5;

export const currentUser = { name: "Shahd", role: "Admin" };

/* ---------------- Interactive map ---------------- */

const buildingCode = (name: string) => name.trim().slice(-1).toUpperCase();

export type MapBuilding = {
  id: string;
  name: string;
  code: string;
  /** percentage box within the map canvas */
  x: number;
  y: number;
  w: number;
  h: number;
};

const buildingBoxes = [
  { x: 8, y: 12, w: 36, h: 34 },
  { x: 52, y: 10, w: 38, h: 30 },
  { x: 10, y: 54, w: 40, h: 34 },
  { x: 58, y: 50, w: 32, h: 38 },
];

export const mapBuildings: MapBuilding[] = getSite().buildings.map((name, i) => ({
  id: `b-${i}`,
  name,
  code: buildingCode(name),
  ...(buildingBoxes[i % buildingBoxes.length] as { x: number; y: number; w: number; h: number }),
}));

export type MapCamera = {
  id: string;
  building: string;
  x: number;
  y: number;
  violations: number;
};

const cameraSeeds = [
  { code: "C", suffix: "9240", x: 26, y: 66, violations: 47 },
  { code: "C", suffix: "9417", x: 38, y: 78, violations: 30 },
  { code: "D", suffix: "9213", x: 72, y: 64, violations: 27 },
  { code: "B", suffix: "9201", x: 68, y: 22, violations: 25 },
  { code: "C", suffix: "9397", x: 18, y: 80, violations: 23 },
  { code: "A", suffix: "9108", x: 20, y: 24, violations: 14 },
  { code: "A", suffix: "9132", x: 34, y: 36, violations: 11 },
  { code: "B", suffix: "9244", x: 82, y: 30, violations: 7 },
  { code: "D", suffix: "9256", x: 84, y: 78, violations: 5 },
  { code: "A", suffix: "9171", x: 12, y: 40, violations: 2 },
];

export const mapCameras: MapCamera[] = cameraSeeds.map((c) => {
  const building = mapBuildings.find((b) => b.code === c.code) ?? mapBuildings[0]!;
  return {
    id: `Mall${building.code}-${c.suffix}`,
    building: building.name,
    x: c.x,
    y: c.y,
    violations: c.violations,
  };
});

export const topCameras = [...mapCameras]
  .sort((a, b) => b.violations - a.violations)
  .slice(0, 5);
