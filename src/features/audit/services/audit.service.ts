import { auditLog as auditSeed } from "../../audit/mocks/audit.mock";
import type { AuditEntry } from "../types";
import { useApi, apiClient } from "@/lib/api/adapter";

export const auditService = {
  getAll: async (): Promise<AuditEntry[]> =>
    useApi ? await apiClient.get<AuditEntry[]>("/audit") : auditSeed,
};
