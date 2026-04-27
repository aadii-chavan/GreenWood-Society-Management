# SocietyHub - Premium Society Management System


[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![ShadcnUI](https://img.shields.io/badge/Shadcn_UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

**SocietyHub** is a sophisticated, high-performance society management platform designed to streamline residential operations. Built with a focus on modern aesthetics (Glassmorphism, Dark Mode) and seamless user experience, it provides a centralized hub for residents and administrators to manage bills, complaints, notices, and visitors.

---

## Key Features

### [![Dashboard](https://img.shields.io/badge/Advanced-Dashboard-646CFF?style=for-the-badge)]()
- **Real-time Analytics**: Interactive charts for revenue, resident growth, and complaint status.
- **Quick Actions**: One-click access to add residents, generate bills, or post notices.
- **Dynamic Calendar**: View upcoming society events and deadlines at a glance.

### [![Financial](https://img.shields.io/badge/Financial-Management-38B2AC?style=for-the-badge)]()
- **Automated Billing**: Effortlessly generate and track monthly maintenance bills using real resident data.
- **Status Tracking**: Standardized "Paid", "Pending", and "Overdue" statuses across the financial module.
- **History**: Maintain a comprehensive record of all financial transactions in the MySQL database.

### [![Residents](https://img.shields.io/badge/Resident-Directory-007ACC?style=for-the-badge)]()
- **Unified Management**: Searchable database of all residents with profile details.
- **Role-based Access**: Specialized views for administrators and residents.
- **Unit Tracking**: Map residents to their specific blocks and apartments.

### [![Communication](https://img.shields.io/badge/Communication-Hub-20232A?style=for-the-badge)]()
- **Notice Board**: Digital board for broadcasting urgent updates and announcements.
- **Complaint Workflow**: Systematic lifecycle (Open → Pending → Resolved) for tracking and resolving resident grievances with real-time updates.

### [![Security](https://img.shields.io/badge/Security-Visitors-000000?style=for-the-badge)]()
- **Visitor Logs**: Real-time tracking of entries and exits.
- **Pre-approvals**: Streamlined process for expected guests and deliveries.

---

## [![Technical](https://img.shields.io/badge/Technical-Arsenal-FFD700?style=for-the-badge&logoColor=black)]()

- **Frontend**: [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
- **Backend Engine**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- **Database**: [MySQL 8.0+](https://www.mysql.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Validation**: [Sonner](https://sonner.emilkowal.ski/) (Toasts) + Custom Regex Validation (Phone, Email, Name)
- **Charts**: [Recharts](https://recharts.org/)
- **Date Management**: [date-fns](https://date-fns.org/)

---

## [![Getting Started](https://img.shields.io/badge/Getting-Started-FF4500?style=for-the-badge)]()

### Database Setup

1. **Create Database**: Run the `Database.sql` file located in `backend/DB/` in your MySQL Workbench.
2. **Populate Data**: Run the `users.sql` file in the same directory to add mock residents and initial data.
3. **Configure Environment**: Update `backend/.env` with your MySQL credentials.

### Installation & Execution

1. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Start the Systems**
   - **Frontend**: `npm run dev` (Runs on Port 5001)
   - **Backend**: `npm start` (Runs on Port 5001)

*Note: Port 5001 is used to avoid conflicts with macOS AirPlay services on Port 5000.*

---

## [![Design](https://img.shields.io/badge/Design-Philosophy-9370DB?style=for-the-badge)]()

SocietyHub follows a **Premium Dark Aesthetic** with:
- **Glassmorphism**: Subtle backdrop blurs and translucent surfaces.
- **Dynamic Glows**: Accent-colored glows to highlight interactive elements.
- **Micro-animations**: Smooth transitions using Framer Motion (where applicable) and Tailwind Animate.
- **Accessibility**: High contrast ratios and responsive layouts for all devices.

---

## [![Contributing](https://img.shields.io/badge/Contributing-Handshake-228B22?style=for-the-badge)]()

Contributions are welcome! Please feel free to submit a Pull Request.

---

## [![License](https://img.shields.io/badge/License-MIT-gray?style=for-the-badge)]()

This project is licensed under the MIT License.

---

<p align="center">
  Built with passion by <a href="https://github.com/aadii-chavan">Aditya Chavan</a>
</p>
