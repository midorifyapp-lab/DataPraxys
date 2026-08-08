import type { AppNotification } from "../types";

export const notifications: AppNotification[] = [
  {
    id: "n1",
    title: "Nuevo archivo de Northwind Trading",
    description: "factura-nov-2025.pdf esperando revisión",
    time: "hace 12 min",
    read: false,
    companyId: "c1",
  },
  {
    id: "n2",
    title: "Nuevo archivo de Acme Global",
    description: "orden-de-compra-8821.xlsx subido",
    time: "hace 1 hora",
    read: false,
    companyId: "c2",
  },
  {
    id: "n3",
    title: "Nuevo archivo de Solera Foods",
    description: "lista-proveedores.csv subido",
    time: "ayer",
    read: false,
    companyId: "c6",
  },
  {
    id: "n4",
    title: "Meridian Labs descargó un archivo",
    description: "notas-auditoria.docx",
    time: "hace 3 horas",
    read: true,
    companyId: "c3",
  },
];
