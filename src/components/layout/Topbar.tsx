import { Bell, Mail, Search, ChevronDown, Check, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TopbarProps {
  title?: string;
}

const initialNotifications = [
  { id: 1, title: "Maintenance Overdue", description: "Flat B-1204 maintenance is overdue by 5 days.", time: "2h ago", unread: true },
  { id: 2, title: "New Complaint", description: "Water leakage reported in Tower C elevator.", time: "5h ago", unread: true },
  { id: 3, title: "Visitor Request", description: "Guest arrival request for Flat A-301.", time: "1d ago", unread: false },
];

export const Topbar = ({ title }: TopbarProps) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <header className="flex flex-col md:flex-row md:items-center gap-3">
      <div className="flex-1 group flex items-center gap-3 px-4 h-12 rounded-xl bg-card border border-border/70 shadow-xs transition-colors focus-within:border-primary/40 focus-within:shadow-soft">
        <Search className="h-4 w-4 text-muted-foreground" strokeWidth={2.2} />
        <input
          type="text"
          placeholder={title ? `Search in ${title.toLowerCase()}…` : "Search residents, bills, complaints…"}
          className="flex-1 bg-transparent outline-none text-[13.5px] placeholder:text-muted-foreground"
        />
        <kbd className="hidden md:inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground border border-border/60">
          ⌘K
        </kbd>
      </div>

      <div className="flex items-center gap-2">
        <button className="h-12 w-12 flex items-center justify-center rounded-xl bg-card border border-border/70 shadow-xs hover:bg-accent transition-colors">
          <Mail className="h-[17px] w-[17px]" strokeWidth={2} />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative h-12 w-12 flex items-center justify-center rounded-xl bg-card border border-border/70 shadow-xs hover:bg-accent transition-colors">
              <Bell className="h-[17px] w-[17px]" strokeWidth={2} />
              {unreadCount > 0 && (
                <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-card" />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[320px] p-2 mt-2 rounded-2xl border-border/60 bg-card/95 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between px-3 py-2 mb-2">
              <h3 className="font-bold text-sm">Notifications</h3>
              <button 
                onClick={markAllAsRead}
                className="text-[11px] font-semibold text-primary hover:underline"
              >
                Mark all as read
              </button>
            </div>
            <div className="space-y-1 max-h-[400px] overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-1 p-3 rounded-xl focus:bg-accent cursor-pointer">
                    <div className="flex items-center justify-between w-full">
                      <span className={cn("text-[13px] font-bold", n.unread && "text-primary")}>
                        {n.title}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{n.time}</span>
                    </div>
                    <p className="text-[12px] text-muted-foreground leading-snug">
                      {n.description}
                    </p>
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="py-8 text-center text-muted-foreground text-xs">
                  No new notifications
                </div>
              )}
            </div>
            <div className="mt-2 pt-2 border-t border-border/40 text-center">
              <button className="text-[12px] font-semibold text-muted-foreground hover:text-foreground py-1 w-full">
                View all notifications
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-3 pl-1.5 pr-3 h-12 rounded-xl bg-card border border-border/70 shadow-xs hover:bg-accent/50 transition-colors cursor-pointer">
          <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-[12.5px]">
            AR
          </div>
          <div className="hidden sm:block leading-tight">
            <p className="text-[13px] font-semibold">Aarav Reddy</p>
            <p className="text-[11px] text-muted-foreground">admin@greenwood.in</p>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden sm:block" />
        </div>
      </div>
    </header>
  );
};

