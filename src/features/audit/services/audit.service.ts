import { auditLog as auditSeed } from "../../audit/mocks/audit.mock";
import type { AuditEntry } from "../types";

export const auditService = {
  getAll: async (): Promise<AuditEntry[]> => auditSeed,
};
