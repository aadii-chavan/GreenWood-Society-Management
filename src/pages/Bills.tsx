import { useState } from "react";
import { CrudPage } from "@/components/layout/CrudPage";
import { StatCard } from "@/components/ui/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { IndianRupee, Receipt, AlertCircle, MoreHorizontal } from "lucide-react";
import { GenerateBillDialog } from "@/components/dashboard/GenerateBillDialog";

const billsData = [
  { id: "INV-2025-0421", flat: "B-1204", resident: "Priya Sharma", amount: "₹4,500", due: "30 Apr 2026", status: "paid" },
  { id: "INV-2025-0420", flat: "A-301", resident: "Rohan Mehta", amount: "₹4,500", due: "30 Apr 2026", status: "pending" },
  { id: "INV-2025-0419", flat: "C-805", resident: "Ananya Iyer", amount: "₹5,200", due: "28 Apr 2026", status: "paid" },
  { id: "INV-2025-0418", flat: "B-602", resident: "Sneha Nair", amount: "₹4,500", due: "15 Apr 2026", status: "overdue" },
  { id: "INV-2025-0417", flat: "D-110", resident: "Vikram Patel", amount: "₹3,800", due: "10 Apr 2026", status: "overdue" },
  { id: "INV-2025-0416", flat: "A-1002", resident: "Arjun Kapoor", amount: "₹5,200", due: "05 May 2026", status: "pending" },
];

const tone = (s: string) => s === "paid" ? "success" : s === "overdue" ? "destructive" : "warning";

const Bills = () => {
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [bills, setBills] = useState(billsData);

  const handleGenerate = (newBill: any) => {
    const bill = {
      id: `INV-2025-0${422 + bills.length}`,
      resident: newBill.resident.split(" (")[0],
      flat: newBill.resident.split("(")[1].replace(")", ""),
      amount: `₹${Number(newBill.amount).toLocaleString()}`,
      due: "30 May 2026",
      status: "pending"
    };
    setBills([bill, ...bills]);
  };

  return (
    <CrudPage 
      title="Bills" 
      subtitle="Generate invoices and track maintenance dues." 
      addLabel="Generate bill"
      onAdd={() => setIsGenerateOpen(true)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <StatCard size="sm" highlight label="Collected this month" value="₹6.4L" icon={IndianRupee} delta="+8.4%" helper="vs last month" />
        <StatCard size="sm" label="Pending" value="32" icon={Receipt} helper="₹1.4L outstanding" />
        <StatCard size="sm" label="Overdue" value="8" icon={AlertCircle} helper="needs follow-up" />
      </div>

      <GenerateBillDialog 
        open={isGenerateOpen} 
        onOpenChange={setIsGenerateOpen} 
        onGenerate={handleGenerate}
      />

      <div className="surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground bg-secondary/50">
                <th className="text-left font-medium px-5 py-3">Invoice</th>
                <th className="text-left font-medium px-5 py-3">Resident</th>
                <th className="text-left font-medium px-5 py-3">Amount</th>
                <th className="text-left font-medium px-5 py-3">Due date</th>
                <th className="text-left font-medium px-5 py-3">Status</th>
                <th className="text-right font-medium px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {bills.map((b) => (
                <tr key={b.id} className="border-t border-border/60 hover:bg-secondary/40 transition-colors">
                  <td className="px-5 py-4 font-semibold">{b.id}</td>
                  <td className="px-5 py-4">
                    <p className="font-semibold">{b.resident}</p>
                    <p className="text-xs text-muted-foreground">Flat {b.flat}</p>
                  </td>
                  <td className="px-5 py-4 font-semibold tabular-nums">{b.amount}</td>
                  <td className="px-5 py-4 text-muted-foreground">{b.due}</td>
                  <td className="px-5 py-4">
                    <StatusBadge tone={tone(b.status)}>
                      {b.status[0].toUpperCase() + b.status.slice(1)}
                    </StatusBadge>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Button variant="ghost" size="icon" className="rounded-full"><MoreHorizontal className="h-4 w-4" /></Button>
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

export default Bills;
