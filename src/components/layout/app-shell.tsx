import React, { type ReactNode } from "react";
import SidebarContent from "./sidebar";
import Topbar from "./topbar";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 border-r border-sidebar-border bg-sidebar">
        <SidebarContent />
      </aside>
      <div className="md:pl-64">
        <Topbar />
        <main className="p-4 md:p-8 max-w-350 mx-auto">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function CompanyLogo({
  initials,
  id,
  size = "md",
}: {
  initials: string;
  id: string;
  size?: "sm" | "md" | "lg";
}) {
  const palettes = [
    "from-indigo-500 to-purple-600",
    "from-emerald-500 to-teal-400",
    "from-amber-500 to-rose-500",
  ];
  const idx = Math.abs(
    initials.split("").reduce((a, b) => a + b.charCodeAt(0), 0) % palettes.length,
  );
  const classes = {
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-14 w-14 text-2xl",
  }[size];

  return (
    <div
      className={`rounded-full bg-gradient-to-br ${palettes[idx]} grid place-items-center text-white ${classes}`}
    >
      {initials}
    </div>
  );
}

export default AppShell;
