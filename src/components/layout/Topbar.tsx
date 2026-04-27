import { Moon, Sun, Search, ChevronDown } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

interface TopbarProps {
  title?: string;
}

export const Topbar = ({ title }: TopbarProps) => {
  const { theme, setTheme } = useTheme();

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
        <button 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-12 w-12 flex items-center justify-center rounded-xl bg-card border border-border/70 shadow-xs hover:bg-accent transition-colors"
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? (
            <Sun className="h-[18px] w-[18px] text-yellow-500" strokeWidth={2} />
          ) : (
            <Moon className="h-[18px] w-[18px] text-primary" strokeWidth={2} />
          )}
        </button>

        <div className="flex items-center gap-3 pl-1.5 pr-3 h-12 rounded-xl bg-card border border-border/70 shadow-xs hover:bg-accent/50 transition-colors cursor-pointer">
          <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-[12.5px]">
            AC
          </div>
          <div className="hidden sm:block leading-tight">
            <p className="text-[13px] font-semibold">ADITYA CHAVAN</p>
            <p className="text-[11px] text-muted-foreground">admin@greenwood.in</p>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden sm:block" />
        </div>
      </div>
    </header>
  );
};

