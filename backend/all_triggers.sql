-- ==========================================
-- 🏢 GLOBAL AUDIT LOGGING SYSTEM
-- ==========================================

-- 1. Ensure the Audit Logs table exists
CREATE TABLE IF NOT EXISTS audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action_type VARCHAR(50),
    table_name VARCHAR(50),
    record_id VARCHAR(50),
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER //

-- 2. TRIDGERS FOR RESIDENTS
DROP TRIGGER IF EXISTS after_resident_insert //
CREATE TRIGGER after_resident_insert
AFTER INSERT ON residents
FOR EACH ROW
BEGIN
    INSERT INTO audit_logs (action_type, table_name, record_id, details)
    VALUES ('INSERT', 'residents', NEW.id, CONCAT('Added resident: ', NEW.full_name, ' (Flat ', NEW.unit_number, ')'));
END //

-- 3. TRIGGERS FOR BILLS
DROP TRIGGER IF EXISTS after_bill_insert //
CREATE TRIGGER after_bill_insert
AFTER INSERT ON bills
FOR EACH ROW
BEGIN
    INSERT INTO audit_logs (action_type, table_name, record_id, details)
    VALUES ('INSERT', 'bills', NEW.id, CONCAT('Generated bill of ₹', NEW.amount, ' for Resident ID ', NEW.resident_id));
END //

DROP TRIGGER IF EXISTS after_bill_update //
CREATE TRIGGER after_bill_update
AFTER UPDATE ON bills
FOR EACH ROW
BEGIN
    IF OLD.status <> NEW.status AND NEW.status = 'paid' THEN
        INSERT INTO audit_logs (action_type, table_name, record_id, details)
        VALUES ('UPDATE', 'bills', NEW.id, CONCAT('Bill marked as PAID for amount ₹', NEW.amount));
    END IF;
END //

-- 4. TRIGGERS FOR NOTICES
DROP TRIGGER IF EXISTS after_notice_insert //
CREATE TRIGGER after_notice_insert
AFTER INSERT ON notices
FOR EACH ROW
BEGIN
    INSERT INTO audit_logs (action_type, table_name, record_id, details)
    VALUES ('INSERT', 'notices', NEW.id, CONCAT('New notice posted: ', NEW.title));
END //

-- 5. TRIGGERS FOR COMPLAINTS
DROP TRIGGER IF EXISTS after_complaint_insert //
CREATE TRIGGER after_complaint_insert
AFTER INSERT ON complaints
FOR EACH ROW
BEGIN
    INSERT INTO audit_logs (action_type, table_name, record_id, details)
    VALUES ('INSERT', 'complaints', NEW.id, CONCAT('Complaint filed: ', NEW.title, ' (Priority: ', NEW.priority, ')'));
END //

-- 6. TRIGGERS FOR VISITORS
DROP TRIGGER IF EXISTS after_visitor_insert //
CREATE TRIGGER after_visitor_insert
AFTER INSERT ON visitors
FOR EACH ROW
BEGIN
    INSERT INTO audit_logs (action_type, table_name, record_id, details)
    VALUES ('INSERT', 'visitors', NEW.id, CONCAT('Visitor entry: ', NEW.name, ' visiting unit ', NEW.host_unit));
END //

DELIMITER ;
