import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Role = "admin" | "company";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  companyId?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  role: Role;
  currentCompanyId: string;
  isAuthenticated: boolean;
  setRole: (role: Role) => void;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>({
    id: "admin-1",
    name: "Alex Díaz",
    email: "admin@exchange.io",
    role: "admin",
    companyId: "c1",
  });
  const [role, setRoleState] = useState<Role>("admin");
  const [currentCompanyId, setCurrentCompanyId] = useState("c1");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedRole = window.localStorage.getItem("app.role") as Role | null;
    if (savedRole === "admin" || savedRole === "company") {
      setRoleState(savedRole);
      setCurrentCompanyId(savedRole === "company" ? "c1" : "c1");
    }
  }, []);

  useEffect(() => {
    setUser((current) => {
      if (!current) {
        return {
          id: "admin-1",
          name: "Alex Díaz",
          email: "admin@exchange.io",
          role,
          companyId: currentCompanyId,
        };
      }

      return { ...current, role, companyId: currentCompanyId };
    });
  }, [role, currentCompanyId]);

  const setRole = (nextRole: Role) => {
    setRoleState(nextRole);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("app.role", nextRole);
    }
    setCurrentCompanyId(nextRole === "company" ? "c1" : "c1");
  };

  const login = (nextUser: AuthUser) => {
    setUser(nextUser);
    setRoleState(nextUser.role);
  };

  const logout = () => {
    setUser(null);
    setRoleState("admin");
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("app.role");
    }
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      role,
      currentCompanyId,
      isAuthenticated: !!user,
      setRole,
      login,
      logout,
    }),
    [currentCompanyId, role, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
