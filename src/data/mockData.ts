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

export const violationsByBuilding = [
  { name: site.buildings[2], value: 242, percent: 39 },
  { name: site.buildings[0], value: 183, percent: 29 },
  { name: site.buildings[3], value: 102, percent: 16 },
  { name: site.buildings[1], value: 94, percent: 15 },
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
  { building: site.buildings[0], violations: 183, tone: "amber" },
  { building: site.buildings[1], violations: 94, tone: "green" },
  { building: site.buildings[2], violations: 242, tone: "red" },
  { building: site.buildings[3], violations: 102, tone: "amber" },
];

export const recentActivity = [
  { description: "Opening/Closing violation", building: site.buildings[2], date: "Jul 31", tone: "red" },
  { description: "Waste at loading dock", building: site.buildings[0], date: "Jul 31", tone: "amber" },
  { description: "Corridor blocked by display", building: site.buildings[2], date: "Jul 30", tone: "blue" },
  { description: "Lost property (backpack)", building: site.buildings[1], date: "Jul 30", tone: "green" },
  { description: "Improper presence, cinema", building: site.buildings[3], date: "Jul 29", tone: "purple" },
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
