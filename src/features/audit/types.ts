export interface AuditEntry {
  id: string;
  date: string;
  user: string;
  action: string;
  entity: string;
  description: string;
}
