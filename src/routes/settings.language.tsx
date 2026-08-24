import { createFileRoute } from "@tanstack/react-router";

import { StubPage } from "@/components/layout/StubPage";

export const Route = createFileRoute("/settings/language")({
  head: () => ({
    meta: [
      { title: "Language — MallGuard Pro" },
      { name: "description", content: "Choose the dashboard language." },
      { property: "og:title", content: "Language — MallGuard Pro" },
      { property: "og:description", content: "Choose the dashboard language." },
    ],
  }),
  component: () => <StubPage title="Language" />,
});
