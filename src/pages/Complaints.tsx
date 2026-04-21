import { CrudPage } from "@/components/layout/CrudPage";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MessageSquareWarning, Clock, CheckCircle2 } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";

const complaints = [
  { id: "#C-0421", title: "Water leakage in ceiling", flat: "A-301", by: "Rohan Mehta", category: "Plumbing", priority: "high", status: "open", time: "2h ago" },
  { id: "#C-0420", title: "Lift making noise", flat: "B-1204", by: "Priya Sharma", category: "Electrical", priority: "medium", status: "progress", time: "5h ago" },
  { id: "#C-0419", title: "Garbage not collected", flat: "C-805", by: "Ananya Iyer", category: "Housekeeping", priority: "low", status: "resolved", time: "1d ago" },
  { id: "#C-0418", title: "Parking dispute — slot 42", flat: "D-110", by: "Vikram Patel", category: "Parking", priority: "medium", status: "open", time: "1d ago" },
  { id: "#C-0417", title: "Common area lights flickering", flat: "B-602", by: "Sneha Nair", category: "Electrical", priority: "high", status: "progress", time: "2d ago" },
];

const pTone = (p: string) => p === "high" ? "destructive" : p === "medium" ? "warning" : "info";
const sTone = (s: string) => s === "resolved" ? "success" : s === "progress" ? "info" : "warning";
const sLabel = (s: string) => s === "progress" ? "In Progress" : s[0].toUpperCase() + s.slice(1);

const Complaints = () => {
  return (
    <CrudPage title="Complaints" subtitle="Track and resolve resident grievances quickly." addLabel="New complaint">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <StatCard highlight label="Open" value="12" icon={MessageSquareWarning} helper="3 urgent" />
        <StatCard label="In Progress" value="7" icon={Clock} helper="avg 2.4 days" />
        <StatCard label="Resolved" value="64" icon={CheckCircle2} delta="+12" helper="this month" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {complaints.map((c) => (
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
