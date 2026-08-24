import { createFileRoute } from "@tanstack/react-router";

import { StubPage } from "@/components/layout/StubPage";

export const Route = createFileRoute("/violations")({
  head: () => ({
    meta: [
      { title: "All Violations — MallGuard Pro" },
      { name: "description", content: "Every logged mall security violation." },
      { property: "og:title", content: "All Violations — MallGuard Pro" },
      { property: "og:description", content: "Every logged mall security violation." },
    ],
  }),
  component: () => <StubPage title="All Violations" />,
});
