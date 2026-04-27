# Development Setup Guide

[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Workbench](https://img.shields.io/badge/MySQL-Workbench-007ACC?style=for-the-badge&logo=mysql&logoColor=white)]()

This document provides a comprehensive guide to setting up the **SocietyHub** development environment. Please follow these steps carefully to ensure a smooth configuration.

---

## [![Database](https://img.shields.io/badge/Database-Configuration-38B2AC?style=for-the-badge)]()

### 1. MySQL Workbench Setup
1. Launch **MySQL Workbench** and connect to your instance.
2. Execute the following to initialize the schema:
   ```sql
   CREATE DATABASE greenwood_db;
   USE greenwood_db;
   ```
3. **Table Creation**: Open and run `backend/DB/Database.sql`.
4. **Data Population**: Open and run `backend/DB/users.sql` to populate mock data.

### 2. Environment Setup
Navigate to the `backend` directory and configure your `.env` file:
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=greenwood_db
PORT=5001
```

---

## [![Installation](https://img.shields.io/badge/System-Installation-FF4500?style=for-the-badge)]()

### 1. Backend Engine
```bash
cd backend
npm install
npm start
```

### 2. Frontend Interface
```bash
# In a new terminal (root directory)
npm install
npm run dev
```

---

## [![Contribution](https://img.shields.io/badge/Contribution-Guidelines-228B22?style=for-the-badge)]()

To maintain the premium quality of the codebase, all Pull Requests must adhere to the following:

- **Port Standardization**: Always use **Port 5001** for local development.
- **Data Validation**: 
  - Phone numbers must be exactly **10 digits**.
  - Emails must contain both `@` and `.com`.
  - Names must be restricted to **letters and spaces** only.
- **Status Consistency**: Use the standardized **"Pending"** status instead of "In Progress" for consistency across modules.
- **Dynamic Data**: Ensure all selectors (Residents/Flats) fetch real-time data from the backend.

---

## [![Troubleshooting](https://img.shields.io/badge/Troubleshooting-Support-gray?style=for-the-badge)]()

- **Port Conflict**: If Port 5000 is occupied (macOS AirPlay), the system is pre-configured to run on **5001**.
- **DB Connection**: Ensure the MySQL service is running before starting the backend server.

---

<p align="center">
  Built with passion by <a href="https://github.com/aadii-chavan">Aditya Chavan</a>
</p>
