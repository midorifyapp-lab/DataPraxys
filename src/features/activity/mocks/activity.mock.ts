import type { ActivityItem } from "../types";

export const activity: ActivityItem[] = [
  {
    id: "a1",
    type: "upload",
    actor: "Northwind Trading",
    description: "subió factura-nov-2025.pdf",
    time: "hace 12 min",
  },
  {
    id: "a2",
    type: "send",
    actor: "Administrador",
    description: "envió cotizacion-q3.pdf a Acme Global",
    time: "hace 1 hora",
  },
  {
    id: "a3",
    type: "download",
    actor: "Meridian Labs",
    description: "descargó notas-auditoria.docx",
    time: "hace 3 horas",
  },
  {
    id: "a4",
    type: "company_created",
    actor: "Administrador",
    description: "creó la empresa Kestrel Media",
    time: "ayer",
  },
  {
    id: "a5",
    type: "upload",
    actor: "Solera Foods",
    description: "subió lista-proveedores.csv",
    time: "ayer",
  },
  {
    id: "a6",
    type: "send",
    actor: "Administrador",
    description: "envió actualizacion-politicas.pdf a Vertex Retail",
    time: "hace 2 días",
  },
];
