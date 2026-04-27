# Greenwood Backend

This is the Node.js/Express backend for the Greenwood Society Management System.

## Setup

1.  **Database**:
    *   Execute `database.sql` (root directory) in your MySQL Workbench.
    *   Execute `users.sql` (root directory) to populate initial data.
2.  **Environment Variables**:
    *   Update `backend/.env` with your MySQL credentials.
3.  **Install Dependencies**:
    ```bash
    cd backend
    npm install
    ```
4.  **Run Server**:
    ```bash
    npm start
    ```

## Endpoints

*   `GET /api/residents` - Fetch all residents
*   `POST /api/residents` - Add new resident
*   `GET /api/bills` - Fetch all bills
*   `GET /api/complaints` - Fetch all complaints
*   `GET /api/visitors` - Fetch all visitors
*   `GET /api/notices` - Fetch all notices
*   `GET /api/stats/revenue` - Fetch revenue stats for chart
