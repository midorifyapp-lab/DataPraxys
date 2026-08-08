import { useEffect, useState } from "react";
import type { AuditEntry } from "../types";
import { auditService } from "../services/audit.service";

export function useAudit() {
  const [entries, setEntries] = useState<AuditEntry[]>([]);

  useEffect(() => {
    let mounted = true;
    auditService.getAll().then((data) => {
      if (mounted) setEntries(data);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return {
    entries,
  };
}
