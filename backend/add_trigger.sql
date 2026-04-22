-- 1. Create the Audit Logs table
CREATE TABLE IF NOT EXISTS audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action_type VARCHAR(50),
    table_name VARCHAR(50),
    record_id INT,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create the Trigger
DELIMITER //

CREATE TRIGGER after_resident_insert
AFTER INSERT ON residents
FOR EACH ROW
BEGIN
    INSERT INTO audit_logs (action_type, table_name, record_id, details)
    VALUES ('INSERT', 'residents', NEW.id, CONCAT('New resident added: ', NEW.full_name, ' in unit ', NEW.unit_number));
END //

DELIMITER ;
