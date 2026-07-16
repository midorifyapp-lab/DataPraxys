import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { useState } from "react";
import { auditLog } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/audit-log")({
  component: AuditLogPage,
});

const actionTones: Record<string, string> = {
  "Company Created": "bg-indigo-50 text-indigo-700",
  "Company Updated": "bg-blue-50 text-blue-700",
  "Password Changed": "bg-amber-50 text-amber-700",
  "File Uploaded": "bg-emerald-50 text-emerald-700",
  "File Downloaded": "bg-slate-100 text-slate-700",
  "File Deleted": "bg-rose-50 text-rose-700",
  "Login": "bg-teal-50 text-teal-700",
  "Logout": "bg-slate-100 text-slate-700",
};

function AuditLogPage() {
  const [q, setQ] = useState("");
  const filtered = auditLog.filter(
    (l) =>
      l.action.toLowerCase().includes(q.toLowerCase()) ||
      l.user.toLowerCase().includes(q.toLowerCase()) ||
      l.entity.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <AppShell>
      <PageHeader title="Audit Log" description="A complete history of actions performed across your workspace." />
      <Card className="shadow-soft">
        <div className="p-4 border-b">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search actions, users, entities..." className="pl-9" />
          </div>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead>Date</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((l) => (
                <TableRow key={l.id} className="hover:bg-muted/30">
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap font-mono text-xs">{l.date}</TableCell>
                  <TableCell className="text-sm">{l.user}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn("font-medium", actionTones[l.action])}>
                      {l.action}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium">{l.entity}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{l.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppShell>
  );
}
