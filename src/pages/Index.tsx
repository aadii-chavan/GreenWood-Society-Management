import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
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
import { DashboardCalendar } from "@/components/dashboard/DashboardCalendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { 
  MOCK_RESIDENTS, 
  MOCK_BILLS, 
  MOCK_COMPLAINTS, 
  MOCK_VISITORS 
} from "@/lib/mockData";
import { toast } from "sonner";

const Index = () => {
  const [stats, setStats] = useState({
    residents: 0,
    pendingBills: 0,
    activeComplaints: 0,
    visitors: 0,
    outstandingAmount: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [resRes, resBills, resComp, resVisitors] = await Promise.all([
          fetch("http://localhost:5000/api/residents").then(r => r.ok ? r.json() : MOCK_RESIDENTS),
          fetch("http://localhost:5000/api/bills").then(r => r.ok ? r.json() : MOCK_BILLS),
          fetch("http://localhost:5000/api/complaints").then(r => r.ok ? r.json() : MOCK_COMPLAINTS),
          fetch("http://localhost:5000/api/visitors").then(r => r.ok ? r.json() : MOCK_VISITORS)
        ]);
        
        const residents = resRes;
        const bills = resBills;
        const complaints = resComp;
        const visitors = resVisitors;
        
        const pending = bills.filter((b: any) => b.status === 'pending');
        const totalOutstanding = pending.reduce((sum: number, b: any) => sum + Number(b.amount), 0);

        setStats({
          residents: residents.length,
          pendingBills: pending.length,
          activeComplaints: complaints.filter((c: any) => c.status !== 'resolved').length,
          visitors: visitors.length,
          outstandingAmount: totalOutstanding
        });
      } catch (error) {
        console.warn("Backend not reached for stats, using mock data fallback.");
        const pending = MOCK_BILLS.filter((b: any) => b.status === 'pending');
        const totalOutstanding = pending.reduce((sum: number, b: any) => sum + Number(b.amount), 0);
        
        setStats({
          residents: MOCK_RESIDENTS.length,
          pendingBills: pending.length,
          activeComplaints: MOCK_COMPLAINTS.filter((c: any) => c.status !== 'resolved').length,
          visitors: MOCK_VISITORS.length,
          outstandingAmount: totalOutstanding
        });
      }
    };
    fetchStats();
  }, []);
  const [isAddResidentOpen, setIsAddResidentOpen] = useState(false);
  const [isGenerateBillOpen, setIsGenerateBillOpen] = useState(false);
  const [isNewComplaintOpen, setIsNewComplaintOpen] = useState(false);
  const [isVisitorEntryOpen, setIsVisitorEntryOpen] = useState(false);
  const [isPostNoticeOpen, setIsPostNoticeOpen] = useState(false);

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

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
            <Button 
              variant="outline" 
              onClick={() => setIsCalendarVisible(!isCalendarVisible)}
              className={cn(
                "rounded-lg h-10 px-4 text-[13px] font-semibold border-border bg-card transition-all",
                isCalendarVisible ? "text-primary border-primary/40 bg-primary/5" : "hover:bg-accent"
              )}
            >
              <CalendarIcon className="h-4 w-4 mr-2" /> Calendar
            </Button>
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
          <StatCard highlight label="Total Residents" value={stats.residents.toString()} icon={Users} delta="+0" helper="this month" />
          <StatCard label="Pending Bills" value={stats.pendingBills.toString()} icon={IndianRupee} delta="+0" helper={`₹${(stats.outstandingAmount/1000).toFixed(1)}K outstanding`} />
          <StatCard label="Active Complaints" value={stats.activeComplaints.toString()} icon={MessageSquareWarning} delta="+0" helper="needs attention" />
          <StatCard label="Gate Entries" value={stats.visitors.toString()} icon={ShieldCheck} delta="+0" helper="today" />
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

        {/* Dynamic Row: Calendar & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className={cn("transition-all duration-500 ease-in-out", isCalendarVisible ? "lg:col-span-2" : "lg:col-span-3")}>
             <RecentActivity />
          </div>
          {isCalendarVisible && (
            <div className="lg:col-span-1 animate-in fade-in slide-in-from-right-4 duration-500">
              <DashboardCalendar />
            </div>
          )}
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

