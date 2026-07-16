import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, CompanyLogo } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Search, Download, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { files, companies } from "@/lib/mock-data";
import { StatusBadge } from "./index";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/file-exchange")({
  component: FileExchange,
});

function FileExchange() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [company, setCompany] = useState("all");

  const filtered = files.filter((f) => {
    const c = companies.find((c) => c.id === f.companyId);
    if (status !== "all" && f.status !== status) return false;
    if (company !== "all" && f.companyId !== company) return false;
    if (q && !f.filename.toLowerCase().includes(q.toLowerCase()) && !c?.name.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <AppShell>
      <PageHeader title="File Exchange" description="Every file sent to or received from partner companies." />

      <Card className="shadow-soft">
        <div className="p-4 flex flex-col md:flex-row gap-3 border-b">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search files or companies..." className="pl-9" />
          </div>
          <Select value={company} onValueChange={setCompany}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Company" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All companies</SelectItem>
              {companies.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="downloaded">Downloaded</SelectItem>
              <SelectItem value="deleted">Deleted</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead>Company</TableHead>
                <TableHead>Direction</TableHead>
                <TableHead>Filename</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Downloaded</TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((f) => {
                const c = companies.find((c) => c.id === f.companyId)!;
                return (
                  <TableRow key={f.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CompanyLogo initials={c.logo} id={c.id} size="sm" />
                        <span className="text-sm font-medium">{c.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={cn(
                        "inline-flex items-center gap-1 text-xs font-medium",
                        f.direction === "received" ? "text-emerald-600" : "text-indigo-600",
                      )}>
                        {f.direction === "received"
                          ? <><ArrowDownLeft className="h-3 w-3" /> Received</>
                          : <><ArrowUpRight className="h-3 w-3" /> Sent</>}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-sm">{f.filename}</TableCell>
                    <TableCell><StatusBadge status={f.status} /></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{f.sentDate}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{f.downloadedDate ?? "—"}</TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={7} className="text-center py-12 text-sm text-muted-foreground">No files match.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppShell>
  );
}
