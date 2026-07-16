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
  { id: "c1", name: "Northwind Trading", ruc: "20512345671", username: "jperez", email: "j.perez@northwind.com", position: "Director Financiero", logo: "NT", status: "active", createdAt: "2025-11-02" },
  { id: "c2", name: "Acme Global", ruc: "20509876543", username: "mgomez", email: "m.gomez@acme.com", position: "Jefe de Operaciones", logo: "AG", status: "active", createdAt: "2025-10-15" },
  { id: "c3", name: "Meridian Labs", ruc: "20456781234", username: "lchavez", email: "l.chavez@meridian.io", position: "Gerente de Finanzas", logo: "ML", status: "active", createdAt: "2025-09-28" },
  { id: "c4", name: "Halcyon Systems", ruc: "20678123456", username: "rvargas", email: "r.vargas@halcyon.co", position: "Director de TI", logo: "HS", status: "inactive", createdAt: "2025-08-11" },
  { id: "c5", name: "Vertex Retail", ruc: "20321654987", username: "afuentes", email: "a.fuentes@vertex.pe", position: "Contralor", logo: "VR", status: "active", createdAt: "2025-07-22" },
  { id: "c6", name: "Solera Foods", ruc: "20147852369", username: "pchang", email: "p.chang@solera.com", position: "Compras", logo: "SF", status: "active", createdAt: "2025-06-05" },
  { id: "c7", name: "Kestrel Media", ruc: "20963258741", username: "kdiaz", email: "k.diaz@kestrel.tv", position: "CEO", logo: "KM", status: "active", createdAt: "2025-05-19" },
  { id: "c8", name: "Orbit Logistics", ruc: "20852741963", username: "torres", email: "s.torres@orbit.log", position: "Gerente de Operaciones", logo: "OL", status: "inactive", createdAt: "2025-04-30" },
];

export const files: FileRecord[] = [
  { id: "f1", companyId: "c1", direction: "received", filename: "factura-nov-2025.pdf", size: "482 KB", status: "available", sentDate: "2026-07-14 09:12" },
  { id: "f2", companyId: "c1", direction: "sent", filename: "contrato-2026.pdf", size: "1.2 MB", status: "downloaded", sentDate: "2026-07-10 14:32", downloadedDate: "2026-07-11 08:05" },
  { id: "f3", companyId: "c2", direction: "received", filename: "orden-de-compra-8821.xlsx", size: "96 KB", status: "available", sentDate: "2026-07-15 11:20" },
  { id: "f4", companyId: "c2", direction: "sent", filename: "cotizacion-q3.pdf", size: "755 KB", status: "pending", sentDate: "2026-07-15 16:44" },
  { id: "f5", companyId: "c3", direction: "received", filename: "reporte-financiero.pdf", size: "2.1 MB", status: "downloaded", sentDate: "2026-07-13 10:00", downloadedDate: "2026-07-13 12:15" },
  { id: "f6", companyId: "c3", direction: "sent", filename: "notas-auditoria.docx", size: "312 KB", status: "available", sentDate: "2026-07-12 09:00" },
  { id: "f7", companyId: "c4", direction: "received", filename: "config-respaldo.zip", size: "5.4 MB", status: "deleted", sentDate: "2026-07-08 08:22" },
  { id: "f8", companyId: "c5", direction: "sent", filename: "actualizacion-politicas.pdf", size: "220 KB", status: "downloaded", sentDate: "2026-07-14 15:10", downloadedDate: "2026-07-14 17:02" },
  { id: "f9", companyId: "c6", direction: "received", filename: "lista-proveedores.csv", size: "44 KB", status: "available", sentDate: "2026-07-15 08:40" },
  { id: "f10", companyId: "c7", direction: "sent", filename: "kit-de-medios.zip", size: "8.7 MB", status: "pending", sentDate: "2026-07-15 18:01" },
];

export const activity: ActivityItem[] = [
  { id: "a1", type: "upload", actor: "Northwind Trading", description: "subió factura-nov-2025.pdf", time: "hace 12 min" },
  { id: "a2", type: "send", actor: "Administrador", description: "envió cotizacion-q3.pdf a Acme Global", time: "hace 1 hora" },
  { id: "a3", type: "download", actor: "Meridian Labs", description: "descargó notas-auditoria.docx", time: "hace 3 horas" },
  { id: "a4", type: "company_created", actor: "Administrador", description: "creó la empresa Kestrel Media", time: "ayer" },
  { id: "a5", type: "upload", actor: "Solera Foods", description: "subió lista-proveedores.csv", time: "ayer" },
  { id: "a6", type: "send", actor: "Administrador", description: "envió actualizacion-politicas.pdf a Vertex Retail", time: "hace 2 días" },
];

export const auditLog: AuditEntry[] = [
  { id: "l1", date: "2026-07-15 18:04", user: "admin@exchange.io", action: "Archivo Subido", entity: "kit-de-medios.zip", description: "Subido a Kestrel Media" },
  { id: "l2", date: "2026-07-15 16:45", user: "admin@exchange.io", action: "Archivo Subido", entity: "cotizacion-q3.pdf", description: "Subido a Acme Global" },
  { id: "l3", date: "2026-07-15 11:20", user: "m.gomez@acme.com", action: "Archivo Subido", entity: "orden-de-compra-8821.xlsx", description: "Carga de empresa" },
  { id: "l4", date: "2026-07-14 17:02", user: "a.fuentes@vertex.pe", action: "Archivo Descargado", entity: "actualizacion-politicas.pdf", description: "Descarga del destinatario" },
  { id: "l5", date: "2026-07-14 09:15", user: "admin@exchange.io", action: "Empresa Actualizada", entity: "Northwind Trading", description: "Cargo modificado" },
  { id: "l6", date: "2026-07-13 12:15", user: "l.chavez@meridian.io", action: "Archivo Descargado", entity: "reporte-financiero.pdf", description: "Descarga del destinatario" },
  { id: "l7", date: "2026-07-12 08:44", user: "admin@exchange.io", action: "Empresa Creada", entity: "Kestrel Media", description: "Nueva empresa incorporada" },
  { id: "l8", date: "2026-07-11 21:03", user: "j.perez@northwind.com", action: "Inicio de Sesión", entity: "Auth", description: "Inicio de sesión exitoso" },
  { id: "l9", date: "2026-07-10 09:00", user: "admin@exchange.io", action: "Contraseña Cambiada", entity: "Halcyon Systems", description: "Restablecimiento solicitado" },
  { id: "l10", date: "2026-07-08 08:25", user: "admin@exchange.io", action: "Archivo Eliminado", entity: "config-respaldo.zip", description: "Eliminado a solicitud" },
];

export const notifications: AppNotification[] = [
  { id: "n1", title: "Nuevo archivo de Northwind Trading", description: "factura-nov-2025.pdf esperando revisión", time: "hace 12 min", read: false, companyId: "c1" },
  { id: "n2", title: "Nuevo archivo de Acme Global", description: "orden-de-compra-8821.xlsx subido", time: "hace 1 hora", read: false, companyId: "c2" },
  { id: "n3", title: "Nuevo archivo de Solera Foods", description: "lista-proveedores.csv subido", time: "ayer", read: false, companyId: "c6" },
  { id: "n4", title: "Meridian Labs descargó un archivo", description: "notas-auditoria.docx", time: "hace 3 horas", read: true, companyId: "c3" },
];
