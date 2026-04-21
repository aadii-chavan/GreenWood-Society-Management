import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Receipt, Calendar } from "lucide-react";
import { toast } from "sonner";

interface GenerateBillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate?: (bill: any) => void;
}

export const GenerateBillDialog = ({ open, onOpenChange, onGenerate }: GenerateBillDialogProps) => {
  const [bill, setBill] = useState({
    resident: "",
    month: "April 2026",
    amount: "4500",
    type: "Maintenance"
  });

  const handleGenerate = () => {
    if (!bill.resident || !bill.amount) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (onGenerate) onGenerate(bill);
    onOpenChange(false);
    toast.success(`Bill generated successfully for ${bill.resident}!`);
  };

  const residents = [
    "Priya Sharma (B-1204)",
    "Rohan Mehta (A-301)",
    "Ananya Iyer (C-805)",
    "Sneha Nair (B-602)",
    "Vikram Patel (D-110)",
    "Arjun Kapoor (A-1002)"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] rounded-3xl border-border/60 bg-card/95 backdrop-blur-xl p-0 overflow-hidden shadow-2xl">
        <div className="p-8 pb-0">
          <DialogHeader>
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Receipt className="h-6 w-6" />
            </div>
            <DialogTitle className="text-2xl font-bold">Generate New Bill</DialogTitle>
            <DialogDescription className="text-[14px]">
              Create a maintenance invoice for a resident.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-6">
            <div className="space-y-2">
              <Label className="text-[13px] font-semibold">Select Resident</Label>
              <Select 
                value={bill.resident} 
                onValueChange={(v) => setBill({...bill, resident: v})}
              >
                <SelectTrigger className="bg-secondary/40 border-border/60 rounded-xl h-11">
                  <SelectValue placeholder="Choose resident..." />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/60">
                  {residents.map(r => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[13px] font-semibold">Bill Month</Label>
                <div className="relative">
                  <Input 
                    placeholder="e.g. April 2026" 
                    className="bg-secondary/40 border-border/60 rounded-xl h-11 pl-10"
                    value={bill.month}
                    onChange={(e) => setBill({...bill, month: e.target.value})}
                  />
                  <Calendar className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[13px] font-semibold">Amount (₹)</Label>
                <Input 
                  type="number"
                  placeholder="4500" 
                  className="bg-secondary/40 border-border/60 rounded-xl h-11"
                  value={bill.amount}
                  onChange={(e) => setBill({...bill, amount: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[13px] font-semibold">Bill Type</Label>
              <Select 
                value={bill.type} 
                onValueChange={(v) => setBill({...bill, type: v})}
              >
                <SelectTrigger className="bg-secondary/40 border-border/60 rounded-xl h-11">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/60">
                  <SelectItem value="Maintenance">Monthly Maintenance</SelectItem>
                  <SelectItem value="Amenity">Amenity Booking</SelectItem>
                  <SelectItem value="Penalty">Fine/Penalty</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="p-8 bg-secondary/30 border-t border-border/60 flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1 rounded-xl h-11 font-semibold"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            className="flex-1 rounded-xl h-11 bg-primary hover:bg-primary/90 shadow-glow font-semibold"
            onClick={handleGenerate}
          >
            Generate Bill
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
