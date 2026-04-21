import { useState } from "react";
import { Users, IndianRupee, Receipt, MessageSquareWarning, Plus, Filter } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/button";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { DashboardCalendar } from "@/components/dashboard/DashboardCalendar";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { AddResidentDialog } from "@/components/dashboard/AddResidentDialog";
import { toast } from "sonner";

const Index = () => {
  const [isAddResidentOpen, setIsAddResidentOpen] = useState(false);

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

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
        <StatCard
          highlight
          label="Total Residents"
          value="248"
          icon={Users}
          delta="+12"
          helper="this month"
        />
        <StatCard
          label="Revenue Collected"
          value="₹6.4L"
          icon={IndianRupee}
          delta="+8.4%"
          helper="vs last month"
        />
        <StatCard
          label="Pending Bills"
          value="32"
          icon={Receipt}
          delta="-4"
          helper="resolved"
        />
        <StatCard
          label="Open Complaints"
          value="12"
          icon={MessageSquareWarning}
          helper="3 urgent"
        />
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <QuickActions 
          onAddResident={() => setIsAddResidentOpen(true)}
          onGenerateBill={() => handleAction("Generate Bill")}
          onPostNotice={() => handleAction("Post Notice")}
          onLogMaintenance={() => handleAction("Log Maintenance")}
        />
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
        <div className="lg:col-span-1">
          <DashboardCalendar />
        </div>
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>

      <AddResidentDialog 
        open={isAddResidentOpen} 
        onOpenChange={setIsAddResidentOpen} 
      />
    </AppShell>
  );
};

export default Index;

