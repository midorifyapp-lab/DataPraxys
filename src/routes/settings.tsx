import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <AppShell>
      <PageHeader title="Configuración" description="Administra las preferencias y opciones de seguridad de tu espacio de trabajo." />

      <div className="grid gap-6 max-w-3xl">
        <Card className="shadow-soft">
          <CardHeader><CardTitle className="text-base">Espacio de trabajo</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs">Nombre del espacio</Label>
              <Input defaultValue="Exchange HQ" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Email de soporte</Label>
              <Input defaultValue="soporte@exchange.io" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader><CardTitle className="text-base">Notificaciones</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Toggle title="Enviarme un email cuando una empresa suba un archivo" defaultOn />
            <Separator />
            <Toggle title="Resumen semanal de actividad" defaultOn />
            <Separator />
            <Toggle title="Anuncios del producto" />
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader><CardTitle className="text-base">Seguridad</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Toggle title="Requerir 2FA para administradores" defaultOn />
            <Separator />
            <Toggle title="Expirar enlaces de descarga después de 7 días" defaultOn />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancelar</Button>
          <Button onClick={() => toast.success("Configuración guardada")}>Guardar cambios</Button>
        </div>
      </div>
    </AppShell>
  );
}

function Toggle({ title, defaultOn }: { title: string; defaultOn?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm">{title}</div>
      <Switch defaultChecked={defaultOn} />
    </div>
  );
}
