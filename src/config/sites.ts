export type Site = {
  id: string;
  name: string;
  buildings: string[];
  activeUnits: number;
};

export const sites: Site[] = [
  {
    id: "gateway",
    name: "Gateway Mall",
    buildings: ["Building A", "Building B", "Building C", "Building D"],
    activeUnits: 100,
  },
];

export const defaultSiteId = sites[0].id;

export function getSite(siteId: string = defaultSiteId): Site {
  return sites.find((s) => s.id === siteId) ?? sites[0];
}
