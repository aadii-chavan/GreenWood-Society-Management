import { useState, useEffect } from "react";
import { StatCard } from "@/components/ui/StatCard";
import { Users, IndianRupee, MessageSquareWarning, ShieldCheck, Plus, Filter } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { AddResidentDialog } from "@/components/dashboard/AddResidentDialog";
import { GenerateBillDialog } from "@/components/dashboard/GenerateBillDialog";
import { NewComplaintDialog } from "@/components/dashboard/NewComplaintDialog";
import { AddVisitorDialog } from "@/components/dashboard/AddVisitorDialog";
import { AddNoticeDialog } from "@/components/dashboard/AddNoticeDialog";
import { toast } from "sonner";

const Index = () => {
  const [stats, setStats] = useState({
    residents: 0,
    bills: 0,
    complaints: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [resRes, resBills, resComp] = await Promise.all([
          fetch("http://localhost:5000/api/residents"),
          fetch("http://localhost:5000/api/bills"),
          fetch("http://localhost:5000/api/complaints")
        ]);
        const residents = await resRes.json();
        const bills = await resBills.json();
        const complaints = await resComp.json();
        
        setStats({
          residents: residents.length,
          bills: bills.length,
          complaints: complaints.length
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };
    fetchStats();
  }, []);
  const [isAddResidentOpen, setIsAddResidentOpen] = useState(false);
  const [isGenerateBillOpen, setIsGenerateBillOpen] = useState(false);
  const [isNewComplaintOpen, setIsNewComplaintOpen] = useState(false);
  const [isVisitorEntryOpen, setIsVisitorEntryOpen] = useState(false);
  const [isPostNoticeOpen, setIsPostNoticeOpen] = useState(false);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard highlight label="Total Residents" value={stats.residents.toString()} icon={Users} delta="+4" helper="this month" />
          <StatCard label="Pending Bills" value={stats.bills.toString()} icon={IndianRupee} delta="+2" helper="₹1.4L outstanding" />
          <StatCard label="Active Complaints" value={stats.complaints.toString()} icon={MessageSquareWarning} delta="-5" helper="3 urgent" />
          <StatCard label="Gate Entries" value="42" icon={ShieldCheck} delta="+8" helper="today" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div className="lg:col-span-1">
            <QuickActions 
              onAddResident={() => setIsAddResidentOpen(true)}
              onGenerateBill={() => setIsGenerateBillOpen(true)}
              onPostNotice={() => setIsPostNoticeOpen(true)}
              onVisitorEntry={() => setIsVisitorEntryOpen(true)}
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

      <NewComplaintDialog 
        open={isNewComplaintOpen} 
        onOpenChange={setIsNewComplaintOpen} 
      />

      <AddVisitorDialog 
        open={isVisitorEntryOpen} 
        onOpenChange={setIsVisitorEntryOpen} 
      />

      <AddNoticeDialog 
        open={isPostNoticeOpen} 
        onOpenChange={setIsPostNoticeOpen} 
      />
    </AppShell>
  );
};

export default Index;

