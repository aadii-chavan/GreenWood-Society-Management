export const MOCK_RESIDENTS = [
  {
    id: 1,
    full_name: "Priya Sharma",
    email: "priya.s@mail.com",
    phone: "+91 98201 23456",
    unit_number: "B-1204",
    resident_type: "Owner",
    status: "active",
    joined_date: "2024-01-15",
  },
  {
    id: 2,
    full_name: "Rohan Mehta",
    email: "rohan.m@mail.com",
    phone: "+91 99800 11223",
    unit_number: "A-301",
    resident_type: "Tenant",
    status: "active",
    joined_date: "2024-02-10",
  },
  {
    id: 3,
    full_name: "Anjali Gupta",
    email: "anjali.g@mail.com",
    phone: "+91 91234 56789",
    unit_number: "C-502",
    resident_type: "Owner",
    status: "active",
    joined_date: "2023-11-20",
  },
  {
    id: 4,
    full_name: "Vikram Singh",
    email: "vikram.v@mail.com",
    phone: "+91 98765 43210",
    unit_number: "D-101",
    resident_type: "Owner",
    status: "inactive",
    joined_date: "2023-05-12",
  }
];

export const MOCK_BILLS = [
  {
    id: "INV-2025-0421",
    resident_name: "Priya Sharma",
    unit_number: "B-1204",
    amount: 4500,
    due_date: "30 Apr 2026",
    status: "paid",
  },
  {
    id: "INV-2025-0420",
    resident_name: "Rohan Mehta",
    unit_number: "A-301",
    amount: 3200,
    due_date: "30 Apr 2026",
    status: "pending",
  },
  {
    id: "INV-2025-0419",
    resident_name: "Anjali Gupta",
    unit_number: "C-502",
    amount: 5000,
    due_date: "25 Apr 2026",
    status: "overdue",
  },
  {
    id: "INV-2025-0418",
    resident_name: "Vikram Singh",
    unit_number: "D-101",
    amount: 4500,
    due_date: "15 Apr 2026",
    status: "paid",
  }
];

export const MOCK_COMPLAINTS = [
  {
    id: "#C-0421",
    resident_name: "Rohan Mehta",
    title: "Water leakage in ceiling",
    category: "Plumbing",
    priority: "high",
    status: "open",
    created_at: "2024-04-26T10:00:00Z",
  },
  {
    id: "#C-0422",
    resident_name: "Priya Sharma",
    title: "Elevator not working",
    category: "Maintenance",
    priority: "medium",
    status: "progress",
    created_at: "2024-04-25T09:30:00Z",
  },
  {
    id: "#C-0423",
    resident_name: "Anjali Gupta",
    title: "Noise from neighbor",
    category: "Security",
    priority: "low",
    status: "resolved",
    created_at: "2024-04-24T22:15:00Z",
  }
];

export const MOCK_NOTICES = [
  {
    id: 1,
    title: "Annual General Meeting",
    body: "The AGM for this year will be held on Sunday, May 5th at 10:00 AM in the clubhouse.",
    posted_date: "26 Apr 2026",
    tag: "Important",
    posted_by: "Society Committee",
    pinned: true,
  },
  {
    id: 2,
    title: "Pool Maintenance",
    body: "The swimming pool will be closed for regular maintenance from April 28th to April 30th.",
    posted_date: "25 Apr 2026",
    tag: "Maintenance",
    posted_by: "Estate Manager",
    pinned: false,
  },
  {
    id: 3,
    title: "Summer Festival",
    body: "Join us for the annual Summer Festival on May 15th! Food, music, and games for everyone.",
    posted_date: "24 Apr 2026",
    tag: "Event",
    posted_by: "Cultural Committee",
    pinned: false,
  }
];

export const MOCK_VISITORS = [
  {
    id: 1,
    name: "Dr. Kapoor",
    purpose: "Doctor visit",
    host_unit: "A-301",
    vehicle_number: "MH-01-XY-1023",
    entry_time: "11:15",
    exit_time: "—",
    status: "in",
  },
  {
    id: 2,
    name: "Amazon Delivery",
    purpose: "Delivery",
    host_unit: "B-1204",
    vehicle_number: "—",
    entry_time: "10:42",
    exit_time: "10:50",
    status: "out",
  },
  {
    id: 3,
    name: "Guest - Rahul",
    purpose: "Social",
    host_unit: "C-502",
    vehicle_number: "MH-12-AB-4421",
    entry_time: "09:30",
    exit_time: "—",
    status: "in",
  }
];

export const MOCK_REVENUE = [
  { month: "Jan", collected: 85, pending: 15 },
  { month: "Feb", collected: 72, pending: 28 },
  { month: "Mar", collected: 90, pending: 10 },
  { month: "Apr", collected: 65, pending: 35 },
  { month: "May", collected: 80, pending: 20 },
  { month: "Jun", collected: 95, pending: 5 },
];
