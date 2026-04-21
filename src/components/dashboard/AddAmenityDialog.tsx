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
import { Waves, Dumbbell, Music, Trees, BookOpen, Users2, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface AddAmenityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd?: (amenity: any) => void;
}

export const AddAmenityDialog = ({ open, onOpenChange, onAdd }: AddAmenityDialogProps) => {
  const [amenity, setAmenity] = useState({
    name: "",
    icon: "Sparkles",
    slots: "09:00 – 21:00",
    capacity: "20"
  });

  const handleAdd = () => {
    if (!amenity.name) {
      toast.error("Please enter amenity name");
      return;
    }
    if (onAdd) onAdd(amenity);
    onOpenChange(false);
    toast.success(`${amenity.name} added to society facilities!`);
    setAmenity({ name: "", icon: "Sparkles", slots: "09:00 – 21:00", capacity: "20" });
  };

  const icons = [
    { name: "Sparkles", icon: Sparkles },
    { name: "Waves", icon: Waves },
    { name: "Dumbbell", icon: Dumbbell },
    { name: "Music", icon: Music },
    { name: "Trees", icon: Trees },
    { name: "BookOpen", icon: BookOpen },
    { name: "Users2", icon: Users2 },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] rounded-3xl border-border/60 bg-card/95 backdrop-blur-xl p-0 overflow-hidden shadow-2xl">
        <div className="p-8 pb-0">
          <DialogHeader>
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6" />
            </div>
            <DialogTitle className="text-2xl font-bold">Add New Amenity</DialogTitle>
            <DialogDescription className="text-[14px]">
              Introduce a new facility for society residents.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-6">
            <div className="space-y-2">
              <Label className="text-[13px] font-semibold">Amenity Name</Label>
              <Input 
                placeholder="e.g. Cinema Room, Squash Court" 
                className="bg-secondary/40 border-border/60 rounded-xl h-11"
                value={amenity.name}
                onChange={(e) => setAmenity({...amenity, name: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[13px] font-semibold">Icon</Label>
                <Select 
                  value={amenity.icon} 
                  onValueChange={(v) => setAmenity({...amenity, icon: v})}
                >
                  <SelectTrigger className="bg-secondary/40 border-border/60 rounded-xl h-11">
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border/60">
                    {icons.map(i => (
                      <SelectItem key={i.name} value={i.name}>
                        <div className="flex items-center gap-2">
                          <i.icon className="h-4 w-4" />
                          <span>{i.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[13px] font-semibold">Max Capacity</Label>
                <Input 
                  type="number"
                  placeholder="20" 
                  className="bg-secondary/40 border-border/60 rounded-xl h-11"
                  value={amenity.capacity}
                  onChange={(e) => setAmenity({...amenity, capacity: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[13px] font-semibold">Operational Hours</Label>
              <Input 
                placeholder="e.g. 06:00 – 22:00" 
                className="bg-secondary/40 border-border/60 rounded-xl h-11"
                value={amenity.slots}
                onChange={(e) => setAmenity({...amenity, slots: e.target.value})}
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
            onClick={handleAdd}
          >
            Add Amenity
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
