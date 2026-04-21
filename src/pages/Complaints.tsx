import { useState, useEffect } from "react";
import { CrudPage } from "@/components/layout/CrudPage";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MessageSquareWarning, Clock, CheckCircle2 } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { NewComplaintDialog } from "@/components/dashboard/NewComplaintDialog";
import { toast } from "sonner";

const pTone = (p: string) => p === "high" ? "destructive" : p === "medium" ? "warning" : "info";
const sTone = (s: string) => s === "resolved" ? "success" : s === "progress" ? "info" : "warning";
const sLabel = (s: string) => s === "progress" ? "In Progress" : s[0]?.toUpperCase() + s.slice(1);

const Complaints = () => {
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/complaints");
      const data = await response.json();
      setComplaints(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (newC: any) => {
    try {
        await fetch("http://localhost:5000/api/complaints", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: `#C-0${Math.floor(Math.random() * 1000)}`,
                resident_id: 1, // Default resident
                title: newC.title,
                category: newC.category,
                priority: newC.priority,
                status: "open"
            })
        });
        fetchComplaints();
        toast.success("Complaint logged!");
    } catch (error) {
        toast.error("Failed to log complaint");
    }
  };

  return (
    <CrudPage 
      title="Complaints" 
      subtitle="Track and resolve resident grievances quickly." 
      addLabel="New complaint"
      onAdd={() => setIsNewOpen(true)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <StatCard size="sm" highlight label="Open" value="12" icon={MessageSquareWarning} helper="3 urgent" />
        <StatCard size="sm" label="In Progress" value="7" icon={Clock} helper="avg 2.4 days" />
        <StatCard size="sm" label="Resolved" value="64" icon={CheckCircle2} delta="+12" helper="this month" />
      </div>

      <NewComplaintDialog 
        open={isNewOpen} 
        onOpenChange={setIsNewOpen} 
        onSubmit={handleSubmit}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {complaints.map((c: any) => (
          <div key={c.id} className="surface-card surface-card-hover p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-xs font-semibold text-muted-foreground">{c.id} · {c.category}</p>
                <h4 className="font-semibold text-base mt-1">{c.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">By {c.by} · Flat {c.flat}</p>
              </div>
              <StatusBadge tone={sTone(c.status)}>{sLabel(c.status)}</StatusBadge>
            </div>
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/60">
              <StatusBadge tone={pTone(c.priority)}>{c.priority[0].toUpperCase() + c.priority.slice(1)} priority</StatusBadge>
              <span className="text-xs text-muted-foreground">{c.time}</span>
            </div>
          </div>
        ))}
      </div>
    </CrudPage>
  );
};

export default Complaints;
