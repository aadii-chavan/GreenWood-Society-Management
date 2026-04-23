const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('❌ Error connecting to MySQL:', err.message);
        return;
    }
    console.log('✅ Connected to MySQL Database: society_hub');
});

// --- API ROUTES ---

// 1. Residents
app.get('/api/residents', (req, res) => {
    const sql = "SELECT * FROM residents ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});

app.post('/api/residents', (req, res) => {
    const { full_name, email, phone, unit_number, resident_type, status } = req.body;
    const sql = "INSERT INTO residents (full_name, email, phone, unit_number, resident_type, status) VALUES (?)";
    const values = [full_name, email, phone, unit_number, resident_type, status];
    db.query(sql, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: "Resident added successfully!", id: data.insertId });
    });
});

// 2. Bills
app.get('/api/bills', (req, res) => {
    const sql = `
        SELECT b.*, r.full_name as resident_name, r.unit_number 
        FROM bills b 
        JOIN residents r ON b.resident_id = r.id 
        ORDER BY b.id DESC`;
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});

app.post('/api/bills', (req, res) => {
    const { id, resident_id, amount, due_date, status } = req.body;
    const sql = "INSERT INTO bills (id, resident_id, amount, due_date, status) VALUES (?)";
    const values = [id, resident_id, amount, due_date, status];
    db.query(sql, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: "Bill generated!", id: id });
    });
});

// 3. Notices
app.get('/api/notices', (req, res) => {
    const sql = "SELECT * FROM notices ORDER BY pinned DESC, created_at DESC";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});

app.post('/api/notices', (req, res) => {
    const { title, body, posted_date, tag, posted_by, pinned } = req.body;
    const sql = "INSERT INTO notices (title, body, posted_date, tag, posted_by, pinned) VALUES (?)";
    const values = [title, body, posted_date, tag, posted_by, pinned];
    db.query(sql, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: "Notice posted!", id: data.insertId });
    });
});

// 4. Complaints
app.get('/api/complaints', (req, res) => {
    const sql = `
        SELECT c.*, r.full_name, r.unit_number 
        FROM complaints c 
        JOIN residents r ON c.resident_id = r.id 
        ORDER BY c.created_at DESC`;
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});

app.post('/api/complaints', (req, res) => {
    const { id, resident_id, title, category, priority, status } = req.body;
    const sql = "INSERT INTO complaints (id, resident_id, title, category, priority, status) VALUES (?)";
    const values = [id, resident_id, title, category, priority, status];
    db.query(sql, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: "Complaint logged!", id: id });
    });
});

// 5. Visitors
app.get('/api/visitors', (req, res) => {
    const sql = "SELECT * FROM visitors ORDER BY entry_time DESC";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});

app.post('/api/visitors', (req, res) => {
    const { name, purpose, host_unit, vehicle_number, entry_time, status } = req.body;
    const sql = "INSERT INTO visitors (name, purpose, host_unit, vehicle_number, entry_time, status) VALUES (?)";
    const values = [name, purpose, host_unit, vehicle_number, entry_time, status];
    db.query(sql, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: "Visitor logged!", id: data.insertId });
    });
});

// 6. Stats
app.get('/api/stats/revenue', (req, res) => {
    const sql = `
        SELECT 
            DATE_FORMAT(due_date, '%b') as month,
            SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) / 1000 as collected,
            SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) / 1000 as pending
        FROM bills
        GROUP BY month, MONTH(due_date)
        ORDER BY MONTH(due_date) ASC`;
    
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Waiter (Server) is running on http://localhost:${PORT}`);
});
