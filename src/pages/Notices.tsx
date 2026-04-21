import { useState, useEffect } from "react";
import { CrudPage } from "@/components/layout/CrudPage";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Pin, Calendar } from "lucide-react";
import { AddNoticeDialog } from "@/components/dashboard/AddNoticeDialog";
import { toast } from "sonner";

const tagTone = (t: string) =>
  t === "Important" ? "destructive" : t === "Maintenance" ? "warning" : t === "Event" ? "success" : "info";

const Notices = () => {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/notices");
      const data = await response.json();
      setNotices(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notices:", error);
      setLoading(false);
    }
  };

  const handleAddNotice = async (newNotice: any) => {
    try {
        await fetch("http://localhost:5000/api/notices", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: newNotice.title,
                body: newNotice.body,
                posted_date: newNotice.date,
                tag: newNotice.tag,
                posted_by: newNotice.by,
                pinned: newNotice.pinned ? 1 : 0
            })
        });
        fetchNotices();
        toast.success("Notice posted!");
    } catch (error) {
        toast.error("Failed to post notice");
    }
  };

  return (
    <>
      <CrudPage 
        title="Notices" 
        subtitle="Broadcast announcements to all residents." 
        addLabel="Post notice"
        onAdd={() => setIsAddDialogOpen(true)}
      >
        <div className="space-y-5">
          {notices.map((n: any, i: number) => (
            <article
              key={i}
              className="surface-card surface-card-hover p-6 flex flex-col md:flex-row gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-2 md:w-44 shrink-0">
                <div className="h-12 w-12 rounded-2xl bg-primary-soft text-primary flex items-center justify-center">
                  {n.pinned ? <Pin className="h-5 w-5" /> : <Calendar className="h-5 w-5" />}
                </div>
                <div>
                  <p className="text-sm font-semibold">{n.posted_date}</p>
                  <p className="text-xs text-muted-foreground">{n.posted_by}</p>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h4 className="text-lg font-bold">{n.title}</h4>
                  <StatusBadge tone={tagTone(n.tag)}>{n.tag}</StatusBadge>
                  {n.pinned && <StatusBadge tone="muted">Pinned</StatusBadge>}
                </div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{n.body}</p>
              </div>
            </article>
          ))}
        </div>
      </CrudPage>

      <AddNoticeDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen}
        onAdd={handleAddNotice}
      />
    </>
  );
};

export default Notices;

