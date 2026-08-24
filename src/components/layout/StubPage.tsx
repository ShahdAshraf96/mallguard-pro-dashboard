import { AppShell, Panel } from "@/components/layout/AppShell";

export function StubPage({ title, note }: { title: string; note?: string }) {
  return (
    <AppShell>
      <Panel title={title}>
        <p className="text-sm text-muted-foreground">
          {note ?? "This section is coming in a later stage of the build."}
        </p>
      </Panel>
    </AppShell>
  );
}
