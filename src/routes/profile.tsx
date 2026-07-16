import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImagePlus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <AppShell>
      <PageHeader title="Profile" description="Update your personal information and security." />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-soft">
          <CardHeader><CardTitle className="text-base">Profile picture</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl font-semibold">JP</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm"><ImagePlus className="h-4 w-4" /> Change picture</Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-soft">
            <CardHeader><CardTitle className="text-base">Contact</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Contact email</Label>
                <Input defaultValue="j.perez@northwind.com" />
              </div>
              <div className="flex justify-end">
                <Button onClick={() => toast.success("Email updated")}>Save</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader><CardTitle className="text-base">Change password</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Current password</Label>
                <Input type="password" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs">New password</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Confirm new password</Label>
                  <Input type="password" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => toast.success("Password updated")}>Update password</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
