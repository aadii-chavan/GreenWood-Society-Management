import { cn } from "@/lib/utils";

type Tone = "success" | "warning" | "destructive" | "info" | "muted";

interface StatusBadgeProps {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const toneClass: Record<Tone, string> = {
  success: "bg-success/10 text-success ring-success/15",
  warning: "bg-warning/12 text-warning ring-warning/20",
  destructive: "bg-destructive/10 text-destructive ring-destructive/15",
  info: "bg-info/10 text-info ring-info/15",
  muted: "bg-muted text-muted-foreground ring-border",
};

export const StatusBadge = ({ tone = "muted", children, className, dot = true }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-[3px] rounded-md text-[10.5px] font-semibold whitespace-nowrap tracking-wide ring-1 ring-inset",
        toneClass[tone],
        className
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />}
      {children}
    </span>
  );
};
