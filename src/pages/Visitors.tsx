import { useState, useEffect } from "react";
import { CrudPage } from "@/components/layout/CrudPage";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { StatCard } from "@/components/ui/StatCard";
import { UserPlus, LogIn, LogOut, Car } from "lucide-react";
import { AddVisitorDialog } from "@/components/dashboard/AddVisitorDialog";
import { toast } from "sonner";

const Visitors = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [visitors, setVisitors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/visitors");
      const data = await response.json();
      setVisitors(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching visitors:", error);
      setLoading(false);
    }
  };

  const handleAdd = async (newV: any) => {
    try {
        await fetch("http://localhost:5000/api/visitors", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: newV.name,
                purpose: newV.purpose,
                host_unit: newV.host.split(" (")[0],
                vehicle_number: newV.vehicle || "—",
                entry_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                status: "in"
            })
        });
        fetchVisitors();
        toast.success("Visitor entry logged!");
    } catch (error) {
        toast.error("Failed to log visitor");
    }
  };

  return (
    <CrudPage 
      title="Visitors" 
      subtitle="Real-time gate log and visitor approvals." 
      addLabel="Add visitor"
      onAdd={() => setIsAddOpen(true)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <StatCard size="sm" highlight label="Visitors today" value="42" icon={UserPlus} delta="+8" helper="vs yesterday" />
        <StatCard size="sm" label="Currently inside" value="11" icon={LogIn} helper="9 expected to leave by 6 PM" />
        <StatCard size="sm" label="Vehicles parked" value="6" icon={Car} helper="2 guest slots free" />
      </div>

      <AddVisitorDialog 
        open={isAddOpen} 
        onOpenChange={setIsAddOpen} 
        onAdd={handleAdd}
      />

      <div className="surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground bg-secondary/50">
                <th className="text-left font-medium px-5 py-3">Visitor</th>
                <th className="text-left font-medium px-5 py-3">Purpose</th>
                <th className="text-left font-medium px-5 py-3">Host flat</th>
                <th className="text-left font-medium px-5 py-3">Vehicle</th>
                <th className="text-left font-medium px-5 py-3">In</th>
                <th className="text-left font-medium px-5 py-3">Out</th>
                <th className="text-left font-medium px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map((v: any, i: number) => (
                <tr key={i} className="border-t border-border/60 hover:bg-secondary/40 transition-colors">
                   <td className="px-5 py-4 font-semibold">{v.name}</td>
                  <td className="px-5 py-4 text-muted-foreground">{v.purpose}</td>
                  <td className="px-5 py-4 font-semibold">{v.host_unit}</td>
                  <td className="px-5 py-4 text-muted-foreground tabular-nums">{v.vehicle_number}</td>
                  <td className="px-5 py-4 tabular-nums">{v.entry_time}</td>
                  <td className="px-5 py-4 tabular-nums text-muted-foreground">{v.exit_time}</td>
                  <td className="px-5 py-4">
                    {v.status === "in" ? (
                      <StatusBadge tone="info"><LogIn className="h-3 w-3" /> Inside</StatusBadge>
                    ) : (
                      <StatusBadge tone="success"><LogOut className="h-3 w-3" /> Exited</StatusBadge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CrudPage>
  );
};

export default Visitors;
