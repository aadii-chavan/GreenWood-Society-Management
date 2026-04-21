import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Receipt,
  MessageSquareWarning,
  UserPlus,
  Dumbbell,
  Megaphone,
  Settings,
  HelpCircle,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const mainNav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/residents", label: "Residents", icon: Users, badge: "248" },
  { to: "/bills", label: "Bills", icon: Receipt },
  { to: "/complaints", label: "Complaints", icon: MessageSquareWarning, badge: "12" },
  { to: "/visitors", label: "Visitors", icon: UserPlus },
  { to: "/amenities", label: "Amenities", icon: Dumbbell },
  { to: "/notices", label: "Notices", icon: Megaphone },
];

const generalNav = [
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/help", label: "Help & Support", icon: HelpCircle },
];

export const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="hidden lg:flex w-[256px] shrink-0 flex-col gap-6 p-5 pr-0">
      <div className="surface-card flex-1 flex flex-col p-4">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2 py-1.5">
          <div className="relative h-9 w-9 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
            <Building2 className="h-[18px] w-[18px] text-primary-foreground" strokeWidth={2.2} />
          </div>
          <div className="leading-tight">
            <p className="display-text font-bold text-[15px]">Greenwood</p>
            <p className="text-[11px] text-muted-foreground mt-0.5 tracking-wide">Society · Admin</p>
          </div>
        </div>

        <div className="h-px bg-border/70 mx-2 my-4" />

        <p className="eyebrow mt-1 mb-2 px-3">Menu</p>
        <nav className="flex flex-col gap-0.5">
          {mainNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "text-sidebar-foreground hover:bg-accent hover:text-accent-foreground"
                )
              }
            >
              <item.icon className="h-[17px] w-[17px]" strokeWidth={2} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span
                  className={cn(
                    "text-[10px] font-semibold px-1.5 min-w-[22px] text-center py-0.5 rounded-md tabular-nums",
                    pathname === item.to
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground group-hover:bg-card"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <p className="eyebrow mt-7 mb-2 px-3">General</p>
        <nav className="flex flex-col gap-0.5">
          {generalNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground hover:bg-accent hover:text-accent-foreground"
                )
              }
            >
              <item.icon className="h-[17px] w-[17px]" strokeWidth={2} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        </nav>
      </div>
    </aside>
  );
};
