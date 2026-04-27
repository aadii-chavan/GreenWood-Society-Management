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
import { toast } from "sonner";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  isSameMonth, 
  parseISO, 
  parse, 
  isValid 
} from "date-fns";

const parseDateString = (dateStr: string) => {
  if (!dateStr) return new Date(0);
  if (dateStr.includes('T')) return parseISO(dateStr);
  if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) return parseISO(dateStr);
  
  // Try DD MMM YYYY
  const d = parse(dateStr, 'dd MMM yyyy', new Date());
  if (isValid(d)) return d;
  
  return new Date(0);
};

const Index = () => {
  const [timeRange, setTimeRange] = useState<'this-month' | 'all-time'>('all-time');
  const [data, setData] = useState({
    residents: [] as any[],
    bills: [] as any[],
    complaints: [] as any[],
    visitors: [] as any[]
  });
  const [stats, setStats] = useState({
    residents: 0,
    pendingBills: 0,
    activeComplaints: 0,
    visitors: 0,
    outstandingAmount: 0,
    residentDelta: "+0",
    billDelta: "+0",
    complaintDelta: "+0",
    visitorDelta: "+0"
  });

  const calculateStats = (rawData: any, range: 'this-month' | 'all-time') => {
    const now = new Date("2026-04-27"); // Current simulated date
    
    let filteredResidents = rawData.residents;
    let filteredBills = rawData.bills;
    let filteredComplaints = rawData.complaints;
    let filteredVisitors = rawData.visitors;

    if (range === 'this-month') {
      filteredResidents = rawData.residents.filter((r: any) => isSameMonth(parseDateString(r.joined_date), now));
      filteredBills = rawData.bills.filter((b: any) => isSameMonth(parseDateString(b.due_date), now));
      filteredComplaints = rawData.complaints.filter((c: any) => isSameMonth(parseDateString(c.created_at), now));
      // For visitors, mock entry_time is just time, so we assume today (this month)
      filteredVisitors = rawData.visitors;
    }

    const pending = filteredBills.filter((b: any) => b.status === 'pending' || b.status === 'overdue');
    const totalOutstanding = pending.reduce((sum: number, b: any) => sum + Number(b.amount), 0);

    setStats({
      residents: filteredResidents.length,
      pendingBills: pending.length,
      activeComplaints: filteredComplaints.filter((c: any) => c.status !== 'resolved').length,
      visitors: filteredVisitors.length,
      outstandingAmount: totalOutstanding,
      residentDelta: range === 'this-month' ? `+${filteredResidents.length}` : "+0",
      billDelta: range === 'this-month' ? `+${pending.length}` : "+0",
      complaintDelta: range === 'this-month' ? `+${filteredComplaints.length}` : "+0",
      visitorDelta: "+0"
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resRes, resBills, resComp, resVisitors] = await Promise.all([
          fetch("http://localhost:5001/api/residents").then(r => r.ok ? r.json() : []),
          fetch("http://localhost:5001/api/bills").then(r => r.ok ? r.json() : []),
          fetch("http://localhost:5001/api/complaints").then(r => r.ok ? r.json() : []),
          fetch("http://localhost:5001/api/visitors").then(r => r.ok ? r.json() : [])
        ]);
        
        const fetchedData = {
          residents: resRes,
          bills: resBills,
          complaints: resComp,
          visitors: resVisitors
        };
        setData(fetchedData);
        calculateStats(fetchedData, timeRange);
      } catch (error) {
        console.warn("Backend not reached for stats, using empty data.");
        const fallbackData = {
          residents: [],
          bills: [],
          complaints: [],
          visitors: []
        };
        setData(fallbackData);
        calculateStats(fallbackData, timeRange);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.residents.length > 0 || data.bills.length > 0) {
      calculateStats(data, timeRange);
    }
  }, [timeRange, data]);
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
        subtitle="Welcome back, ADITYA CHAVAN — here's what's happening at Greenwood today."
        actions={
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-lg h-10 px-4 text-[13px] font-semibold border-border bg-card hover:bg-accent capitalize">
                  <Filter className="h-4 w-4 mr-2" /> {timeRange.replace('-', ' ')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => setTimeRange('this-month')}>
                  This month
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeRange('all-time')}>
                  All time
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
          <StatCard highlight label="Total Residents" value={stats.residents.toString()} icon={Users} delta={stats.residentDelta} helper={timeRange === 'this-month' ? "joined this month" : "total active"} />
          <StatCard label="Pending Bills" value={stats.pendingBills.toString()} icon={IndianRupee} delta={stats.billDelta} helper={timeRange === 'this-month' ? "issued this month" : `₹${(stats.outstandingAmount/1000).toFixed(1)}K outstanding`} />
          <StatCard label="Active Complaints" value={stats.activeComplaints.toString()} icon={MessageSquareWarning} delta={stats.complaintDelta} helper={timeRange === 'this-month' ? "reported this month" : "needs attention"} />
          <StatCard label="Gate Entries" value={stats.visitors.toString()} icon={ShieldCheck} delta={stats.visitorDelta} helper="today" />
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

