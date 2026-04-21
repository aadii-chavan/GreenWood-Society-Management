import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

export const DashboardCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="surface-card p-6 flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Schedule</p>
          <h3 className="display-text text-[19px] font-bold mt-1.5">Society Calendar</h3>
        </div>
        <button className="h-9 w-9 rounded-xl bg-secondary flex items-center justify-center hover:bg-accent transition-colors">
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-2xl border-none p-0"
          classNames={{
            months: "w-full",
            month: "w-full space-y-4",
            caption: "flex justify-between pt-1 relative items-center mb-2 px-2",
            caption_label: "text-sm font-bold display-text",
            nav: "flex items-center gap-1",
            table: "w-full border-collapse space-y-1",
            head_row: "grid grid-cols-7 mb-2",
            head_cell: "text-muted-foreground font-medium text-[11px] uppercase tracking-wider text-center",
            row: "grid grid-cols-7 w-full mt-1",
            cell: "flex items-center justify-center p-0 relative focus-within:z-20",
            day: "h-9 w-9 p-0 font-medium text-[13px] rounded-xl hover:bg-accent transition-all flex items-center justify-center",
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground shadow-glow",
            day_today: "bg-secondary text-primary font-bold border border-primary/20",
            day_outside: "text-muted-foreground/30 opacity-50",
          }}
        />
      </div>

      <div className="pt-4 border-t border-border/40">
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Today's Events</p>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <p className="text-[13px] font-medium flex-1">Security Audit</p>
            <p className="text-[11px] text-muted-foreground">04:00 PM</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-warning" />
            <p className="text-[13px] font-medium flex-1">Water Supply Maintenance</p>
            <p className="text-[11px] text-muted-foreground">06:30 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};
