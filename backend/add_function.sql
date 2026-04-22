DELIMITER //

CREATE FUNCTION IF NOT EXISTS GetTotalDues(res_id INT) 
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    DECLARE total_amount DECIMAL(10,2);
    
    -- Summing all bills where status is 'pending' for the given resident
    SELECT SUM(amount) INTO total_amount 
    FROM bills 
    WHERE resident_id = res_id AND status = 'pending';
    
    -- If no bills found, return 0.00 instead of NULL
    RETURN IFNULL(total_amount, 0.00);
END //

DELIMITER ;
