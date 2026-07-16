import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <AppShell>
      <PageHeader title="Settings" description="Manage workspace preferences and security options." />

      <div className="grid gap-6 max-w-3xl">
        <Card className="shadow-soft">
          <CardHeader><CardTitle className="text-base">Workspace</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs">Workspace name</Label>
              <Input defaultValue="Exchange HQ" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Support email</Label>
              <Input defaultValue="support@exchange.io" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader><CardTitle className="text-base">Notifications</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Toggle title="Email me when a company uploads a file" defaultOn />
            <Separator />
            <Toggle title="Weekly activity digest" defaultOn />
            <Separator />
            <Toggle title="Product announcements" />
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader><CardTitle className="text-base">Security</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Toggle title="Require 2FA for administrators" defaultOn />
            <Separator />
            <Toggle title="Auto-expire download links after 7 days" defaultOn />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={() => toast.success("Settings saved")}>Save changes</Button>
        </div>
      </div>
    </AppShell>
  );
}

function Toggle({ title, defaultOn }: { title: string; defaultOn?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm">{title}</div>
      <Switch defaultChecked={defaultOn} />
    </div>
  );
}
