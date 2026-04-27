-- Greenwood Society Management System Database Schema
-- Database: greenwood_db

CREATE DATABASE IF NOT EXISTS greenwood_db;
USE greenwood_db;

-- 1. Residents Table
CREATE TABLE IF NOT EXISTS residents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    unit_number VARCHAR(50) NOT NULL,
    resident_type ENUM('Owner', 'Tenant') DEFAULT 'Owner',
    status ENUM('active', 'inactive') DEFAULT 'active',
    joined_date DATE DEFAULT (CURRENT_DATE),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bills / Invoices Table
CREATE TABLE IF NOT EXISTS bills (
    id VARCHAR(50) PRIMARY KEY, -- Format: INV-YYYY-XXXX
    resident_id INT,
    resident_name VARCHAR(255), -- Denormalized for display as seen in frontend
    unit_number VARCHAR(50),
    amount DECIMAL(10, 2) NOT NULL,
    due_date DATE NOT NULL,
    status ENUM('paid', 'pending', 'overdue') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (resident_id) REFERENCES residents(id) ON DELETE SET NULL
);

-- 3. Complaints Table
CREATE TABLE IF NOT EXISTS complaints (
    id VARCHAR(50) PRIMARY KEY, -- Format: #C-XXXX
    resident_name VARCHAR(255),
    unit_number VARCHAR(50),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    priority ENUM('high', 'medium', 'low') DEFAULT 'medium',
    status ENUM('open', 'pending', 'resolved') DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL
);

-- =============================================
-- 6. TRIGGERS
-- =============================================

DELIMITER //

-- Trigger to automatically set resolved_at when a complaint is resolved
CREATE TRIGGER before_complaint_update 
BEFORE UPDATE ON complaints
FOR EACH ROW
BEGIN
    IF NEW.status = 'resolved' AND OLD.status != 'resolved' THEN
        SET NEW.resolved_at = CURRENT_TIMESTAMP;
    END IF;
END //

-- Trigger to prevent negative bill amounts
CREATE TRIGGER before_bill_insert
BEFORE INSERT ON bills
FOR EACH ROW
BEGIN
    IF NEW.amount < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Bill amount cannot be negative';
    END IF;
END //

DELIMITER ;

-- =============================================
-- 7. FUNCTIONS
-- =============================================

DELIMITER //

-- Function to calculate total pending dues for a resident
CREATE FUNCTION get_resident_pending_total(res_name VARCHAR(255)) 
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    DECLARE total_due DECIMAL(10,2);
    SELECT SUM(amount) INTO total_due 
    FROM bills 
    WHERE resident_name = res_name AND status IN ('pending', 'overdue');
    RETURN IFNULL(total_due, 0.00);
END //

DELIMITER ;

-- 4. Notices Table
CREATE TABLE IF NOT EXISTS notices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    posted_date DATE DEFAULT (CURRENT_DATE),
    tag VARCHAR(50), -- e.g., 'Important', 'Maintenance', 'Event'
    posted_by VARCHAR(100),
    pinned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Visitors Table
CREATE TABLE IF NOT EXISTS visitors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    purpose VARCHAR(255),
    host_unit VARCHAR(50) NOT NULL,
    vehicle_number VARCHAR(50),
    entry_time TIME,
    exit_time TIME,
    status ENUM('in', 'out') DEFAULT 'in',
    entry_date DATE DEFAULT (CURRENT_DATE),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for performance
CREATE INDEX idx_resident_unit ON residents(unit_number);
CREATE INDEX idx_bill_status ON bills(status);
CREATE INDEX idx_complaint_status ON complaints(status);
CREATE INDEX idx_visitor_status ON visitors(status);
