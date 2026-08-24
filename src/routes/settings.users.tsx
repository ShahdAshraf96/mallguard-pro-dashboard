import { createFileRoute } from "@tanstack/react-router";

import { StubPage } from "@/components/layout/StubPage";

export const Route = createFileRoute("/settings/users")({
  head: () => ({
    meta: [
      { title: "User Management — MallGuard Pro" },
      { name: "description", content: "Manage MallGuard Pro users and access." },
      { property: "og:title", content: "User Management — MallGuard Pro" },
      { property: "og:description", content: "Manage MallGuard Pro users and access." },
    ],
  }),
  component: () => <StubPage title="User Management" />,
});
