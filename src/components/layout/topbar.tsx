import { useState } from "react";
import { Link } from "@tanstack/react-router";
import React from "react";
import { Bell, ChevronDown, Menu, Shield, Building2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarContent from "./sidebar";
import { cn } from "@/lib/utils";

export function Topbar() {
  const { role, setRole } = useAuth();
  const unread = 0;
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-30 h-16 border-b bg-background/80 backdrop-blur">
      <div className="flex h-full items-center gap-3 px-4 md:px-6">
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="relative w-full max-w-md hidden sm:block">
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
            <DropdownMenuRadioGroup value={role} onValueChange={(v) => setRole(v as any)}>
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
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left leading-tight">
                <div className="text-sm font-medium">Usuario</div>
                <div className="text-[11px] text-muted-foreground">Empresa</div>
              </div>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to="/profile" className="block px-3 py-2">
              Perfil
            </Link>
            <Link to="/settings" className="block px-3 py-2">
              Configuración
            </Link>
            <DropdownMenuSeparator />
            <Link to="/" className="block px-3 py-2">
              Cerrar sesión
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Topbar;
