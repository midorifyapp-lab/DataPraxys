import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppShell, PageHeader, CompanyLogo } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Search, Filter, Plus, MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { companies as seed } from "@/lib/mock-data";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/companies/")({
  component: CompaniesPage,
});

function CompaniesPage() {
  const [q, setQ] = useState("");
  const [rows, setRows] = useState(seed);
  const navigate = useNavigate();

  const filtered = rows.filter(
    (c) =>
      c.name.toLowerCase().includes(q.toLowerCase()) ||
      c.ruc.includes(q) ||
      c.email.toLowerCase().includes(q.toLowerCase()),
  );

  const remove = (id: string) => {
    setRows((r) => r.filter((x) => x.id !== id));
    toast.success("Company deleted");
  };

  return (
    <AppShell>
      <PageHeader
        title="Companies"
        description="Manage partner companies that exchange files with your organization."
        actions={
          <Button asChild size="sm">
            <Link to="/companies/new"><Plus className="h-4 w-4" /> New company</Link>
          </Button>
        }
      />

      <Card className="shadow-soft">
        <div className="p-4 flex flex-col sm:flex-row gap-3 border-b">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, RUC, email..."
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="sm"><Filter className="h-4 w-4" /> Filters</Button>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-12"></TableHead>
                <TableHead>Company</TableHead>
                <TableHead>RUC</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id} className="hover:bg-muted/30">
                  <TableCell><CompanyLogo initials={c.logo} id={c.id} size="sm" /></TableCell>
                  <TableCell>
                    <Link to="/companies/$id" params={{ id: c.id }} className="font-medium hover:text-indigo-600">
                      {c.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{c.ruc}</TableCell>
                  <TableCell className="text-sm">{c.username}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{c.email}</TableCell>
                  <TableCell className="text-sm">{c.position}</TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "capitalize",
                      c.status === "active"
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                        : "bg-slate-200 text-slate-600 hover:bg-slate-200",
                    )}>
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <RowActions
                      onView={() => navigate({ to: "/companies/$id", params: { id: c.id } })}
                      onDelete={() => remove(c.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={8} className="text-center py-12 text-sm text-muted-foreground">
                  No companies match your search.
                </TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppShell>
  );
}

function RowActions({ onView, onDelete }: { onView: () => void; onDelete: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem onClick={onView}><Eye className="h-4 w-4" /> View</DropdownMenuItem>
        <DropdownMenuItem><Pencil className="h-4 w-4" /> Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive">
              <Trash2 className="h-4 w-4" /> Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete company?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove the company and all associated files. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
