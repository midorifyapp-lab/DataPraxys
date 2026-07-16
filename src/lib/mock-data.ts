export type Role = "admin" | "company";

export type FileStatus = "pending" | "available" | "downloaded" | "deleted";
export type Direction = "received" | "sent";

export interface Company {
  id: string;
  name: string;
  ruc: string;
  username: string;
  email: string;
  position: string;
  logo: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface FileRecord {
  id: string;
  companyId: string;
  direction: Direction;
  filename: string;
  size: string;
  status: FileStatus;
  sentDate: string;
  downloadedDate?: string;
}

export interface ActivityItem {
  id: string;
  type: "upload" | "send" | "company_created" | "download";
  actor: string;
  description: string;
  time: string;
}

export interface AuditEntry {
  id: string;
  date: string;
  user: string;
  action: string;
  entity: string;
  description: string;
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  companyId?: string;
}

const logoColors = [
  "from-indigo-500 to-purple-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-pink-500",
  "from-blue-500 to-cyan-500",
  "from-rose-500 to-red-500",
  "from-amber-500 to-orange-500",
  "from-violet-500 to-fuchsia-500",
  "from-slate-600 to-slate-800",
];

export const companyLogo = (id: string) =>
  logoColors[parseInt(id, 36) % logoColors.length];

export const companies: Company[] = [
  { id: "c1", name: "Northwind Trading", ruc: "20512345671", username: "jperez", email: "j.perez@northwind.com", position: "CFO", logo: "NT", status: "active", createdAt: "2025-11-02" },
  { id: "c2", name: "Acme Global", ruc: "20509876543", username: "mgomez", email: "m.gomez@acme.com", position: "Operations Lead", logo: "AG", status: "active", createdAt: "2025-10-15" },
  { id: "c3", name: "Meridian Labs", ruc: "20456781234", username: "lchavez", email: "l.chavez@meridian.io", position: "Finance Manager", logo: "ML", status: "active", createdAt: "2025-09-28" },
  { id: "c4", name: "Halcyon Systems", ruc: "20678123456", username: "rvargas", email: "r.vargas@halcyon.co", position: "IT Director", logo: "HS", status: "inactive", createdAt: "2025-08-11" },
  { id: "c5", name: "Vertex Retail", ruc: "20321654987", username: "afuentes", email: "a.fuentes@vertex.pe", position: "Controller", logo: "VR", status: "active", createdAt: "2025-07-22" },
  { id: "c6", name: "Solera Foods", ruc: "20147852369", username: "pchang", email: "p.chang@solera.com", position: "Procurement", logo: "SF", status: "active", createdAt: "2025-06-05" },
  { id: "c7", name: "Kestrel Media", ruc: "20963258741", username: "kdiaz", email: "k.diaz@kestrel.tv", position: "CEO", logo: "KM", status: "active", createdAt: "2025-05-19" },
  { id: "c8", name: "Orbit Logistics", ruc: "20852741963", username: "torres", email: "s.torres@orbit.log", position: "Ops Manager", logo: "OL", status: "inactive", createdAt: "2025-04-30" },
];

export const files: FileRecord[] = [
  { id: "f1", companyId: "c1", direction: "received", filename: "invoice-nov-2025.pdf", size: "482 KB", status: "available", sentDate: "2026-07-14 09:12" },
  { id: "f2", companyId: "c1", direction: "sent", filename: "contract-2026.pdf", size: "1.2 MB", status: "downloaded", sentDate: "2026-07-10 14:32", downloadedDate: "2026-07-11 08:05" },
  { id: "f3", companyId: "c2", direction: "received", filename: "purchase-order-8821.xlsx", size: "96 KB", status: "available", sentDate: "2026-07-15 11:20" },
  { id: "f4", companyId: "c2", direction: "sent", filename: "quotation-q3.pdf", size: "755 KB", status: "pending", sentDate: "2026-07-15 16:44" },
  { id: "f5", companyId: "c3", direction: "received", filename: "financial-report.pdf", size: "2.1 MB", status: "downloaded", sentDate: "2026-07-13 10:00", downloadedDate: "2026-07-13 12:15" },
  { id: "f6", companyId: "c3", direction: "sent", filename: "audit-notes.docx", size: "312 KB", status: "available", sentDate: "2026-07-12 09:00" },
  { id: "f7", companyId: "c4", direction: "received", filename: "backup-config.zip", size: "5.4 MB", status: "deleted", sentDate: "2026-07-08 08:22" },
  { id: "f8", companyId: "c5", direction: "sent", filename: "policy-update.pdf", size: "220 KB", status: "downloaded", sentDate: "2026-07-14 15:10", downloadedDate: "2026-07-14 17:02" },
  { id: "f9", companyId: "c6", direction: "received", filename: "vendor-list.csv", size: "44 KB", status: "available", sentDate: "2026-07-15 08:40" },
  { id: "f10", companyId: "c7", direction: "sent", filename: "media-kit.zip", size: "8.7 MB", status: "pending", sentDate: "2026-07-15 18:01" },
];

export const activity: ActivityItem[] = [
  { id: "a1", type: "upload", actor: "Northwind Trading", description: "uploaded invoice-nov-2025.pdf", time: "12 min ago" },
  { id: "a2", type: "send", actor: "Administrator", description: "sent quotation-q3.pdf to Acme Global", time: "1 hour ago" },
  { id: "a3", type: "download", actor: "Meridian Labs", description: "downloaded audit-notes.docx", time: "3 hours ago" },
  { id: "a4", type: "company_created", actor: "Administrator", description: "created company Kestrel Media", time: "yesterday" },
  { id: "a5", type: "upload", actor: "Solera Foods", description: "uploaded vendor-list.csv", time: "yesterday" },
  { id: "a6", type: "send", actor: "Administrator", description: "sent policy-update.pdf to Vertex Retail", time: "2 days ago" },
];

export const auditLog: AuditEntry[] = [
  { id: "l1", date: "2026-07-15 18:04", user: "admin@exchange.io", action: "File Uploaded", entity: "media-kit.zip", description: "Uploaded to Kestrel Media" },
  { id: "l2", date: "2026-07-15 16:45", user: "admin@exchange.io", action: "File Uploaded", entity: "quotation-q3.pdf", description: "Uploaded to Acme Global" },
  { id: "l3", date: "2026-07-15 11:20", user: "m.gomez@acme.com", action: "File Uploaded", entity: "purchase-order-8821.xlsx", description: "Company upload" },
  { id: "l4", date: "2026-07-14 17:02", user: "a.fuentes@vertex.pe", action: "File Downloaded", entity: "policy-update.pdf", description: "Recipient download" },
  { id: "l5", date: "2026-07-14 09:15", user: "admin@exchange.io", action: "Company Updated", entity: "Northwind Trading", description: "Position changed" },
  { id: "l6", date: "2026-07-13 12:15", user: "l.chavez@meridian.io", action: "File Downloaded", entity: "financial-report.pdf", description: "Recipient download" },
  { id: "l7", date: "2026-07-12 08:44", user: "admin@exchange.io", action: "Company Created", entity: "Kestrel Media", description: "New company onboarded" },
  { id: "l8", date: "2026-07-11 21:03", user: "j.perez@northwind.com", action: "Login", entity: "Auth", description: "Successful login" },
  { id: "l9", date: "2026-07-10 09:00", user: "admin@exchange.io", action: "Password Changed", entity: "Halcyon Systems", description: "Reset requested" },
  { id: "l10", date: "2026-07-08 08:25", user: "admin@exchange.io", action: "File Deleted", entity: "backup-config.zip", description: "Removed per request" },
];

export const notifications: AppNotification[] = [
  { id: "n1", title: "New file from Northwind Trading", description: "invoice-nov-2025.pdf awaits review", time: "12 min ago", read: false, companyId: "c1" },
  { id: "n2", title: "New file from Acme Global", description: "purchase-order-8821.xlsx uploaded", time: "1 hour ago", read: false, companyId: "c2" },
  { id: "n3", title: "New file from Solera Foods", description: "vendor-list.csv uploaded", time: "yesterday", read: false, companyId: "c6" },
  { id: "n4", title: "Meridian Labs downloaded a file", description: "audit-notes.docx", time: "3 hours ago", read: true, companyId: "c3" },
];
