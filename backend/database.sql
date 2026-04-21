-- 1. Setup the Project Database
CREATE DATABASE IF NOT EXISTS society_hub;
USE society_hub;

-- 2. Residents Table (Matches Residents.tsx)
CREATE TABLE IF NOT EXISTS residents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    unit_number VARCHAR(20) NOT NULL, -- e.g., 'B-1204'
    resident_type ENUM('Owner', 'Tenant') NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    joined_date DATE DEFAULT (CURRENT_DATE)
);

-- 3. Bills Table (Matches Bills.tsx)
CREATE TABLE IF NOT EXISTS bills (
    id VARCHAR(50) PRIMARY KEY, -- e.g., 'INV-2025-0421'
    resident_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    due_date VARCHAR(50) NOT NULL, -- Storing as string to match frontend '30 Apr 2026'
    status ENUM('paid', 'pending', 'overdue') DEFAULT 'pending',
    FOREIGN KEY (resident_id) REFERENCES residents(id) ON DELETE CASCADE
);

-- 4. Notices Table (Matches Notices.tsx)
CREATE TABLE IF NOT EXISTS notices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    posted_date VARCHAR(50), -- e.g., '26 Apr 2026'
    tag ENUM('Important', 'Maintenance', 'Event', 'Policy') DEFAULT 'Important',
    posted_by VARCHAR(100), -- e.g., 'Society Committee'
    pinned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Complaints Table (Matches Complaints.tsx)
CREATE TABLE IF NOT EXISTS complaints (
    id VARCHAR(20) PRIMARY KEY, -- e.g., '#C-0421'
    resident_id INT,
    title VARCHAR(255) NOT NULL,
    category ENUM('Plumbing', 'Electrical', 'Housekeeping', 'Parking', 'Security', 'Other') NOT NULL,
    priority ENUM('high', 'medium', 'low') DEFAULT 'medium',
    status ENUM('open', 'progress', 'resolved') DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (resident_id) REFERENCES residents(id) ON DELETE CASCADE
);

-- 6. Visitors Table (Matches Visitors.tsx)
CREATE TABLE IF NOT EXISTS visitors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    purpose VARCHAR(255),
    host_unit VARCHAR(20), -- e.g., 'B-1204'
    vehicle_number VARCHAR(50), -- e.g., 'MH-12-AB-4421'
    entry_time VARCHAR(20), -- e.g., '10:42'
    exit_time VARCHAR(20) DEFAULT '—',
    status ENUM('in', 'out') DEFAULT 'in'
);

-- --- 📊 VIVA PREP DATA (SAMPLE RECORDS) ---

INSERT INTO residents (id, full_name, email, phone, unit_number, resident_type, status) VALUES 
(1, 'Priya Sharma', 'priya.s@mail.com', '+91 98201 23456', 'B-1204', 'Owner', 'active'),
(2, 'Rohan Mehta', 'rohan.m@mail.com', '+91 99800 11223', 'A-301', 'Tenant', 'active');

INSERT INTO bills (id, resident_id, amount, due_date, status) VALUES 
('INV-2025-0421', 1, 4500.00, '30 Apr 2026', 'paid'),
('INV-2025-0420', 2, 4500.00, '30 Apr 2026', 'pending');

INSERT INTO notices (title, body, posted_date, tag, posted_by, pinned) VALUES 
('Annual General Meeting', 'AGM will be held on Saturday at the clubhouse.', '26 Apr 2026', 'Important', 'Society Committee', TRUE);

INSERT INTO complaints (id, resident_id, title, category, priority, status) VALUES 
('#C-0421', 2, 'Water leakage in ceiling', 'Plumbing', 'high', 'open');

INSERT INTO visitors (name, purpose, host_unit, vehicle_number, entry_time, status) VALUES 
('Dr. Kapoor', 'Doctor visit', 'A-301', 'MH-01-XY-1023', '11:15', 'in');
