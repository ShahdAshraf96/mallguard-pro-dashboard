import { createFileRoute } from "@tanstack/react-router";

import { StubPage } from "@/components/layout/StubPage";

export const Route = createFileRoute("/buildings/$building")({
  head: () => ({
    meta: [
      { title: "Building — MallGuard Pro" },
      { name: "description", content: "Violations and incidents for a single mall building." },
      { property: "og:title", content: "Building — MallGuard Pro" },
      { property: "og:description", content: "Violations and incidents for a single mall building." },
    ],
  }),
  component: () => <StubPage title="Building" />,
});
