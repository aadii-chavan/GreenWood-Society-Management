# 🚀 Database Viva Commands

Use these commands to demonstrate the advanced MySQL logic (Triggers & Functions) to your teacher.

---

## 1. Setup Logic (Run this first)
If you haven't created the triggers/functions yet, run the code from `Database.sql` or use this:
```sql
SET GLOBAL log_bin_trust_function_creators = 1;
USE greenwood_db;
```

---

## 2. Test the Function (Total Dues)
**Objective**: Demonstrate a stored function that calculates real-time pending dues for a resident.
```sql
-- Calculate total unpaid amount for Rohan Mehta
SELECT get_resident_pending_total('Rohan Mehta') AS total_unpaid_dues;
```

---

## 3. Test the Trigger (Auto-Timestamp)
**Objective**: Show that the database automatically handles timestamps when a complaint is resolved.
```sql
-- Step A: Resolve a complaint
UPDATE complaints 
SET status = 'resolved' 
WHERE id = '#C-1001';

-- Step B: Verify the 'resolved_at' was automatically set by the Trigger
SELECT id, title, status, resolved_at 
FROM complaints 
WHERE id = '#C-1001';
```

---

## 4. Test the Trigger (Data Validation)
**Objective**: Show that the database has a "Safety Valve" that blocks invalid data.
```sql
-- This INSERT will be BLOCKED by the trigger because the amount is negative
INSERT INTO bills (id, resident_name, unit_number, amount, due_date, status) 
VALUES ('INV-TEST-001', 'Test Resident', 'A-000', -1500.00, '2026-05-10', 'pending');
```

---

## 5. View Metadata
**Objective**: Show the teacher where the code is stored in the system.
```sql
-- List all triggers in the database
SHOW TRIGGERS;

-- List all functions
SHOW FUNCTION STATUS WHERE Db = 'greenwood_db';
```

---

<p align="center">
  Maintained by <a href="https://github.com/aadii-chavan">Aditya Chavan</a>
</p>
