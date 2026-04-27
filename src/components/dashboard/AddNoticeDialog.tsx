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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Megaphone } from "lucide-react";
import { toast } from "sonner";

interface AddNoticeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd?: (notice: any) => void;
}

export const AddNoticeDialog = ({ open, onOpenChange, onAdd }: AddNoticeDialogProps) => {
  const [newNotice, setNewNotice] = useState({
    title: "",
    body: "",
    tag: "Important",
    pinned: false,
    by: "Society Committee"
  });

  const handleAdd = () => {
    if (!newNotice.title || !newNotice.body || !newNotice.by) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Name Validation for 'Posted By'
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    if (!nameRegex.test(newNotice.by)) {
      toast.error("Posted By name should only contain letters");
      return;
    }
    
    const noticeData = {
      ...newNotice,
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    };

    if (onAdd) onAdd(noticeData);
    onOpenChange(false);
    setNewNotice({ 
      title: "", 
      body: "", 
      tag: "Important", 
      pinned: false, 
      by: "Society Committee" 
    });
    toast.success("Notice posted successfully!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-3xl border-border/60 bg-card/95 backdrop-blur-xl p-0 overflow-hidden shadow-2xl">
        <div className="p-8 pb-0">
          <DialogHeader>
            <div className="h-12 w-12 rounded-2xl gradient-primary flex items-center justify-center shadow-glow mb-4">
              <Megaphone className="h-6 w-6 text-primary-foreground" />
            </div>
            <DialogTitle className="text-2xl font-bold">Post New Notice</DialogTitle>
            <DialogDescription className="text-[14px]">
              Broadcast an announcement to all society residents.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-[13px] font-semibold">Notice Title</Label>
              <Input 
                id="title" 
                placeholder="e.g. Water tank cleaning" 
                className="bg-secondary/40 border-border/60 rounded-xl"
                value={newNotice.title}
                onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="body" className="text-[13px] font-semibold">Content</Label>
              <Textarea 
                id="body" 
                placeholder="Write the notice details here..." 
                className="bg-secondary/40 border-border/60 rounded-xl min-h-[120px] resize-none"
                value={newNotice.body}
                onChange={(e) => setNewNotice({...newNotice, body: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tag" className="text-[13px] font-semibold">Category</Label>
                <Select 
                  value={newNotice.tag} 
                  onValueChange={(v) => setNewNotice({...newNotice, tag: v})}
                >
                  <SelectTrigger className="bg-secondary/40 border-border/60 rounded-xl">
                    <SelectValue placeholder="Select tag" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border/60">
                    <SelectItem value="Important">Important</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Event">Event</SelectItem>
                    <SelectItem value="Policy">Policy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="by" className="text-[13px] font-semibold">Posted By</Label>
                <Input 
                  id="by" 
                  placeholder="e.g. Security" 
                  className="bg-secondary/40 border-border/60 rounded-xl"
                  value={newNotice.by}
                  onChange={(e) => setNewNotice({...newNotice, by: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <Checkbox 
                id="pinned" 
                checked={newNotice.pinned}
                onCheckedChange={(checked) => setNewNotice({...newNotice, pinned: !!checked})}
                className="rounded-md"
              />
              <Label 
                htmlFor="pinned" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Pin this notice to the top
              </Label>
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
            Post Notice
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
