import { createFileRoute } from "@tanstack/react-router";

import { StubPage } from "@/components/layout/StubPage";

export const Route = createFileRoute("/violations/analytics")({
  head: () => ({
    meta: [
      { title: "Violation Analytics — MallGuard Pro" },
      { name: "description", content: "Trends and breakdowns for mall violations." },
      { property: "og:title", content: "Violation Analytics — MallGuard Pro" },
      { property: "og:description", content: "Trends and breakdowns for mall violations." },
    ],
  }),
  component: () => <StubPage title="Violation Analytics" />,
});
