import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface AppShellProps {
  children: ReactNode;
  title?: string;
}

export const AppShell = ({ children, title }: AppShellProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0 p-5 lg:pl-5">
          <div className="flex flex-col gap-5">
            <Topbar title={title} />
            <div className="surface-card p-6 md:p-8 animate-fade-in">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};
