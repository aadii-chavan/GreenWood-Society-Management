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
import { UserPlus } from "lucide-react";
import { toast } from "sonner";

interface AddResidentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd?: (resident: any) => void;
}

export const AddResidentDialog = ({ open, onOpenChange, onAdd }: AddResidentDialogProps) => {
  const [newResident, setNewResident] = useState({
    name: "",
    flat: "",
    phone: "",
    email: "",
    type: "Owner",
    status: "active"
  });

  const handleAdd = () => {
    // Basic Required Fields
    if (!newResident.name || !newResident.flat) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Name Validation (Letters and spaces only)
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    if (!nameRegex.test(newResident.name)) {
      toast.error("Please enter a valid name (letters only, 2-50 chars)");
      return;
    }

    // Phone Validation (Exactly 10 digits)
    const phoneDigits = newResident.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    // Email Validation (@ and .com)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]*com[^\s@]*$/; 
    // Relaxed slightly to catch .com anywhere in the TLD part if needed, 
    // but the user specifically said "@ and .com"
    const simpleEmailRegex = /^[^\s@]+@[^\s@]+\..*com.*$/;
    
    if (newResident.email && !simpleEmailRegex.test(newResident.email)) {
      toast.error("Email must contain @ and .com");
      return;
    }

    if (onAdd) onAdd(newResident);
    onOpenChange(false);
    setNewResident({ name: "", flat: "", phone: "", email: "", type: "Owner", status: "active" });
    toast.success(`${newResident.name} added successfully!`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] rounded-3xl border-border/60 bg-card/95 backdrop-blur-xl p-0 overflow-hidden shadow-2xl">
        <div className="p-8 pb-0">
          <DialogHeader>
            <div className="h-12 w-12 rounded-2xl gradient-primary flex items-center justify-center shadow-glow mb-4">
              <UserPlus className="h-6 w-6 text-primary-foreground" />
            </div>
            <DialogTitle className="text-2xl font-bold">Add New Resident</DialogTitle>
            <DialogDescription className="text-[14px]">
              Enter the details of the new resident to add them to the system.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[13px] font-semibold">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g. Arjun Sharma" 
                  className="bg-secondary/40 border-border/60 rounded-xl"
                  value={newResident.name}
                  onChange={(e) => setNewResident({...newResident, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="flat" className="text-[13px] font-semibold">Flat Number</Label>
                <Input 
                  id="flat" 
                  placeholder="e.g. A-102" 
                  className="bg-secondary/40 border-border/60 rounded-xl"
                  value={newResident.flat}
                  onChange={(e) => setNewResident({...newResident, flat: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[13px] font-semibold">Phone Number</Label>
                <Input 
                  id="phone" 
                  placeholder="+91 00000 00000" 
                  className="bg-secondary/40 border-border/60 rounded-xl"
                  value={newResident.phone}
                  onChange={(e) => setNewResident({...newResident, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[13px] font-semibold">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="arjun.s@greenwood.in" 
                  className="bg-secondary/40 border-border/60 rounded-xl"
                  value={newResident.email}
                  onChange={(e) => setNewResident({...newResident, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="text-[13px] font-semibold">Resident Type</Label>
              <Select 
                value={newResident.type} 
                onValueChange={(v) => setNewResident({...newResident, type: v})}
              >
                <SelectTrigger className="bg-secondary/40 border-border/60 rounded-xl">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/60">
                  <SelectItem value="Owner">Owner</SelectItem>
                  <SelectItem value="Tenant">Tenant</SelectItem>
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
            Add Resident
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
