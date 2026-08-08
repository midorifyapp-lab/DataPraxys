import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Building2,
  ArrowLeftRight,
  ScrollText,
  Settings,
  Home,
  FolderUp,
  UserCircle,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  UserCog,
  Shield,
  Menu,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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

function SidebarContent({ compact = false }: { compact?: boolean }) {
  const { role } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
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
            {role === "admin" ? "Consola de administración" : "Portal de empresa"}
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
          <div className="font-semibold mb-1 flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5" /> Transferencia segura
          </div>
          <p className="text-slate-600 leading-relaxed">
            Todos los archivos están cifrados de extremo a extremo y auditados.
          </p>
        </div>
      </div>
    </div>
  );
}

function Topbar() {
  const { role, setRole } = useAuth();
  const unread = 0;
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-30 h-16 border-b bg-background/80 backdrop-blur">
      <div className="flex h-full items-center gap-3 px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <SidebarContent />
          </SheetContent>
        </Sheet>

        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar empresas, archivos..."
            className="pl-9 bg-muted/40 border-transparent focus-visible:bg-background"
          />
        </div>

        <div className="flex-1" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5 rounded-full">
              {role === "admin" ? (
                <>
                  <Shield className="h-3.5 w-3.5" /> Vista admin
                </>
              ) : (
                <>
                  <Building2 className="h-3.5 w-3.5" /> Vista empresa
                </>
              )}
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>Previsualizar rol</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={role}
              onValueChange={(v) => setRole(v as "admin" | "company")}
            >
              <DropdownMenuRadioItem value="admin">Administrador</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="company">Usuario de empresa</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unread > 0 && (
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-background" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-96 p-0">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <div className="text-sm font-semibold">Notificaciones</div>
                <div className="text-xs text-muted-foreground">{unread} sin leer</div>
              </div>
              <Button variant="ghost" size="sm">
                Marcar todas como leídas
              </Button>
            </div>
            <ScrollArea className="h-80">
              <div className="p-4 text-sm text-muted-foreground">
                No hay notificaciones disponibles en esta etapa.
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-linear-to-br from-indigo-500 to-purple-600 text-white text-xs font-semibold">
                  {role === "admin" ? "AD" : "JP"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left leading-tight">
                <div className="text-sm font-medium">
                  {role === "admin" ? "Alex Díaz" : "Juan Pérez"}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  {role === "admin" ? "Administrador" : "Northwind Trading"}
                </div>
              </div>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserCog className="mr-2 h-4 w-4" /> Perfil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" /> Configuración
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

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
    "from-emerald-500 to-teal-600",
    "from-orange-500 to-pink-600",
    "from-blue-500 to-cyan-600",
    "from-rose-500 to-red-600",
    "from-amber-500 to-orange-600",
    "from-violet-500 to-fuchsia-600",
    "from-slate-600 to-slate-800",
  ];
  const hue = palettes[Math.abs(id.charCodeAt(id.length - 1)) % palettes.length];
  const sz =
    size === "sm" ? "h-8 w-8 text-xs" : size === "lg" ? "h-16 w-16 text-lg" : "h-10 w-10 text-sm";
  return (
    <div
      className={cn(
        "rounded-lg bg-linear-to-br grid place-items-center text-white font-semibold shadow-soft shrink-0",
        hue,
        sz,
      )}
    >
      {initials}
    </div>
  );
}
