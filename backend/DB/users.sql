-- Mock Data for Greenwood Society Management System
USE greenwood_db;

-- 1. Insert Residents (8 Users)
INSERT INTO residents (full_name, email, phone, unit_number, resident_type, status, joined_date) VALUES
('Priya Sharma', 'priya.s@mail.com', '+91 98201 23456', 'B-1204', 'Owner', 'active', '2026-04-15'),
('Rohan Mehta', 'rohan.m@mail.com', '+91 99800 11223', 'A-301', 'Tenant', 'active', '2026-04-10'),
('Anjali Gupta', 'anjali.g@mail.com', '+91 91234 56789', 'C-502', 'Owner', 'active', '2026-04-20'),
('Vikram Singh', 'vikram.v@mail.com', '+91 98765 43210', 'D-101', 'Owner', 'inactive', '2026-03-12'),
('Suresh Iyer', 'suresh.i@mail.com', '+91 95000 11111', 'A-704', 'Owner', 'active', '2026-04-25'),
('Meera Reddy', 'meera.r@mail.com', '+91 94444 22222', 'B-302', 'Tenant', 'active', '2026-04-05'),
('Aditya Chavan', 'aditya.c@mail.com', '+91 98888 77777', 'C-101', 'Owner', 'active', '2026-04-15'),
('Sneha Patil', 'sneha.p@mail.com', '+91 97777 66666', 'D-505', 'Tenant', 'active', '2026-04-01');

-- 2. Insert Bills
INSERT INTO bills (id, resident_id, resident_name, unit_number, amount, due_date, status) VALUES
('INV-2026-0401', 1, 'Priya Sharma', 'B-1204', 4500.00, '2026-04-30', 'paid'),
('INV-2026-0402', 2, 'Rohan Mehta', 'A-301', 3200.00, '2026-04-30', 'pending'),
('INV-2026-0403', 3, 'Anjali Gupta', 'C-502', 5000.00, '2026-04-25', 'overdue'),
('INV-2026-0404', 4, 'Vikram Singh', 'D-101', 4500.00, '2026-04-15', 'paid'),
('INV-2026-0405', 7, 'Aditya Chavan', 'C-101', 4800.00, '2026-04-30', 'pending');

-- 3. Insert Complaints
INSERT INTO complaints (id, resident_name, unit_number, title, category, priority, status, created_at) VALUES
('#C-1001', 'Rohan Mehta', 'A-301', 'Water leakage in ceiling', 'Plumbing', 'high', 'open', '2026-04-26 10:00:00'),
('#C-1002', 'Priya Sharma', 'B-1204', 'Elevator not working', 'Maintenance', 'medium', 'pending', '2026-04-25 09:30:00'),
('#C-1003', 'Anjali Gupta', 'C-502', 'Noise from neighbor', 'Security', 'low', 'resolved', '2026-04-24 22:15:00'),
('#C-1004', 'Meera Reddy', 'B-302', 'Basement light broken', 'Maintenance', 'low', 'open', '2026-04-27 08:00:00');

-- 4. Insert Notices
INSERT INTO notices (title, body, tag, posted_by, pinned, posted_date) VALUES
('Annual General Meeting', 'The AGM for this year will be held on Sunday, May 5th at 10:00 AM in the clubhouse.', 'Important', 'Society Committee', TRUE, '2026-04-26'),
('Pool Maintenance', 'The swimming pool will be closed for regular maintenance from April 28th to April 30th.', 'Maintenance', 'Estate Manager', FALSE, '2026-04-25'),
('Summer Festival', 'Join us for the annual Summer Festival on May 15th! Food, music, and games for everyone.', 'Event', 'Cultural Committee', FALSE, '2026-04-24');

-- 5. Insert Visitors
INSERT INTO visitors (name, purpose, host_unit, vehicle_number, entry_time, exit_time, status, entry_date) VALUES
('Dr. Kapoor', 'Doctor visit', 'A-301', 'MH-01-XY-1023', '11:15:00', NULL, 'in', '2026-04-27'),
('Amazon Delivery', 'Delivery', 'B-1204', '—', '10:42:00', '10:50:00', 'out', '2026-04-27'),
('Guest - Rahul', 'Social', 'C-502', 'MH-12-AB-4421', '09:30:00', NULL, 'in', '2026-04-27');
