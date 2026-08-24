import { createFileRoute } from "@tanstack/react-router";

import { StubPage } from "@/components/layout/StubPage";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Interactive Mall Map — MallGuard Pro" },
      { name: "description", content: "Violation density across all mall buildings." },
      { property: "og:title", content: "Interactive Mall Map — MallGuard Pro" },
      { property: "og:description", content: "Violation density across all mall buildings." },
    ],
  }),
  component: () => <StubPage title="Interactive Mall Map" />,
});
