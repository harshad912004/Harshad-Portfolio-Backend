# Harshad Portfolio Backend

A clean, production-ready REST API backend for a portfolio website. Built with Node.js, Express.js, and MySQL, following the Model-View-Controller (MVC) architecture.

## Tech Stack
* **Node.js** & **Express.js** (API Framework)
* **MySQL** (Relational Database)
* **mysql2/promise** (MySQL Client with Async/Await support)
* **express-validator** (Request validation middleware)
* **dotenv** (Environment configuration)
* **cors** (Cross-Origin Resource Sharing)
* **nodemon** (Development server auto-reload)

## Folder Structure
```text
harshad-portfolio-backend/
├── config/
│   ├── db.js             # MySQL database pool configuration
│   └── schema.sql        # Database initialization script
├── controllers/
│   └── contactController.js # Handles API request logic and error boundaries
├── middleware/
│   └── errorHandler.js   # Global express error handler middleware
├── models/
│   └── contactModel.js   # Interacts with the database (SQL queries)
├── routes/
│   └── contactRoutes.js  # Defines endpoints and mounts validators
├── .env.example          # Environment variables template
├── .gitignore            # Files ignored by git
├── app.js                # Express app setup and middleware configuration
├── server.js             # Entry point (database connection check & server boot)
├── package.json          # Dependency and script manager
└── README.md             # Project documentation
```

---

## Setup & Installation

### 1. Prerequisites
Ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v16+ recommended)
* [MySQL Server](https://www.mysql.com/)

### 2. Clone and Install Dependencies
Navigate to the project root directory and run:
```bash
npm install
```

### 3. Database Setup
Log in to your MySQL CLI or visual client (e.g., MySQL Workbench) and execute the SQL script located in `config/schema.sql` to initialize the database and create the table:
```sql
CREATE DATABASE portfolio;

USE portfolio;

CREATE TABLE contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200),
    email VARCHAR(200),
    subject VARCHAR(200),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Configuration
Create a `.env` file in the root directory based on the `.env.example` template:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=portfolio
CORS_ORIGIN=http://localhost:3000
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
```
Update the database credentials (`DB_USER`, `DB_PASSWORD`, etc.) and email configuration to match your setup.

### 5. Running the Application

* **Development Mode (with auto-reload):**
  ```bash
  npm run dev
  ```
* **Production Mode:**
  ```bash
  npm start
  ```

---

## API Documentation & Postman Examples

### 1. Create a Contact Message
* **Endpoint:** `POST /api/contact`
* **Content-Type:** `application/json`
* **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "subject": "Inquiry about freelance project",
    "message": "Hi Harshad, I would love to collaborate on a React project."
  }
  ```

* **Validation Rules:**
  * `name`: Required, non-empty
  * `email`: Required, valid email format
  * `subject`: Required, non-empty
  * `message`: Required, non-empty

* **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Message sent successfully"
  }
  ```

* **Validation Error Response (400 Bad Request):**
  ```json
  {
    "success": false,
    "errors": [
      {
        "type": "field",
        "value": "invalid-email",
        "msg": "Must be a valid email address",
        "path": "email",
        "location": "body"
      }
    ]
  }
  ```

---

### 2. Get All Contact Messages
* **Endpoint:** `GET /api/contact`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "johndoe@example.com",
        "subject": "Inquiry about freelance project",
        "message": "Hi Harshad, I would love to collaborate on a React project.",
        "created_at": "2026-07-19T14:30:00.000Z"
      }
    ]
  }
  ```

---

### 3. Get Single Contact Message
* **Endpoint:** `GET /api/contact/:id`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "name": "John Doe",
      "email": "johndoe@example.com",
      "subject": "Inquiry about freelance project",
      "message": "Hi Harshad, I would love to collaborate on a React project.",
      "created_at": "2026-07-19T14:30:00.000Z"
    }
  }
  ```
* **Error Response (404 Not Found):**
  ```json
  {
    "success": false,
    "message": "Contact message with ID 999 not found"
  }
  ```

---

### 4. Delete Contact Message
* **Endpoint:** `DELETE /api/contact/:id`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Contact message deleted successfully"
  }
  ```
* **Error Response (404 Not Found):**
  ```json
  {
    "success": false,
    "message": "Contact message with ID 999 not found or already deleted"
  }
  ```

---

## Email Notification Setup

The backend uses **Nodemailer** to send contact form submissions to your email address.

### 1. Gmail App Password Setup
To allow the backend to send emails via Gmail:
1. Go to your [Google Account settings](https://myaccount.google.com/).
2. Navigate to **Security**.
3. Under "How you sign in to Google," enable **2-Step Verification** (required for App Passwords).
4. Search for or go to **App passwords** (usually under "2-Step Verification" settings or directly via the search bar).
5. Generate a new app password (e.g., name it "Portfolio Backend").
6. Copy the generated 16-character password.
7. Paste this password in your `.env` file as `EMAIL_PASS`.

### 2. Environment Variables
Ensure these keys are present in your `.env` file:
* `EMAIL_USER`: Your Gmail address (e.g., `developer@gmail.com`).
* `EMAIL_PASS`: The 16-character App Password generated above.

### 3. How to Test the Email Feature
1. Ensure your application is running (`npm run dev`).
2. Send a POST request to `/api/contact` using Postman, curl, or any API client:
   ```bash
   curl -X POST http://localhost:5000/api/contact \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Jane Doe",
       "email": "janedoe@example.com",
       "subject": "Collaboration Opportunity",
       "message": "Hi, I checked your portfolio and would like to connect."
     }'
   ```
3. Verify that:
   * The API returns a `201 Created` status with `success: true`.
   * The submission is saved to your MySQL database.
   * You receive an email in your inbox with the details of the submission.
   * If the email configuration is invalid, check your console logs to see the error message. The message will still be saved to the database.
