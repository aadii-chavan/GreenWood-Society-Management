import { CrudPage } from "@/components/layout/CrudPage";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { StatCard } from "@/components/ui/StatCard";
import { UserPlus, LogIn, LogOut, Car } from "lucide-react";

const visitors = [
  { name: "Amazon Delivery", purpose: "Package delivery", host: "B-1204", in: "10:42", out: "10:48", vehicle: "MH-12-AB-4421", status: "out" },
  { name: "Dr. Kapoor", purpose: "Doctor visit", host: "A-301", in: "11:15", out: "—", vehicle: "MH-01-XY-1023", status: "in" },
  { name: "Plumber — Ramesh", purpose: "Maintenance", host: "C-805", in: "09:00", out: "10:30", vehicle: "—", status: "out" },
  { name: "Swiggy", purpose: "Food delivery", host: "B-602", in: "12:55", out: "12:59", vehicle: "—", status: "out" },
  { name: "Mr. & Mrs. Verma", purpose: "Family visit", host: "D-110", in: "13:20", out: "—", vehicle: "MH-04-LK-5512", status: "in" },
];

const Visitors = () => {
  return (
    <CrudPage title="Visitors" subtitle="Real-time gate log and visitor approvals." addLabel="Add visitor">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <StatCard highlight label="Visitors today" value="42" icon={UserPlus} delta="+8" helper="vs yesterday" />
        <StatCard label="Currently inside" value="11" icon={LogIn} helper="9 expected to leave by 6 PM" />
        <StatCard label="Vehicles parked" value="6" icon={Car} helper="2 guest slots free" />
      </div>

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
              {visitors.map((v, i) => (
                <tr key={i} className="border-t border-border/60 hover:bg-secondary/40 transition-colors">
                  <td className="px-5 py-4 font-semibold">{v.name}</td>
                  <td className="px-5 py-4 text-muted-foreground">{v.purpose}</td>
                  <td className="px-5 py-4 font-semibold">{v.host}</td>
                  <td className="px-5 py-4 text-muted-foreground tabular-nums">{v.vehicle}</td>
                  <td className="px-5 py-4 tabular-nums">{v.in}</td>
                  <td className="px-5 py-4 tabular-nums text-muted-foreground">{v.out}</td>
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
