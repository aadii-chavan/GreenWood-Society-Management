const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// --- API Routes ---

// 1. Residents
app.get('/api/residents', (req, res) => {
  db.query('SELECT * FROM residents', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post('/api/residents', (req, res) => {
  const { full_name, email, phone, unit_number, resident_type, status } = req.body;
  const sql = 'INSERT INTO residents (full_name, email, phone, unit_number, resident_type, status) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [full_name, email, phone, unit_number, resident_type, status], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, ...req.body });
  });
});

// 2. Bills
app.get('/api/bills', (req, res) => {
  db.query('SELECT * FROM bills ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post('/api/bills', (req, res) => {
  const { id, resident_id, resident_name, unit_number, amount, due_date, status } = req.body;
  const sql = 'INSERT INTO bills (id, resident_id, resident_name, unit_number, amount, due_date, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [id, resident_id, resident_name, unit_number, amount, due_date, status], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(req.body);
  });
});

app.patch('/api/bills/:id', (req, res) => {
  const { status } = req.body;
  db.query('UPDATE bills SET status = ? WHERE id = ?', [status, req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Bill updated' });
  });
});

// 3. Complaints
app.get('/api/complaints', (req, res) => {
  db.query('SELECT * FROM complaints ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post('/api/complaints', (req, res) => {
  const { id, resident_name, unit_number, title, category, priority, status } = req.body;
  const sql = 'INSERT INTO complaints (id, resident_name, unit_number, title, category, priority, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [id, resident_name, unit_number, title, category, priority, status], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(req.body);
  });
});

app.patch('/api/complaints/:id/resolve', (req, res) => {
  db.query('UPDATE complaints SET status = "resolved", resolved_at = CURRENT_TIMESTAMP WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Complaint resolved' });
  });
});

app.patch('/api/complaints/:id/status', (req, res) => {
  const { status } = req.body;
  db.query('UPDATE complaints SET status = ? WHERE id = ?', [status, req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Complaint status updated' });
  });
});

// 4. Visitors
app.get('/api/visitors', (req, res) => {
  db.query('SELECT * FROM visitors ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post('/api/visitors', (req, res) => {
  const { name, purpose, host_unit, vehicle_number, entry_time, status } = req.body;
  const sql = 'INSERT INTO visitors (name, purpose, host_unit, vehicle_number, entry_time, status) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, purpose, host_unit, vehicle_number, entry_time, status], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, ...req.body });
  });
});

app.patch('/api/visitors/:id/checkout', (req, res) => {
  const { exit_time } = req.body;
  db.query('UPDATE visitors SET status = "out", exit_time = ? WHERE id = ?', [exit_time, req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Visitor checked out' });
  });
});

// 5. Notices
app.get('/api/notices', (req, res) => {
  db.query('SELECT * FROM notices ORDER BY pinned DESC, created_at DESC', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post('/api/notices', (req, res) => {
  const { title, body, posted_date, tag, posted_by, pinned } = req.body;
  const sql = 'INSERT INTO notices (title, body, posted_date, tag, posted_by, pinned) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [title, body, posted_date, tag, posted_by, pinned], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, ...req.body });
  });
});

// 6. Stats
app.get('/api/stats/revenue', (req, res) => {
  // Simple mock data aggregation or real query
  const sql = `
    SELECT 
      DATE_FORMAT(due_date, '%b') as month,
      SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) as collected,
      SUM(CASE WHEN status != 'paid' THEN amount ELSE 0 END) as pending
    FROM bills
    GROUP BY month
    ORDER BY FIELD(month, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
