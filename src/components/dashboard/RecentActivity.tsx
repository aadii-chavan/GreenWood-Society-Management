import { StatusBadge } from "@/components/ui/StatusBadge";
import { ArrowUpRight } from "lucide-react";

const activity = [
  { name: "Priya Sharma", flat: "B-1204", action: "Paid maintenance", amount: "₹4,500", status: "paid", time: "2m ago" },
  { name: "Rohan Mehta", flat: "A-301", action: "Filed complaint — leakage", amount: "—", status: "open", time: "12m ago" },
  { name: "Ananya Iyer", flat: "C-805", action: "Booked Clubhouse", amount: "₹1,200", status: "paid", time: "1h ago" },
  { name: "Vikram Patel", flat: "D-110", action: "Visitor entry approved", amount: "—", status: "info", time: "2h ago" },
  { name: "Sneha Nair", flat: "B-602", action: "Bill overdue", amount: "₹4,500", status: "overdue", time: "5h ago" },
];

const toneFor = (s: string) => {
  if (s === "paid") return "success" as const;
  if (s === "overdue") return "destructive" as const;
  if (s === "open") return "warning" as const;
  return "info" as const;
};

const labelFor = (s: string) => {
  if (s === "paid") return "Paid";
  if (s === "overdue") return "Overdue";
  if (s === "open") return "Open";
  return "Info";
};

export const RecentActivity = () => {
  return (
    <div className="surface-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="eyebrow">Activity feed</p>
          <h3 className="display-text text-[19px] font-bold mt-1.5">Recent activity</h3>
        </div>
        <button className="text-[12px] font-semibold text-primary hover:underline inline-flex items-center gap-1">
          View all <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="overflow-x-auto -mx-1">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-[10.5px] uppercase tracking-wider text-muted-foreground">
              <th className="text-left font-semibold px-2 pb-3">Resident</th>
              <th className="text-left font-semibold px-2 pb-3">Activity</th>
              <th className="text-left font-semibold px-2 pb-3">Amount</th>
              <th className="text-left font-semibold px-2 pb-3">Status</th>
              <th className="text-right font-semibold px-2 pb-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {activity.map((a) => (
              <tr key={a.name} className="border-t border-border/60 hover:bg-secondary/50 transition-colors">
                <td className="px-2 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary-soft text-primary flex items-center justify-center text-[11px] font-semibold">
                      {a.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="leading-tight">
                      <p className="font-semibold">{a.name}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 mono">Flat {a.flat}</p>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-3.5 text-muted-foreground">{a.action}</td>
                <td className="px-2 py-3.5 font-semibold tabular-nums">{a.amount}</td>
                <td className="px-2 py-3.5">
                  <StatusBadge tone={toneFor(a.status)}>{labelFor(a.status)}</StatusBadge>
                </td>
                <td className="px-2 py-3.5 text-right text-[11.5px] text-muted-foreground tabular-nums">{a.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
