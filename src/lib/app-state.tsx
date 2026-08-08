import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { notificationsService } from "@/features/notifications/services/notifications.service";

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
  const [notifs, setNotifs] = useState<AppNotification[]>([]);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("app.role") : null;
    if (saved === "admin" || saved === "company") setRoleState(saved);
  }, []);

  // Load notifications from the notifications service (abstracts mocks/api)
  useEffect(() => {
    let mounted = true;
    notificationsService.getAll().then((n) => {
      if (mounted) setNotifs(n);
    });
    return () => {
      mounted = false;
    };
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
        markAllRead: async () => {
          const updated = await notificationsService.markAllRead();
          setNotifs(updated);
        },
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
