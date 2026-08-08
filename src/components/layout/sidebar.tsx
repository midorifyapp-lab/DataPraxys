import { Link, useRouterState } from "@tanstack/react-router";
import React from "react";
import {
  LayoutDashboard,
  Building2,
  ArrowLeftRight,
  ScrollText,
  Settings,
  Home,
  FolderUp,
  UserCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function SidebarContent({ compact = false }: { compact?: boolean }) {
  const { role } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const adminNav = [
    { to: "/", label: "Panel", icon: LayoutDashboard, exact: true },
    { to: "/companies", label: "Empresas", icon: Building2 },
    { to: "/file-exchange", label: "Intercambio de Archivos", icon: ArrowLeftRight },
    { to: "/audit-log", label: "Registro de Auditoría", icon: ScrollText },
    { to: "/settings", label: "Configuración", icon: Settings },
  ];

  const companyNav = [
    { to: "/", label: "Inicio", icon: Home, exact: true },
    { to: "/my-files", label: "Mis Archivos", icon: FolderUp },
    { to: "/profile", label: "Perfil", icon: UserCircle },
  ];

  const nav = role === "admin" ? adminNav : companyNav;

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2 px-5 border-b border-sidebar-border">
        <div className="h-8 w-8 rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 grid place-items-center text-white font-semibold shadow-soft">
          Ex
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-sidebar-foreground">Datapraxsys</div>
          <div className="text-[11px] text-muted-foreground">
            {role === "admin" ? "Intercambio de archivos B2B" : "Portal de empresa"}
          </div>
        </div>
      </div>
      <nav className={cn("flex-1 p-3 space-y-1", compact && "px-2")}>
        {nav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.to, item.exact);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-soft"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
              )}
            >
              <Icon
                className={cn("h-4 w-4", active ? "text-indigo-600" : "text-muted-foreground")}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-sidebar-border">
        <div className="rounded-xl bg-linear-to-br from-indigo-50 to-purple-50 p-3 text-xs text-slate-700">
          <div className="font-semibold mb-1 flex items-center gap-1.5">Transferencia segura</div>
          <p className="text-slate-600 leading-relaxed">
            Todos los archivos están cifrados de extremo a extremo y auditados.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SidebarContent;
