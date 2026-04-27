import { useState, useEffect } from "react";
import { CrudPage } from "@/components/layout/CrudPage";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MoreHorizontal, Search, UserPlus, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Residents = () => {
  const [residents, setResidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Fetch Residents from Backend
  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/residents");
      if (!response.ok) throw new Error("Server response not ok");
      const data = await response.json();
      setResidents(data);
      setLoading(false);
    } catch (error) {
      console.warn("Backend not reached, showing empty residents list.");
      setResidents([]);
      setLoading(false);
    }
  };
  const [newResident, setNewResident] = useState({
    name: "",
    flat: "",
    phone: "",
    email: "",
    type: "Owner",
    status: "active"
  });

  const filteredResidents = (residents || []).filter(r => 
    (r.full_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.unit_number || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddResident = async () => {
    if (!newResident.name || !newResident.flat) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Name Validation
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    if (!nameRegex.test(newResident.name)) {
      toast.error("Name should only contain letters");
      return;
    }

    // Phone Validation
    const phoneDigits = newResident.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]*com[^\s@]*$/;
    if (newResident.email && !emailRegex.test(newResident.email)) {
      toast.error("Email must contain @ and .com");
      return;
    }

    try {
        const response = await fetch("http://localhost:5001/api/residents", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                full_name: newResident.name,
                unit_number: newResident.flat,
                phone: newResident.phone,
                email: newResident.email,
                resident_type: newResident.type,
                status: newResident.status
            })
        });

        if (response.ok) {
            fetchResidents();
            setIsAddDialogOpen(false);
            setNewResident({ name: "", flat: "", phone: "", email: "", type: "Owner", status: "active" });
            toast.success(`${newResident.name} added successfully!`);
        }
    } catch (error) {
        toast.error("Failed to add resident");
    }
  };

  const handleDeleteResident = (id: number, name: string) => {
    setResidents(prev => prev.filter(r => r.id !== id));
    toast.success(`${name} has been removed.`);
  };

  const handleExport = () => {
    const headers = ["Name", "Flat", "Phone", "Email", "Type", "Status"];
    const csvData = residents.map(r => [r.full_name, r.unit_number, r.phone, r.email, r.resident_type, r.status].join(","));
    const csvContent = [headers.join(","), ...csvData].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `residents_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success("Residents list exported!");
  };

  return (
    <CrudPage 
      title="Residents" 
      subtitle={`Manage all ${residents.length} residents across 4 towers.`} 
      addLabel="Add resident"
      onAdd={() => setIsAddDialogOpen(true)}
      onExport={handleExport}
    >
      <div className="surface-card p-0 overflow-hidden">
        <div className="p-5 flex flex-col md:flex-row md:items-center gap-3 border-b border-border/60">
          <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-secondary">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input 
              className="flex-1 bg-transparent outline-none text-sm" 
              placeholder="Search by name, flat, email…" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
              {filteredResidents.map((r: any) => (
                <tr key={r.flat + r.name} className="border-t border-border/60 hover:bg-secondary/40 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary-soft text-primary flex items-center justify-center text-xs font-semibold">
                        {(r.full_name || "??").split(" ").map((n) => n[0]).join("")}
                      </div>
                      <p className="font-semibold">{r.full_name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-semibold tabular-nums">{r.unit_number}</td>
                  <td className="px-5 py-4 text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5"><Phone className="h-3 w-3" />{r.phone}</span>
                    </div>
                    <div className="text-xs inline-flex items-center gap-1.5 mt-0.5"><Mail className="h-3 w-3" />{r.email}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-secondary text-xs font-semibold">{r.resident_type}</span>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge tone={r.status === "active" ? "success" : "muted"}>
                      {r.status === "active" ? "Active" : "Inactive"}
                    </StatusBadge>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl border-border/60 w-40">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => toast.info("Edit resident coming soon!")}>
                          <Pencil className="h-3.5 w-3.5" /> Edit details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => toast.info("Contact resident...")}>
                          <Mail className="h-3.5 w-3.5" /> Send Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                          onClick={() => handleDeleteResident(r.id, r.full_name)}
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete resident
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
              {filteredResidents.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-20 text-center text-muted-foreground">
                    No residents found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[480px] rounded-3xl border-border/60 bg-card/95 backdrop-blur-xl p-0 overflow-hidden shadow-2xl">
          <div className="p-8 pb-0">
            <DialogHeader>
              <div className="h-12 w-12 rounded-2xl gradient-primary flex items-center justify-center shadow-glow mb-4">
                <UserPlus className="h-6 w-6 text-primary-foreground" />
              </div>
              <DialogTitle className="text-2xl font-bold">Add New Resident</DialogTitle>
              <DialogDescription className="text-[14px]">
                Enter the details of the new resident to add them to the system.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-5 py-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[13px] font-semibold">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="e.g. John Doe" 
                    className="bg-secondary/40 border-border/60 rounded-xl"
                    value={newResident.name}
                    onChange={(e) => setNewResident({...newResident, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="flat" className="text-[13px] font-semibold">Flat Number</Label>
                  <Input 
                    id="flat" 
                    placeholder="e.g. A-102" 
                    className="bg-secondary/40 border-border/60 rounded-xl"
                    value={newResident.flat}
                    onChange={(e) => setNewResident({...newResident, flat: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[13px] font-semibold">Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="+91 00000 00000" 
                    className="bg-secondary/40 border-border/60 rounded-xl"
                    value={newResident.phone}
                    onChange={(e) => setNewResident({...newResident, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[13px] font-semibold">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    className="bg-secondary/40 border-border/60 rounded-xl"
                    value={newResident.email}
                    onChange={(e) => setNewResident({...newResident, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type" className="text-[13px] font-semibold">Resident Type</Label>
                <Select 
                  value={newResident.type} 
                  onValueChange={(v) => setNewResident({...newResident, type: v})}
                >
                  <SelectTrigger className="bg-secondary/40 border-border/60 rounded-xl">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border/60">
                    <SelectItem value="Owner">Owner</SelectItem>
                    <SelectItem value="Tenant">Tenant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="p-8 bg-secondary/30 border-t border-border/60 flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 rounded-xl h-11 font-semibold"
              onClick={() => setIsAddDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 rounded-xl h-11 bg-primary hover:bg-primary/90 shadow-glow font-semibold"
              onClick={handleAddResident}
            >
              Add Resident
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </CrudPage>
  );
};

export default Residents;

