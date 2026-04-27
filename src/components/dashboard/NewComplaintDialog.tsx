import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquareWarning, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface NewComplaintDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (complaint: any) => void;
}

export const NewComplaintDialog = ({ open, onOpenChange, onSubmit }: NewComplaintDialogProps) => {
  const [residents, setResidents] = useState<any[]>([]);
  const [complaint, setComplaint] = useState({
    title: "",
    category: "Plumbing",
    priority: "medium",
    description: "",
    resident_id: "",
    resident_name: "",
    unit_number: ""
  });

  useEffect(() => {
    if (open) {
      fetch("http://localhost:5001/api/residents")
        .then(res => res.json())
        .then(data => setResidents(data))
        .catch(err => console.error("Error fetching residents:", err));
    }
  }, [open]);

  const handleSubmit = () => {
    if (!complaint.title || !complaint.description || !complaint.resident_name) {
      toast.error("Please fill in all required fields including resident");
      return;
    }
    if (onSubmit) onSubmit(complaint);
    onOpenChange(false);
    toast.success("Complaint registered successfully!");
    setComplaint({
      title: "",
      category: "Plumbing",
      priority: "medium",
      description: "",
      resident_id: "",
      resident_name: "",
      unit_number: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] rounded-3xl border-border/60 bg-card/95 backdrop-blur-xl p-0 overflow-hidden shadow-2xl">
        <div className="p-8 pb-0">
          <DialogHeader>
            <div className="h-12 w-12 rounded-2xl bg-warning/10 text-warning flex items-center justify-center mb-4">
              <MessageSquareWarning className="h-6 w-6" />
            </div>
            <DialogTitle className="text-2xl font-bold">Register Complaint</DialogTitle>
            <DialogDescription className="text-[14px]">
              Raise a new maintenance or service request for your unit.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-6">
            <div className="space-y-2">
              <Label className="text-[13px] font-semibold">Title</Label>
              <Input 
                placeholder="Briefly describe the issue (e.g. Kitchen tap leaking)" 
                className="bg-secondary/40 border-border/60 rounded-xl h-11"
                value={complaint.title}
                onChange={(e) => setComplaint({...complaint, title: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[13px] font-semibold">Category</Label>
                <Select 
                  value={complaint.category} 
                  onValueChange={(v) => setComplaint({...complaint, category: v})}
                >
                  <SelectTrigger className="bg-secondary/40 border-border/60 rounded-xl h-11">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border/60">
                    <SelectItem value="Plumbing">Plumbing</SelectItem>
                    <SelectItem value="Electrical">Electrical</SelectItem>
                    <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                    <SelectItem value="Parking">Parking</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[13px] font-semibold">Priority</Label>
                <Select 
                  value={complaint.priority} 
                  onValueChange={(v) => setComplaint({...complaint, priority: v})}
                >
                  <SelectTrigger className="bg-secondary/40 border-border/60 rounded-xl h-11">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border/60">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High / Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[13px] font-semibold">Select Resident / Flat</Label>
              <Select 
                value={complaint.resident_id} 
                onValueChange={(id) => {
                  const res = residents.find(r => r.id.toString() === id);
                  if (res) {
                    setComplaint({
                      ...complaint, 
                      resident_id: id,
                      resident_name: res.full_name,
                      unit_number: res.unit_number
                    });
                  }
                }}
              >
                <SelectTrigger className="bg-secondary/40 border-border/60 rounded-xl h-11">
                  <SelectValue placeholder="Choose resident..." />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/60">
                  {residents.map((r: any) => (
                    <SelectItem key={r.id} value={r.id.toString()}>
                      {r.unit_number} - {r.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[13px] font-semibold">Description</Label>
              <Textarea 
                placeholder="Provide more details about the problem..." 
                className="bg-secondary/40 border-border/60 rounded-xl min-h-[100px] resize-none"
                value={complaint.description}
                onChange={(e) => setComplaint({...complaint, description: e.target.value})}
              />
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
            onClick={handleSubmit}
          >
            Submit Complaint
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
