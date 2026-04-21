import { CrudPage } from "@/components/layout/CrudPage";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MoreHorizontal, Search } from "lucide-react";

const residents = [
  { name: "Priya Sharma", flat: "B-1204", phone: "+91 98201 23456", email: "priya.s@mail.com", type: "Owner", status: "active" },
  { name: "Rohan Mehta", flat: "A-301", phone: "+91 99800 11223", email: "rohan.m@mail.com", type: "Tenant", status: "active" },
  { name: "Ananya Iyer", flat: "C-805", phone: "+91 90040 88121", email: "ananya@mail.com", type: "Owner", status: "active" },
  { name: "Vikram Patel", flat: "D-110", phone: "+91 90909 12345", email: "vikram.p@mail.com", type: "Owner", status: "inactive" },
  { name: "Sneha Nair", flat: "B-602", phone: "+91 98765 43210", email: "sneha.n@mail.com", type: "Tenant", status: "active" },
  { name: "Arjun Kapoor", flat: "A-1002", phone: "+91 97000 11111", email: "arjun.k@mail.com", type: "Owner", status: "active" },
  { name: "Meera Joshi", flat: "C-204", phone: "+91 99999 22222", email: "meera.j@mail.com", type: "Tenant", status: "active" },
];

const Residents = () => {
  return (
    <CrudPage title="Residents" subtitle="Manage all 248 residents across 4 towers." addLabel="Add resident">
      <div className="surface-card p-0 overflow-hidden">
        <div className="p-5 flex flex-col md:flex-row md:items-center gap-3 border-b border-border/60">
          <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-secondary">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input className="flex-1 bg-transparent outline-none text-sm" placeholder="Search by name, flat, email…" />
          </div>
          <div className="flex gap-2">
            {["All", "Owners", "Tenants", "Inactive"].map((t, i) => (
              <button
                key={t}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                  i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-accent"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground bg-secondary/50">
                <th className="text-left font-medium px-5 py-3">Resident</th>
                <th className="text-left font-medium px-5 py-3">Flat</th>
                <th className="text-left font-medium px-5 py-3">Contact</th>
                <th className="text-left font-medium px-5 py-3">Type</th>
                <th className="text-left font-medium px-5 py-3">Status</th>
                <th className="text-right font-medium px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {residents.map((r) => (
                <tr key={r.flat} className="border-t border-border/60 hover:bg-secondary/40 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary-soft text-primary flex items-center justify-center text-xs font-semibold">
                        {r.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <p className="font-semibold">{r.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-semibold tabular-nums">{r.flat}</td>
                  <td className="px-5 py-4 text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5"><Phone className="h-3 w-3" />{r.phone}</span>
                    </div>
                    <div className="text-xs inline-flex items-center gap-1.5 mt-0.5"><Mail className="h-3 w-3" />{r.email}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-secondary text-xs font-semibold">{r.type}</span>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge tone={r.status === "active" ? "success" : "muted"}>
                      {r.status === "active" ? "Active" : "Inactive"}
                    </StatusBadge>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CrudPage>
  );
};

export default Residents;
