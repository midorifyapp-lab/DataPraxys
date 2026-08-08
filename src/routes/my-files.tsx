import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/app-shell";
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
import { CloudUpload, FileText, Upload, Trash2, RefreshCw, CheckCircle2 } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/my-files")({
  component: MyFilesPage,
});

interface ActiveFile {
  name: string;
  size: number;
  date: string;
  status: "available" | "pending";
}

function MyFilesPage() {
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState<ActiveFile | null>({
    name: "factura-nov-2025.pdf",
    size: 493568,
    date: "2026-07-14 09:12",
    status: "available",
  });
  const [progress, setProgress] = useState(0);
  const [pendingReplace, setPendingReplace] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const startUpload = (f: File) => {
    setProgress(0);
    let p = 0;
    const t = setInterval(() => {
      p += 15;
      setProgress(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(t);
        setFile({
          name: f.name,
          size: f.size,
          date: new Date().toISOString().slice(0, 16).replace("T", " "),
          status: "available",
        });
        setProgress(0);
        toast.success("Archivo subido correctamente");
      }
    }, 120);
  };

  const handlePick = (f: File) => {
    if (file) setPendingReplace(f);
    else startUpload(f);
  };

  return (
    <AppShell>
      <PageHeader
        title="Mis Archivos"
        description="Sube el archivo actual que quieres compartir con el administrador."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-soft lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Subir archivo</CardTitle>
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
                if (f) handlePick(f);
              }}
              onClick={() => inputRef.current?.click()}
              className={cn(
                "border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors",
                drag ? "border-indigo-500 bg-indigo-50/50" : "border-border hover:bg-muted/30",
              )}
            >
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 grid place-items-center mx-auto mb-3 shadow-lifted">
                <CloudUpload className="h-7 w-7 text-white" />
              </div>
              <div className="text-base font-semibold">Arrastra tu archivo aquí</div>
              <div className="text-sm text-muted-foreground mt-1">
                o haz clic para explorar — hasta 50MB
              </div>
              <input
                ref={inputRef}
                type="file"
                className="sr-only"
                onChange={(e) => e.target.files && handlePick(e.target.files[0])}
              />
            </div>
            {progress > 0 && (
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Subiendo...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              Archivo actual
              {file && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {file ? (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/40 space-y-2">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-indigo-600" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate">{file.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(0)} KB
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Subido {file.date}</span>
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                      Disponible
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
                    <RefreshCw className="h-4 w-4" /> Reemplazar
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4" /> Eliminar
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar este archivo?</AlertDialogTitle>
                        <AlertDialogDescription>
                          El administrador ya no podrá ver este archivo.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            setFile(null);
                            toast.success("Archivo eliminado");
                          }}
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-sm text-muted-foreground">
                <Upload className="h-10 w-10 mx-auto mb-2 opacity-40" />
                Sin archivo activo
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={!!pendingReplace} onOpenChange={(o) => !o && setPendingReplace(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Reemplazar el archivo actual?</AlertDialogTitle>
            <AlertDialogDescription>
              Solo se permite un archivo activo. Subir{" "}
              <span className="font-medium">{pendingReplace?.name}</span> reemplazará tu archivo
              actual.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (pendingReplace) startUpload(pendingReplace);
                setPendingReplace(null);
              }}
            >
              Reemplazar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppShell>
  );
}
