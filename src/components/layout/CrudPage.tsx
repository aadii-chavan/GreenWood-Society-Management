import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";

interface CrudPageProps {
  title: string;
  subtitle: string;
  addLabel?: string;
  eyebrow?: string;
  children: ReactNode;
}

export const CrudPage = ({ title, subtitle, addLabel = "Add new", eyebrow, children }: CrudPageProps) => {
  return (
    <AppShell title={title}>
      <PageHeader
        title={title}
        subtitle={subtitle}
        eyebrow={eyebrow ?? title}
        actions={
          <>
            <Button variant="outline" className="rounded-lg h-10 px-4 text-[13px] font-semibold border-border bg-card hover:bg-accent">
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
            <Button className="rounded-lg h-10 px-4 text-[13px] font-semibold bg-primary hover:bg-primary/90 shadow-glow">
              <Plus className="h-4 w-4 mr-2" /> {addLabel}
            </Button>
          </>
        }
      />
      {children}
    </AppShell>
  );
};
