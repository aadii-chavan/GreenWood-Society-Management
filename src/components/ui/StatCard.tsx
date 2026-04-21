import { ArrowUpRight, LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  helper?: string;
  icon?: LucideIcon;
  highlight?: boolean;
  trend?: "up" | "down";
  size?: "default" | "sm";
}

export const StatCard = ({
  label,
  value,
  delta,
  helper,
  icon: Icon,
  highlight,
  trend = "up",
  size = "default",
}: StatCardProps) => {
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[22px] transition-all duration-300 hover:-translate-y-0.5 border",
        size === "sm" ? "p-3.5 md:p-4" : "p-5 md:p-6",
        highlight
          ? "gradient-primary text-primary-foreground border-transparent shadow-glow"
          : "bg-card border-border/70 shadow-soft hover:shadow-card hover:border-border"
      )}
    >
      {highlight && (
        <>
          <div className="absolute inset-0 gradient-mesh opacity-70 pointer-events-none" />
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary-foreground/10 blur-2xl" />
        </>
      )}

      <div className="relative flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div
              className={cn(
                "rounded-lg flex items-center justify-center shrink-0",
                size === "sm" ? "h-8 w-8" : "h-9 w-9",
                highlight
                  ? "bg-primary-foreground/15 text-primary-foreground"
                  : "bg-primary-soft text-primary"
              )}
            >
              <Icon className={cn(size === "sm" ? "h-[14px] w-[14px]" : "h-[16px] w-[16px]")} strokeWidth={2.2} />
            </div>
          )}
          <p
            className={cn(
              "font-medium leading-tight",
              size === "sm" ? "text-[12px]" : "text-[13px]",
              highlight ? "text-primary-foreground/85" : "text-muted-foreground"
            )}
          >
            {label}
          </p>
        </div>
        <button
          aria-label="View details"
          className={cn(
            "rounded-full flex items-center justify-center transition-all shrink-0",
            size === "sm" ? "h-7 w-7" : "h-8 w-8",
            highlight
              ? "bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              : "bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground"
          )}
        >
          <ArrowUpRight className={cn(size === "sm" ? "h-[12px] w-[12px]" : "h-[14px] w-[14px]")} strokeWidth={2.4} />
        </button>
      </div>

      <p
        className={cn(
          "display-text relative font-bold leading-none tracking-tight tabular-nums",
          size === "sm" ? "mt-4 text-[22px] md:text-[24px]" : "mt-7 text-[38px] md:text-[44px]"
        )}
      >
        {value}
      </p>

      {(delta || helper) && (
        <div
          className={cn(
            "relative inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium",
            size === "sm" ? "mt-3" : "mt-5",
            highlight
              ? "bg-primary-foreground/15 text-primary-foreground"
              : trend === "up"
                ? "bg-success/10 text-success"
                : "bg-destructive/10 text-destructive"
          )}
        >
          {delta && (
            <span className="inline-flex items-center gap-1 tabular-nums font-semibold">
              <TrendIcon className="h-3 w-3" strokeWidth={2.4} />
              {delta}
            </span>
          )}
          {helper && (
            <span
              className={cn(
                "font-normal",
                highlight ? "text-primary-foreground/80" : "text-muted-foreground"
              )}
            >
              {helper}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
