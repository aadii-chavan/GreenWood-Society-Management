import { useState, useEffect } from "react";
import { CrudPage } from "@/components/layout/CrudPage";
import { StatCard } from "@/components/ui/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { IndianRupee, Receipt, AlertCircle, MoreHorizontal } from "lucide-react";
import { GenerateBillDialog } from "@/components/dashboard/GenerateBillDialog";
import { toast } from "sonner";

const Bills = () => {
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [bills, setBills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/bills");
      const data = await response.json();
      setBills(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bills:", error);
      setLoading(false);
    }
  };

  const handleGenerate = async (newBill: any) => {
    try {
        await fetch("http://localhost:5000/api/bills", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: `INV-2025-0${Math.floor(Math.random() * 1000)}`,
                resident_id: 1, // Defaulting to first resident for simplicity
                amount: newBill.amount,
                due_date: "30 May 2026",
                status: "pending"
            })
        });
        fetchBills();
        toast.success("Bill generated successfully!");
    } catch (error) {
        toast.error("Failed to generate bill");
    }
  };

  const tone = (status: string): "success" | "warning" | "destructive" => {
    if (status === "paid") return "success";
    if (status === "pending") return "warning";
    return "destructive";
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
              {bills.map((b: any) => (
                <tr key={b.id} className="border-t border-border/60 hover:bg-secondary/40 transition-colors">
                  <td className="px-5 py-4 font-semibold">{b.id}</td>
                  <td className="px-5 py-4">
                    <p className="font-semibold">{b.resident_name}</p>
                    <p className="text-xs text-muted-foreground">Flat {b.unit_number}</p>
                  </td>
                  <td className="px-5 py-4 font-semibold tabular-nums">₹{Number(b.amount).toLocaleString()}</td>
                  <td className="px-5 py-4 text-muted-foreground">{b.due_date}</td>
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
