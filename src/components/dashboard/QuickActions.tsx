import { Plus, Receipt, UserPlus, Megaphone, Wrench, ChevronRight } from "lucide-react";

interface QuickActionsProps {
  onAddResident?: () => void;
  onGenerateBill?: () => void;
  onPostNotice?: () => void;
  onLogMaintenance?: () => void;
}

export const QuickActions = ({
  onAddResident,
  onGenerateBill,
  onPostNotice,
  onLogMaintenance
}: QuickActionsProps) => {
  const actions = [
    { label: "Add Resident", icon: UserPlus, tone: "bg-primary-soft text-primary", onClick: onAddResident },
    { label: "Generate Bill", icon: Receipt, tone: "bg-info/10 text-info", onClick: onGenerateBill },
    { label: "Post Notice", icon: Megaphone, tone: "bg-warning/15 text-warning", onClick: onPostNotice },
    { label: "Log Maintenance", icon: Wrench, tone: "bg-destructive/10 text-destructive", onClick: onLogMaintenance },
  ];

  const reminders = [
    { title: "Society AGM", time: "Sat · 10:00 AM", color: "bg-primary" },
    { title: "Lift Servicing", time: "Mon · 02:30 PM", color: "bg-warning" },
    { title: "Water Tank Cleaning", time: "Wed · 09:00 AM", color: "bg-info" },
  ];

  return (
    <div className="surface-card p-6 flex flex-col gap-6">
      <div>
        <p className="eyebrow">Workspace</p>
        <h3 className="display-text text-[19px] font-bold mt-1.5">Quick actions</h3>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {actions.map((a) => (
          <button
            key={a.label}
            onClick={a.onClick}
            className="group flex flex-col items-start gap-3 p-3.5 rounded-xl bg-secondary hover:bg-accent transition-colors text-left border border-transparent hover:border-border"
          >
            <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${a.tone}`}>
              <a.icon className="h-[16px] w-[16px]" strokeWidth={2.2} />
            </div>
            <span className="text-[12.5px] font-semibold leading-tight">{a.label}</span>
          </button>
        ))}
      </div>


      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[13px] font-semibold">Upcoming reminders</p>
          <button className="text-[11.5px] text-primary font-semibold inline-flex items-center gap-1 hover:underline">
            <Plus className="h-3 w-3" /> New
          </button>
        </div>
        <div className="space-y-2">
          {reminders.map((r) => (
            <div
              key={r.title}
              className="group flex items-center gap-3 p-3 rounded-xl bg-secondary hover:bg-accent transition-colors cursor-pointer"
            >
              <span className={`h-8 w-1 rounded-full ${r.color}`} />
              <div className="flex-1">
                <p className="text-[13px] font-semibold leading-tight">{r.title}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{r.time}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
