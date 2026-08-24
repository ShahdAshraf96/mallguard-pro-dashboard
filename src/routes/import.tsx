import { createFileRoute } from "@tanstack/react-router";

import { StubPage } from "@/components/layout/StubPage";

export const Route = createFileRoute("/import")({
  head: () => ({
    meta: [
      { title: "Import Data — MallGuard Pro" },
      { name: "description", content: "Import violation records from an Excel sheet." },
      { property: "og:title", content: "Import Data — MallGuard Pro" },
      { property: "og:description", content: "Import violation records from an Excel sheet." },
    ],
  }),
  component: () => <StubPage title="Import Data" />,
});
