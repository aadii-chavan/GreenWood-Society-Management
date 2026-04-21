import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  eyebrow?: string;
  className?: string;
}

export const PageHeader = ({ title, subtitle, actions, eyebrow, className }: PageHeaderProps) => {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8", className)}>
      <div className="space-y-1.5">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="display-text text-[28px] md:text-[34px] font-bold tracking-tight leading-[1.1]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[13.5px] text-muted-foreground max-w-2xl leading-relaxed">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2.5 flex-wrap">{actions}</div>}
    </div>
  );
};
