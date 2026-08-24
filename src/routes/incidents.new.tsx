import { createFileRoute } from "@tanstack/react-router";

import { StubPage } from "@/components/layout/StubPage";

export const Route = createFileRoute("/incidents/new")({
  head: () => ({
    meta: [
      { title: "Add New Incident — MallGuard Pro" },
      { name: "description", content: "Log a new mall incident record." },
      { property: "og:title", content: "Add New Incident — MallGuard Pro" },
      { property: "og:description", content: "Log a new mall incident record." },
    ],
  }),
  component: () => <StubPage title="Add New Incident" />,
});
