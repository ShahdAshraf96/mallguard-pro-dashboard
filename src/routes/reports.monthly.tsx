import { createFileRoute } from "@tanstack/react-router";

import { StubPage } from "@/components/layout/StubPage";

export const Route = createFileRoute("/reports/monthly")({
  head: () => ({
    meta: [
      { title: "Monthly Reports — MallGuard Pro" },
      { name: "description", content: "Monthly violation and incident reporting." },
      { property: "og:title", content: "Monthly Reports — MallGuard Pro" },
      { property: "og:description", content: "Monthly violation and incident reporting." },
    ],
  }),
  component: () => <StubPage title="Monthly Reports" />,
});
