import { defaultAuthUser } from "../mocks/auth.mock";
import type { AuthUser } from "../types";
import { useApi, apiClient } from "@/lib/api/adapter";

export const authService = {
  getDefaultUser: async (): Promise<AuthUser> =>
    useApi ? await apiClient.get<AuthUser>("/auth/default") : defaultAuthUser,
  login: async (user: AuthUser): Promise<AuthUser> =>
    useApi ? await apiClient.post<AuthUser>("/auth/login", user) : user,
  logout: async (): Promise<void> =>
    useApi ? await apiClient.post<void>("/auth/logout") : undefined,
};
