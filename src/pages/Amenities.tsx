import { CrudPage } from "@/components/layout/CrudPage";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Dumbbell, Waves, Trees, Users2, Music, BookOpen } from "lucide-react";

const amenities = [
  { name: "Swimming Pool", icon: Waves, slots: "06:00 – 21:00", booked: 18, capacity: 25, status: "available" },
  { name: "Gym", icon: Dumbbell, slots: "05:00 – 23:00", booked: 12, capacity: 20, status: "available" },
  { name: "Clubhouse", icon: Music, slots: "10:00 – 22:00", booked: 4, capacity: 4, status: "full" },
  { name: "Garden", icon: Trees, slots: "All day", booked: 0, capacity: 999, status: "available" },
  { name: "Co-working", icon: BookOpen, slots: "09:00 – 20:00", booked: 6, capacity: 10, status: "available" },
  { name: "Party Hall", icon: Users2, slots: "12:00 – 23:00", booked: 1, capacity: 2, status: "maintenance" },
];

const tone = (s: string) => s === "available" ? "success" : s === "full" ? "warning" : "destructive";
const label = (s: string) => s === "maintenance" ? "Maintenance" : s[0].toUpperCase() + s.slice(1);

const Amenities = () => {
  return (
    <CrudPage title="Amenities" subtitle="Manage shared facilities and bookings." addLabel="Add amenity">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {amenities.map((a) => {
          const pct = Math.min(100, Math.round((a.booked / Math.max(a.capacity, 1)) * 100));
          return (
            <div key={a.name} className="surface-card surface-card-hover p-6">
              <div className="flex items-start justify-between">
                <div className="h-12 w-12 rounded-2xl bg-primary-soft text-primary flex items-center justify-center">
                  <a.icon className="h-5 w-5" />
                </div>
                <StatusBadge tone={tone(a.status)}>{label(a.status)}</StatusBadge>
              </div>
              <h4 className="text-lg font-bold mt-5">{a.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{a.slots}</p>

              <div className="mt-5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-muted-foreground">Today's bookings</span>
                  <span className="font-semibold tabular-nums">
                    {a.booked}{a.capacity < 999 ? ` / ${a.capacity}` : ""}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full gradient-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>

              <Button variant="outline" className="w-full rounded-full mt-5 border-border">
                Manage bookings
              </Button>
            </div>
          );
        })}
      </div>
    </CrudPage>
  );
};

export default Amenities;
