import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ImagePlus, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/companies/new")({
  component: NewCompanyPage,
});

function NewCompanyPage() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Company created");
      navigate({ to: "/companies" });
    }, 600);
  };

  return (
    <AppShell>
      <div className="mb-4">
        <Button asChild variant="ghost" size="sm">
          <Link to="/companies"><ArrowLeft className="h-4 w-4" /> Back to companies</Link>
        </Button>
      </div>
      <PageHeader title="New company" description="Onboard a new partner company and its primary user." />

      <form onSubmit={submit} className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-soft">
            <CardHeader><CardTitle className="text-base">Company details</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <Field label="Company name" required><Input placeholder="Acme Global" /></Field>
              <Field label="RUC" required><Input placeholder="20512345678" /></Field>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader><CardTitle className="text-base">Primary user</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <Field label="Username" required><Input placeholder="jperez" /></Field>
              <Field label="Email" required><Input type="email" placeholder="j.perez@company.com" /></Field>
              <Field label="Position"><Input placeholder="Finance Manager" /></Field>
              <Field label="Password" required><Input type="password" placeholder="••••••••" /></Field>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader><CardTitle className="text-base">Company logo</CardTitle></CardHeader>
            <CardContent>
              <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-8 cursor-pointer hover:bg-muted/30 transition-colors">
                <div className="h-14 w-14 rounded-full bg-indigo-50 grid place-items-center">
                  <ImagePlus className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="text-sm font-medium">Upload logo</div>
                <div className="text-xs text-muted-foreground">PNG or JPG · up to 2MB</div>
                <input type="file" accept="image/*" className="sr-only" />
              </label>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-4 flex flex-col gap-2">
              <Button type="submit" disabled={saving}>{saving ? "Creating..." : "Create company"}</Button>
              <Button type="button" variant="outline" onClick={() => navigate({ to: "/companies" })}>Cancel</Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </AppShell>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
    </div>
  );
}
