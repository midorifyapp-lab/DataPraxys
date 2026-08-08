export type Role = "admin" | "company";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  companyId?: string;
}
