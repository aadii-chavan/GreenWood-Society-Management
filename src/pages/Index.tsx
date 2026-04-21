import { useState } from "react";
import { Plus, Filter } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { AddResidentDialog } from "@/components/dashboard/AddResidentDialog";
import { GenerateBillDialog } from "@/components/dashboard/GenerateBillDialog";
import { toast } from "sonner";

const Index = () => {
  const [isAddResidentOpen, setIsAddResidentOpen] = useState(false);
  const [isGenerateBillOpen, setIsGenerateBillOpen] = useState(false);

  const handleAction = (name: string) => {
    toast.info(`${name} action enabled! Form coming soon.`);
  };

  return (
    <AppShell title="Dashboard">
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        subtitle="Welcome back, Aarav — here's what's happening at Greenwood today."
        actions={
          <>
            <Button variant="outline" className="rounded-lg h-10 px-4 text-[13px] font-semibold border-border bg-card hover:bg-accent">
              <Filter className="h-4 w-4 mr-2" /> This month
            </Button>
            <Button 
              onClick={() => setIsAddResidentOpen(true)}
              className="rounded-lg h-10 px-4 text-[13px] font-semibold bg-primary hover:bg-primary/90 shadow-glow"
            >
              <Plus className="h-4 w-4 mr-2" /> Add resident
            </Button>
          </>
        }
      />

      {/* Dashboard Content */}
      <div className="flex flex-col gap-5">
        {/* Top Row: Chart & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div className="lg:col-span-1">
            <QuickActions 
              onAddResident={() => setIsAddResidentOpen(true)}
              onGenerateBill={() => setIsGenerateBillOpen(true)}
              onPostNotice={() => handleAction("Post Notice")}
              onLogMaintenance={() => handleAction("Log Maintenance")}
              onAddEvent={() => handleAction("Add Event")}
              onVisitorEntry={() => handleAction("Visitor Entry")}
            />
          </div>
        </div>

        {/* Bottom Row: Full Width Activity */}
        <div className="w-full">
          <RecentActivity />
        </div>
      </div>

      <AddResidentDialog 
        open={isAddResidentOpen} 
        onOpenChange={setIsAddResidentOpen} 
      />

      <GenerateBillDialog 
        open={isGenerateBillOpen} 
        onOpenChange={setIsGenerateBillOpen} 
      />
    </AppShell>
  );
};

export default Index;

