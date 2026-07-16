import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader, CompanyLogo } from "@/components/app-shell";
import { useApp } from "@/lib/app-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2, Download, Upload, Clock, FileText, TrendingUp, Users,
  Send, ArrowUpRight, Inbox, CheckCircle2,
} from "lucide-react";
import { companies, files, activity, notifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  const { role } = useApp();
  return <AppShell>{role === "admin" ? <AdminDashboard /> : <CompanyHome />}</AppShell>;
}

/* ---------------- PANEL ADMIN ---------------- */

function StatCard({
  label, value, delta, icon: Icon, tone,
}: { label: string; value: string; delta: string; icon: any; tone: string }) {
  return (
    <Card className="shadow-soft border-border/60">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</div>
            <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
            <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
              <TrendingUp className="h-3 w-3" /> {delta}
            </div>
          </div>
          <div className={cn("h-10 w-10 rounded-lg grid place-items-center", tone)}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AdminDashboard() {
  const unread = notifications.filter((n) => !n.read);
  return (
    <>
      <PageHeader
        title="Panel"
        description="Resumen de la actividad de intercambio de archivos entre todas las empresas."
        actions={
          <>
            <Button variant="outline" size="sm">Exportar</Button>
            <Button asChild size="sm">
              <Link to="/companies/new"><Users className="h-4 w-4" /> Nueva empresa</Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total de empresas" value={String(companies.length)} delta="+2 este mes" icon={Building2} tone="bg-indigo-50 text-indigo-600" />
        <StatCard label="Archivos recibidos" value="128" delta="+12% vs semana pasada" icon={Inbox} tone="bg-emerald-50 text-emerald-600" />
        <StatCard label="Archivos enviados" value="94" delta="+8% vs semana pasada" icon={Send} tone="bg-blue-50 text-blue-600" />
        <StatCard label="Entregas pendientes" value="6" delta="2 requieren acción" icon={Clock} tone="bg-amber-50 text-amber-600" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="shadow-soft lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Actividad reciente</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Últimos eventos en tu espacio de trabajo</p>
            </div>
            <Button variant="ghost" size="sm">Ver todo</Button>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="divide-y">
              {activity.map((a) => {
                const iconMap: any = {
                  upload: { icon: Upload, tone: "bg-emerald-50 text-emerald-600" },
                  send: { icon: Send, tone: "bg-blue-50 text-blue-600" },
                  download: { icon: Download, tone: "bg-slate-100 text-slate-600" },
                  company_created: { icon: Building2, tone: "bg-indigo-50 text-indigo-600" },
                };
                const { icon: I, tone } = iconMap[a.type];
                return (
                  <li key={a.id} className="py-3 flex items-center gap-3">
                    <div className={cn("h-9 w-9 rounded-lg grid place-items-center", tone)}>
                      <I className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm">
                        <span className="font-medium">{a.actor}</span>{" "}
                        <span className="text-muted-foreground">{a.description}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{a.time}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Requiere revisión</CardTitle>
              <Badge variant="secondary">{unread.length}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Empresas que acaban de subir archivos</p>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {unread.map((n) => {
              const c = companies.find((x) => x.id === n.companyId);
              if (!c) return null;
              return (
                <Link
                  key={n.id}
                  to="/companies/$id"
                  params={{ id: c.id }}
                  className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/50 transition-colors"
                >
                  <CompanyLogo initials={c.logo} id={c.id} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium truncate">{c.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{n.description}</div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              );
            })}
            {unread.length === 0 && (
              <div className="text-center py-8 text-sm text-muted-foreground">
                <CheckCircle2 className="h-10 w-10 mx-auto mb-2 text-emerald-500" />
                Todo al día
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

/* ---------------- INICIO EMPRESA ---------------- */

function CompanyHome() {
  const { currentCompanyId } = useApp();
  const company = companies.find((c) => c.id === currentCompanyId)!;
  const received = files.filter((f) => f.companyId === company.id && f.direction === "sent")[0];
  const uploaded = files.filter((f) => f.companyId === company.id && f.direction === "received")[0];

  return (
    <>
      <PageHeader title={`Bienvenido, ${company.username}`} description="Un resumen de tu actividad reciente de archivos." />

      <Card className="shadow-soft mb-6 overflow-hidden">
        <div className="h-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />
        <CardContent className="p-6 -mt-10">
          <div className="flex items-end gap-4">
            <CompanyLogo initials={company.logo} id={company.id} size="lg" />
            <div className="pb-1">
              <div className="text-lg font-semibold">{company.name}</div>
              <div className="text-sm text-muted-foreground">RUC {company.ruc} · {company.email}</div>
            </div>
            <div className="ml-auto">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Activa</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Inbox className="h-4 w-4 text-indigo-600" /> Último archivo recibido
            </CardTitle>
          </CardHeader>
          <CardContent>
            {received ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
                  <FileText className="h-8 w-8 text-indigo-600" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium truncate">{received.filename}</div>
                    <div className="text-xs text-muted-foreground">Recibido {received.sentDate}</div>
                  </div>
                </div>
                <Button className="w-full"><Download className="h-4 w-4" /> Descargar</Button>
              </div>
            ) : (
              <EmptyMini icon={Inbox} text="Aún no se ha recibido ningún archivo" />
            )}
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Upload className="h-4 w-4 text-emerald-600" /> Último archivo subido
            </CardTitle>
          </CardHeader>
          <CardContent>
            {uploaded ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
                  <FileText className="h-8 w-8 text-emerald-600" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium truncate">{uploaded.filename}</div>
                    <div className="text-xs text-muted-foreground">Subido {uploaded.sentDate}</div>
                  </div>
                  <StatusBadge status={uploaded.status} />
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/my-files">Gestionar archivo</Link>
                </Button>
              </div>
            ) : (
              <EmptyMini icon={Upload} text="Aún no se ha subido ningún archivo" />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function EmptyMini({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="text-center py-8 text-sm text-muted-foreground">
      <Icon className="h-10 w-10 mx-auto mb-2 opacity-40" />
      {text}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700 hover:bg-amber-100",
    available: "bg-indigo-100 text-indigo-700 hover:bg-indigo-100",
    downloaded: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
    deleted: "bg-slate-200 text-slate-600 hover:bg-slate-200",
  };
  const labels: Record<string, string> = {
    pending: "Pendiente",
    available: "Disponible",
    downloaded: "Descargado",
    deleted: "Eliminado",
  };
  return <Badge className={cn("font-medium", map[status])}>{labels[status] ?? status}</Badge>;
}
