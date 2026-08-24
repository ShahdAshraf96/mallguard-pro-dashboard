import { createFileRoute } from "@tanstack/react-router";

import { StubPage } from "@/components/layout/StubPage";

export const Route = createFileRoute("/settings/")({
  head: () => ({
    meta: [
      { title: "General Settings — MallGuard Pro" },
      { name: "description", content: "Configure buildings, cameras, tenants and lists." },
      { property: "og:title", content: "General Settings — MallGuard Pro" },
      { property: "og:description", content: "Configure buildings, cameras, tenants and lists." },
    ],
  }),
  component: () => <StubPage title="General Settings" />,
});
