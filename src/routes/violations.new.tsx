import { createFileRoute } from "@tanstack/react-router";

import { AppShell, Panel } from "@/components/layout/AppShell";

export const Route = createFileRoute("/violations/new")({
  head: () => ({
    meta: [
      { title: "Add New Violation — MallGuard Pro" },
      { name: "description", content: "Log a new mall security violation record." },
      { property: "og:title", content: "Add New Violation — MallGuard Pro" },
      { property: "og:description", content: "Log a new mall security violation record." },
    ],
  }),
  component: () => (
    <AppShell>
      <Panel title="Add New Violation">
        <p className="text-sm text-muted-foreground">
          The violation form arrives with the All Violations stage.
        </p>
      </Panel>
    </AppShell>
  ),
});
