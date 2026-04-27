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
import { UserCheck, Car, User } from "lucide-react";
import { toast } from "sonner";

interface AddVisitorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd?: (visitor: any) => void;
}

export const AddVisitorDialog = ({ open, onOpenChange, onAdd }: AddVisitorDialogProps) => {
  const [visitor, setVisitor] = useState({
    name: "",
    purpose: "Guest",
    host: "",
    vehicle: ""
  });

  const handleAdd = () => {
    if (!visitor.name || !visitor.host) {
      toast.error("Please fill in visitor name and host flat");
      return;
    }

    // Name Validation
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    if (!nameRegex.test(visitor.name)) {
      toast.error("Please enter a valid name (letters only)");
      return;
    }

    if (onAdd) onAdd(visitor);
    onOpenChange(false);
    toast.success(`Entry logged for ${visitor.name}. Notification sent to flat ${visitor.host}.`);
    setVisitor({ name: "", purpose: "Guest", host: "", vehicle: "" });
  };

  const commonHosts = [
    "B-1204 (Priya Sharma)",
    "A-301 (Rohan Mehta)",
    "C-805 (Ananya Iyer)",
    "B-602 (Sneha Nair)",
    "D-110 (Vikram Patel)"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] rounded-3xl border-border/60 bg-card/95 backdrop-blur-xl p-0 overflow-hidden shadow-2xl">
        <div className="p-8 pb-0">
          <DialogHeader>
            <div className="h-12 w-12 rounded-2xl bg-success/10 text-success flex items-center justify-center mb-4">
              <UserCheck className="h-6 w-6" />
            </div>
            <DialogTitle className="text-2xl font-bold">New Visitor Entry</DialogTitle>
            <DialogDescription className="text-[14px]">
              Log a new visitor at the main gate.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-6">
            <div className="space-y-2">
              <Label className="text-[13px] font-semibold">Visitor Name</Label>
              <div className="relative">
                <Input 
                  placeholder="e.g. John Doe" 
                  className="bg-secondary/40 border-border/60 rounded-xl h-11 pl-10"
                  value={visitor.name}
                  onChange={(e) => setVisitor({...visitor, name: e.target.value})}
                />
                <User className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[13px] font-semibold">Purpose</Label>
                <Select 
                  value={visitor.purpose} 
                  onValueChange={(v) => setVisitor({...visitor, purpose: v})}
                >
                  <SelectTrigger className="bg-secondary/40 border-border/60 rounded-xl h-11">
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border/60">
                    <SelectItem value="Guest">Personal Guest</SelectItem>
                    <SelectItem value="Delivery">Delivery / Courier</SelectItem>
                    <SelectItem value="Service">Service / Repair</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[13px] font-semibold">Vehicle (Optional)</Label>
                <div className="relative">
                  <Input 
                    placeholder="MH-01-AB-1234" 
                    className="bg-secondary/40 border-border/60 rounded-xl h-11 pl-10"
                    value={visitor.vehicle}
                    onChange={(e) => setVisitor({...visitor, vehicle: e.target.value})}
                  />
                  <Car className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[13px] font-semibold">Host Flat</Label>
              <Select 
                value={visitor.host} 
                onValueChange={(v) => setVisitor({...visitor, host: v})}
              >
                <SelectTrigger className="bg-secondary/40 border-border/60 rounded-xl h-11">
                  <SelectValue placeholder="Select host flat" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/60">
                  {commonHosts.map(h => (
                    <SelectItem key={h} value={h}>{h}</SelectItem>
                  ))}
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
            onClick={handleAdd}
          >
            Log Entry
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
