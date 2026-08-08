import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell, CompanyLogo } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  ArrowLeft,
  Download,
  Trash2,
  Upload,
  FileText,
  CheckCircle2,
  CloudUpload,
} from "lucide-react";
import { companies } from "@/features/companies/mocks/companies.mock";
import { files } from "@/features/exchange/mocks/exchange.mock";
import { FileRecord } from "@/features/exchange/types";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/companies/$id")({
  loader: ({ params }) => {
    const company = companies.find((c) => c.id === params.id);
    if (!company) throw notFound();
    return { company };
  },
  component: CompanyDetail,
  notFoundComponent: () => (
    <AppShell>
      <div className="text-center py-24 text-muted-foreground">Empresa no encontrada.</div>
    </AppShell>
  ),
});

function CompanyDetail() {
  const { company } = Route.useLoaderData();
  const received = files.filter((f) => f.companyId === company.id && f.direction === "received")[0];
  const sent = files.filter((f) => f.companyId === company.id && f.direction === "sent")[0];

  return (
    <AppShell>
      <div className="mb-4">
        <Button asChild variant="ghost" size="sm">
          <Link to="/companies">
            <ArrowLeft className="h-4 w-4" /> Volver
          </Link>
        </Button>
      </div>

      <Card className="shadow-soft mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <CompanyLogo initials={company.logo} id={company.id} size="lg" />
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl md:text-2xl font-semibold">{company.name}</h1>
                <Badge
                  className={cn(
                    company.status === "active"
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                      : "bg-slate-200 text-slate-600 hover:bg-slate-200",
                  )}
                >
                  {company.status === "active" ? "Activa" : "Inactiva"}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                RUC {company.ruc} · {company.email} · {company.position}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Editar</Button>
              <Button variant="outline" className="text-destructive">
                Eliminar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <FileCard title="Último archivo recibido" file={received} tone="indigo" />
        <FileCard title="Último archivo enviado" file={sent} tone="emerald" />
        <UploadCard />
      </div>
    </AppShell>
  );
}

function FileCard({ title, file, tone }: { title: string; file?: FileRecord; tone: string }) {
  const toneMap: Record<string, string> = {
    indigo: "text-indigo-600 bg-indigo-50",
    emerald: "text-emerald-600 bg-emerald-50",
  };
  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {file ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
              <div className={cn("h-10 w-10 rounded-lg grid place-items-center", toneMap[tone])}>
                <FileText className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate">{file.filename}</div>
                <div className="text-xs text-muted-foreground">
                  {file.sentDate} · {file.size}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast.success("Descarga iniciada")}
              >
                <Download className="h-4 w-4" /> Descargar
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="outline" className="text-destructive">
                    <Trash2 className="h-4 w-4" /> Eliminar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Eliminar este archivo?</AlertDialogTitle>
                    <AlertDialogDescription>
                      El archivo se eliminará permanentemente.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => toast.success("Archivo eliminado")}>
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-sm text-muted-foreground">
            <FileText className="h-10 w-10 mx-auto mb-2 opacity-40" />
            Sin archivos aún
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function UploadCard() {
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const pick = (f: File) => {
    setFile(f);
    setDone(false);
    setProgress(0);
  };

  const upload = () => {
    if (!file) return;
    let p = 0;
    const t = setInterval(() => {
      p += 12;
      setProgress(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(t);
        setDone(true);
        toast.success("Archivo subido correctamente");
      }
    }, 150);
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-base">Enviar nuevo archivo</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            const f = e.dataTransfer.files?.[0];
            if (f) pick(f);
          }}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors",
            drag ? "border-indigo-500 bg-indigo-50/50" : "border-border hover:bg-muted/30",
          )}
        >
          <div className="h-12 w-12 rounded-full bg-indigo-50 grid place-items-center mx-auto mb-2">
            <CloudUpload className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="text-sm font-medium">Arrastra un archivo o haz clic para explorar</div>
          <div className="text-xs text-muted-foreground mt-1">Hasta 50MB por archivo</div>
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            onChange={(e) => e.target.files && pick(e.target.files[0])}
          />
        </div>

        {file && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
              <FileText className="h-6 w-6 text-indigo-600 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate">{file.name}</div>
                <div className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(0)} KB
                </div>
              </div>
              {done && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
            </div>
            {progress > 0 && <Progress value={progress} />}
            <Button className="w-full" onClick={upload} disabled={progress > 0 && !done}>
              <Upload className="h-4 w-4" /> {done ? "Subir otro" : "Subir"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
