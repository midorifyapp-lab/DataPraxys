import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "admin" | "company";

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  companyId?: string;
}

interface AppState {
  role: Role;
  setRole: (r: Role) => void;
  notifications: AppNotification[];
  markAllRead: () => void;
  currentCompanyId: string;
}

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>("admin");
  const [notifs, setNotifs] = useState<AppNotification[]>([
    {
      id: "n1",
      title: "Nuevo archivo de Northwind Trading",
      description: "factura-nov-2025.pdf esperando revisión",
      time: "hace 12 min",
      read: false,
      companyId: "c1",
    },
    {
      id: "n2",
      title: "Nuevo archivo de Acme Global",
      description: "orden-de-compra-8821.xlsx subido",
      time: "hace 1 hora",
      read: false,
      companyId: "c2",
    },
    {
      id: "n3",
      title: "Nuevo archivo de Solera Foods",
      description: "lista-proveedores.csv subido",
      time: "ayer",
      read: false,
      companyId: "c6",
    },
    {
      id: "n4",
      title: "Meridian Labs descargó un archivo",
      description: "notas-auditoria.docx",
      time: "hace 3 horas",
      read: true,
      companyId: "c3",
    },
  ]);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("app.role") : null;
    if (saved === "admin" || saved === "company") setRoleState(saved);
  }, []);

  const setRole = (r: Role) => {
    setRoleState(r);
    if (typeof window !== "undefined") window.localStorage.setItem("app.role", r);
  };

  return (
    <Ctx.Provider
      value={{
        role,
        setRole,
        notifications: notifs,
        markAllRead: () => setNotifs((n) => n.map((x) => ({ ...x, read: true }))),
        currentCompanyId: "c1",
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useApp must be inside AppProvider");
  return c;
}
