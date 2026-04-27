import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Lock, Bell, Building, Save, Camera } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const handleSave = () => {
    toast.success("Settings updated successfully");
  };

  return (
    <AppShell title="Settings">
      <PageHeader
        title="Settings"
        subtitle="Manage your account preferences and society configuration."
        eyebrow="System"
      />

      <div className="surface-card p-0 overflow-hidden">
        <Tabs defaultValue="profile" className="w-full">
          <div className="px-6 pt-6 border-b border-border/60">
            <TabsList className="bg-secondary/50 p-1 mb-6">
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" /> Profile
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                <Lock className="h-4 w-4" /> Security
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="h-4 w-4" /> Notifications
              </TabsTrigger>
              <TabsTrigger value="society" className="gap-2">
                <Building className="h-4 w-4" /> Society Details
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-8">
            <TabsContent value="profile" className="mt-0 space-y-8">
              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="h-28 w-28 rounded-3xl gradient-primary flex items-center justify-center text-primary-foreground text-3xl font-bold shadow-glow">
                      AR
                    </div>
                    <button className="absolute -bottom-2 -right-2 h-9 w-9 rounded-xl bg-card border border-border shadow-soft flex items-center justify-center hover:bg-accent transition-colors">
                      <Camera className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">Click to upload photo</p>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[13px] font-semibold">Full Name</Label>
                    <Input defaultValue="ADITYA CHAVAN" className="bg-secondary/30" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[13px] font-semibold">Email Address</Label>
                    <Input defaultValue="admin@greenwood.in" className="bg-secondary/30" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[13px] font-semibold">Phone Number</Label>
                    <Input defaultValue="+91 98201 23456" className="bg-secondary/30" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[13px] font-semibold">Designation</Label>
                    <Input defaultValue="Chief Administrator" className="bg-secondary/30" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-border/60">
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 px-8 rounded-xl h-11">
                  <Save className="h-4 w-4 mr-2" /> Save Profile
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="security" className="mt-0 space-y-6 max-w-2xl">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold">Change Password</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[13px] font-semibold">Current Password</Label>
                    <Input type="password" placeholder="••••••••" className="bg-secondary/30" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[13px] font-semibold">New Password</Label>
                    <Input type="password" placeholder="••••••••" className="bg-secondary/30" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[13px] font-semibold">Confirm New Password</Label>
                    <Input type="password" placeholder="••••••••" className="bg-secondary/30" />
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-border/60">
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 rounded-xl">
                  Update Password
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="mt-0 space-y-6">
              <div className="space-y-6 max-w-2xl">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/30 border border-border/40">
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive weekly reports and alerts via email.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/30 border border-border/40">
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold">SMS Alerts</p>
                    <p className="text-xs text-muted-foreground">Get critical security alerts on your phone.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/30 border border-border/40">
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold">Visitor Check-in</p>
                    <p className="text-xs text-muted-foreground">Notify me when a visitor arrives at the gate.</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="society" className="mt-0 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[13px] font-semibold">Society Name</Label>
                  <Input defaultValue="Greenwood Heights" className="bg-secondary/30" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[13px] font-semibold">Registration Number</Label>
                  <Input defaultValue="S-1234/2021" className="bg-secondary/30" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-[13px] font-semibold">Address</Label>
                  <Input defaultValue="123 Palm Street, Green Valley, Pune 411045" className="bg-secondary/30" />
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-border/60">
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 px-8 rounded-xl h-11">
                  <Save className="h-4 w-4 mr-2" /> Update Society Info
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AppShell>
  );
};

export default Settings;
