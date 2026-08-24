import { createFileRoute } from "@tanstack/react-router";

import { StubPage } from "@/components/layout/StubPage";

export const Route = createFileRoute("/incidents/analytics")({
  head: () => ({
    meta: [
      { title: "Incident Analytics — MallGuard Pro" },
      { name: "description", content: "Trends and breakdowns for mall incidents." },
      { property: "og:title", content: "Incident Analytics — MallGuard Pro" },
      { property: "og:description", content: "Trends and breakdowns for mall incidents." },
    ],
  }),
  component: () => <StubPage title="Incident Analytics" />,
});
