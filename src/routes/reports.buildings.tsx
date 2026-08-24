import { createFileRoute } from "@tanstack/react-router";

import { StubPage } from "@/components/layout/StubPage";

export const Route = createFileRoute("/reports/buildings")({
  head: () => ({
    meta: [
      { title: "Building Reports — MallGuard Pro" },
      { name: "description", content: "Per-building violation reporting." },
      { property: "og:title", content: "Building Reports — MallGuard Pro" },
      { property: "og:description", content: "Per-building violation reporting." },
    ],
  }),
  component: () => <StubPage title="Building Reports" />,
});
