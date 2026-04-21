import { Receipt, UserPlus, Megaphone, Wrench } from "lucide-react";

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
    </div>
  );
};
