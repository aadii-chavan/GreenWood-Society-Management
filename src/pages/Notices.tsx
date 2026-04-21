import { CrudPage } from "@/components/layout/CrudPage";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Pin, Calendar } from "lucide-react";

const notices = [
  {
    title: "Annual General Meeting — 2026",
    body: "Dear residents, the AGM will be held on Saturday at the clubhouse. Agenda includes budget approval, committee elections and society audit. Attendance is mandatory.",
    date: "26 Apr 2026",
    tag: "Important",
    pinned: true,
    by: "Society Committee",
  },
  {
    title: "Water tank cleaning scheduled",
    body: "Please store water in advance. Supply will be interrupted on Wednesday from 09:00 AM to 02:00 PM across all towers.",
    date: "23 Apr 2026",
    tag: "Maintenance",
    by: "Facilities Team",
  },
  {
    title: "Holi celebrations at central lawn",
    body: "Join us for an eco-friendly Holi celebration with snacks, music and games for kids. Please RSVP at the security desk.",
    date: "20 Apr 2026",
    tag: "Event",
    by: "Cultural Committee",
  },
  {
    title: "New visitor management policy",
    body: "All visitors must now be pre-approved via the resident app. Manual entry will require host confirmation over call.",
    date: "18 Apr 2026",
    tag: "Policy",
    by: "Security",
  },
];

const tagTone = (t: string) =>
  t === "Important" ? "destructive" : t === "Maintenance" ? "warning" : t === "Event" ? "success" : "info";

const Notices = () => {
  return (
    <CrudPage title="Notices" subtitle="Broadcast announcements to all residents." addLabel="Post notice">
      <div className="space-y-5">
        {notices.map((n, i) => (
          <article
            key={i}
            className="surface-card surface-card-hover p-6 flex flex-col md:flex-row gap-5"
          >
            <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-2 md:w-44 shrink-0">
              <div className="h-12 w-12 rounded-2xl bg-primary-soft text-primary flex items-center justify-center">
                {n.pinned ? <Pin className="h-5 w-5" /> : <Calendar className="h-5 w-5" />}
              </div>
              <div>
                <p className="text-sm font-semibold">{n.date}</p>
                <p className="text-xs text-muted-foreground">{n.by}</p>
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
  );
};

export default Notices;
