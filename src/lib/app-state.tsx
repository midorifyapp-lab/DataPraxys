import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Role, AppNotification } from "./mock-data";
import { notifications as seedNotifications } from "./mock-data";

interface AppState {
  role: Role;
  setRole: (r: Role) => void;
  notifications: AppNotification[];
  markAllRead: () => void;
  currentCompanyId: string; // for the company role — mock "signed-in" company
}

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>("admin");
  const [notifs, setNotifs] = useState<AppNotification[]>(seedNotifications);

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
