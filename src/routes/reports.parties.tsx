import { createFileRoute } from "@tanstack/react-router";

import { StubPage } from "@/components/layout/StubPage";

export const Route = createFileRoute("/reports/parties")({
  head: () => ({
    meta: [
      { title: "Responsible Party Reports — MallGuard Pro" },
      { name: "description", content: "Reporting by responsible party." },
      { property: "og:title", content: "Responsible Party Reports — MallGuard Pro" },
      { property: "og:description", content: "Reporting by responsible party." },
    ],
  }),
  component: () => <StubPage title="Responsible Party Reports" />,
});
