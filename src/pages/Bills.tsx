import { useState, useEffect } from "react";
import { CrudPage } from "@/components/layout/CrudPage";
import { StatCard } from "@/components/ui/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { IndianRupee, Receipt, AlertCircle, MoreHorizontal, CheckCircle2, Trash2, FileText, Send } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
      if (!response.ok) throw new Error("Server response not ok");
      const data = await response.json();
      setBills(data);
      setLoading(false);
    } catch (error) {
      console.warn("Backend not reached, showing empty bills list.");
      setBills([]);
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    // Mock logic: Update local state immediately
    setBills(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    toast.success(`Bill marked as ${status}!`);

    try {
      await fetch(`http://localhost:5000/api/bills/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
    } catch (error) {
      console.warn("Backend update failed, kept in local state.");
    }
  };

  const handleGenerate = async (newBill: any) => {
    const generatedBill = {
        id: `INV-2025-0${Math.floor(Math.random() * 1000)}`,
        resident_name: "Mock Resident", // In a real app, this would be selected
        unit_number: "A-101",
        amount: newBill.amount,
        due_date: "30 May 2026",
        status: "pending"
    };

    // Update local state first
    setBills([generatedBill, ...bills]);
    setIsGenerateOpen(false);
    toast.success("Bill generated successfully!");

    try {
        await fetch("http://localhost:5000/api/bills", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(generatedBill)
        });
    } catch (error) {
        console.warn("Backend not reached, kept in local state.");
    }
  };

  const tone = (status: string): "success" | "warning" | "destructive" => {
    if (status === "paid") return "success";
    if (status === "pending") return "warning";
    return "destructive";
  };

  const handleDeleteBill = (id: string) => {
    setBills(prev => prev.filter(b => b.id !== id));
    toast.success(`Invoice ${id} has been deleted.`);
  };

  const handleExport = () => {
    const headers = ["Invoice", "Resident", "Amount", "Due Date", "Status"];
    const csvData = bills.map(b => [b.id, b.resident_name, b.amount, b.due_date, b.status].join(","));
    const csvContent = [headers.join(","), ...csvData].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bills_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success("Billing history exported!");
  };

  return (
    <CrudPage 
      title="Bills" 
      subtitle="Generate invoices and track maintenance dues." 
      addLabel="Generate bill"
      onAdd={() => setIsGenerateOpen(true)}
      onExport={handleExport}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <StatCard size="sm" highlight label="Collected" value={`₹${(bills.filter((b: any) => b.status === 'paid').reduce((s: number, b: any) => s + Number(b.amount), 0) / 1000).toFixed(1)}K`} icon={IndianRupee} helper="from paid bills" />
        <StatCard size="sm" label="Pending" value={bills.filter((b: any) => b.status === 'pending').length.toString()} icon={Receipt} helper={`₹${(bills.filter((b: any) => b.status === 'pending').reduce((s: number, b: any) => s + Number(b.amount), 0) / 1000).toFixed(1)}K due`} />
        <StatCard size="sm" label="Overdue" value={bills.filter((b: any) => b.status === 'overdue').length.toString()} icon={AlertCircle} helper="needs follow-up" />
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
                    <div className="flex items-center gap-2">
                      <StatusBadge tone={tone(b.status)}>
                        {b.status[0].toUpperCase() + b.status.slice(1)}
                      </StatusBadge>
                      {b.status !== "paid" && (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-7 px-2 text-[10px] font-bold text-success hover:bg-success/10 gap-1"
                          onClick={() => handleUpdateStatus(b.id, "paid")}
                        >
                          <CheckCircle2 className="h-2.5 w-2.5" /> Mark Paid
                        </Button>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl border-border/60 w-48">
                        <DropdownMenuLabel>Invoice Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => toast.info("Viewing invoice...")}>
                          <FileText className="h-3.5 w-3.5" /> View Invoice
                        </DropdownMenuItem>
                        {b.status !== "paid" && (
                          <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => toast.info("Reminder sent!")}>
                            <Send className="h-3.5 w-3.5" /> Send Reminder
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                          onClick={() => handleDeleteBill(b.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete Invoice
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
