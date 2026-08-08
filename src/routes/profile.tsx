import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImagePlus } from "lucide-react";
import { toast } from "sonner";
import { useProfile } from "@/features/profile/hooks/useProfile";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { profile, update } = useProfile();
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    if (profile) setEmail(profile.email);
  }, [profile]);

  const save = async () => {
    if (!profile) return;
    await update({ email });
    toast.success("Perfil actualizado");
  };

  return (
    <AppShell>
      <PageHeader title="Perfil" description="Actualiza tu información personal y de seguridad." />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Foto de perfil</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl font-semibold">
                {profile
                  ? profile.name
                      .split(" ")
                      .map((s) => s[0])
                      .slice(0, 2)
                      .join("")
                  : "JP"}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              <ImagePlus className="h-4 w-4" /> Cambiar foto
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Email de contacto</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="flex justify-end">
                <Button onClick={save}>Guardar</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">Cambiar contraseña</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Contraseña actual</Label>
                <Input type="password" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs">Nueva contraseña</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Confirmar nueva contraseña</Label>
                  <Input type="password" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => toast.success("Contraseña actualizada")}>
                  Actualizar contraseña
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
