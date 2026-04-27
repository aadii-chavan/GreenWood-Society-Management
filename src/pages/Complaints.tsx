import { useState, useEffect } from "react";
import { CrudPage } from "@/components/layout/CrudPage";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MessageSquareWarning, Clock, CheckCircle2, Check } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/button";
import { NewComplaintDialog } from "@/components/dashboard/NewComplaintDialog";
import { toast } from "sonner";

const pTone = (p: string) => p === "high" ? "destructive" : p === "medium" ? "warning" : "info";
const sTone = (s: string) => s === "resolved" ? "success" : s === "pending" ? "info" : "warning";
const sLabel = (s: string) => s === "pending" ? "Pending" : s[0]?.toUpperCase() + s.slice(1);

const Complaints = () => {
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/complaints");
      if (!response.ok) throw new Error("Server response not ok");
      const data = await response.json();
      setComplaints(data);
      setLoading(false);
    } catch (error) {
      console.warn("Backend not reached, showing empty complaints list.");
      setComplaints([]);
      setLoading(false);
    }
  };

  const handleResolve = async (id: string) => {
    try {
      // Mock logic: Update local state immediately
      setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: "resolved" } : c));
      toast.success("Complaint marked as resolved!");

      // Backend attempt
      await fetch(`http://localhost:5001/api/complaints/${encodeURIComponent(id)}/resolve`, { method: "PATCH" });
    } catch (error) {
      console.warn("Backend update failed, but local UI is updated.");
    }
  };

  const handleStartWork = async (id: string) => {
    try {
      setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: "pending" } : c));
      toast.info("Complaint moved to pending");
      await fetch(`http://localhost:5001/api/complaints/${encodeURIComponent(id)}/status`, { 
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "pending" })
      });
    } catch (error) {
      console.warn("Backend update failed.");
    }
  };

  const handleSubmit = async (newC: any) => {
    const newComplaint = {
      id: `#C-0${Math.floor(Math.random() * 1000)}`,
      resident_name: newC.resident_name,
      unit_number: newC.unit_number,
      title: newC.title,
      category: newC.category,
      priority: newC.priority,
      status: "open",
      created_at: new Date().toISOString(),
    };

    // Update local state first
    setComplaints([newComplaint, ...complaints]);
    setIsNewOpen(false);
    toast.success("Complaint logged!");

    try {
        await fetch("http://localhost:5001/api/complaints", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newComplaint)
        });
    } catch (error) {
        console.warn("Backend not reached, kept in local state.");
    }
  };

  const handleExport = () => {
    const headers = ["ID", "Title", "Category", "Priority", "Status"];
    const csvData = complaints.map(c => [c.id, c.title, c.category, c.priority, c.status].join(","));
    const csvContent = [headers.join(","), ...csvData].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `complaints_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success("Complaints log exported!");
  };

  return (
    <CrudPage 
      title="Complaints" 
      subtitle="Track and resolve resident grievances quickly." 
      addLabel="New complaint"
      onAdd={() => setIsNewOpen(true)}
      onExport={handleExport}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <StatCard size="sm" highlight label="Open" value={complaints.filter((c: any) => c.status === 'open').length.toString()} icon={MessageSquareWarning} helper="needs assignment" />
        <StatCard size="sm" label="Pending" value={complaints.filter((c: any) => c.status === 'pending').length.toString()} icon={Clock} helper="team working" />
        <StatCard size="sm" label="Resolved" value={complaints.filter((c: any) => c.status === 'resolved').length.toString()} icon={CheckCircle2} helper="this month" />
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
                <p className="text-xs text-muted-foreground mt-1">By {c.resident_name} · Flat {c.unit_number}</p>
              </div>
              <StatusBadge tone={sTone(c.status)}>{sLabel(c.status)}</StatusBadge>
            </div>
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/60">
              <StatusBadge tone={pTone(c.priority)}>{c.priority[0].toUpperCase() + c.priority.slice(1)} priority</StatusBadge>
              <div className="flex items-center gap-2">
                {c.status === "open" && (
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 px-2 text-xs font-bold text-info hover:bg-info/10 gap-1.5"
                    onClick={() => handleStartWork(c.id)}
                  >
                    <Clock className="h-3 w-3" /> Start Work
                  </Button>
                )}
                {c.status !== "resolved" ? (
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 px-2 text-xs font-bold text-primary hover:bg-primary/10 gap-1.5"
                    onClick={() => handleResolve(c.id)}
                  >
                    <Check className="h-3 w-3" /> Mark Resolved
                  </Button>
                ) : (
                  <span className="text-xs text-muted-foreground tabular-nums">{c.time || "Recently"}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </CrudPage>
  );
};

export default Complaints;
