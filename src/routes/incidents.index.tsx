import { createFileRoute } from "@tanstack/react-router";

import { StubPage } from "@/components/layout/StubPage";

export const Route = createFileRoute("/incidents")({
  head: () => ({
    meta: [
      { title: "All Incidents — MallGuard Pro" },
      { name: "description", content: "Every logged mall incident." },
      { property: "og:title", content: "All Incidents — MallGuard Pro" },
      { property: "og:description", content: "Every logged mall incident." },
    ],
  }),
  component: () => <StubPage title="All Incidents" />,
});
