# Day 22 Forms, MongoDB, Authentication (Sessions + JWT)

A **Node.js + Express** project demonstrating form handling, MongoDB
integration, and secure authentication using **JWT**, following industry best practices.

------------------------------------------------------------------------

## 🚀 Features

### 🔹 Form Handling

-   Simple registration form using **EJS**
-   Backend validation using **express-validator**
-   Displays success messages upon submission

### 🔹 MongoDB + Mongoose

-   Stores new user records in a **users** collection\
-   Fully commented Mongoose model

### 🔹 Secure Authentication

Supports **authentication systems**:

#### 1. JWT Authentication (for APIs)

-   Tokens signed with `JWT_SECRET`
-   Middleware `authenticateJWT`
-   Protects API routes using `Bearer Token`

### 🔹 RBAC (Role-Based Access Control)

-   `authorizeRole("admin")` middleware\
-   Admin-only dashboard\
-   Unauthorized users → **Access Denied**

### 🔹 Admin Seeding Script

Creates an admin user:

    Email: ex@gmail.com  
    Password: password  
    Role: admin

------------------------------------------------------------------------

## 📁 Project Structure

    📦 project-folder
    │
    ├── server.js
    ├── package.json
    ├── .gitignore
    ├── .env.example
    │
    ├── config/
    │   └── auth.js
    │
    ├── models/
    │   └── User.js
    │
    ├── routes/
    │   ├── formRoutes.js
    │   └── authRoutes.js
    │
    ├── views/
    │   ├── register.ejs
    │   └── login.ejs
    │
    ├── seedAdmin.js
    └── README.md

------------------------------------------------------------------------

## ⚙️ Environment Variables

Create `.env` using `.env.example`:
    ADMIN_EMAIL=ex@gmail.com
    ADMIN_PASSWORD=password
    PORT=4000
    MONGO_URI=mongodb://127.0.0.1:27017/day22_jwt
    JWT_SECRET=your_generated_jwt_secret
    JWT_EXPIRES_IN=1h
    

Generate secure secrets:

    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

------------------------------------------------------------------------

## 🛠️ Installation & Setup

### 1️⃣ Install Dependencies

    npm install

### 2️⃣ Create Environment File

    cp .env.example .env

### 3️⃣ Seed Admin User

    npm run seed-admin

### 4️⃣ Run Server

    npm start

Server URL:\
**http://localhost:4000**

------------------------------------------------------------------------

## 🔐 Authentication Overview

### ✔ JWT Authentication
Protected route:

    GET /dashboard

Login returns:

    {
      "token": "eyJhbGc...",
      "message": "Login successful"
    }

Headers:

    Authorization: Bearer <token>

Protected route:

    GET /profile

------------------------------------------------------------------------

## 🛡️ Admin Route (RBAC)

Route:

    GET /admin

Requirements: - Authenticated (Session/JWT) - Role: `admin`

Response:

    Welcome, Admin!

Unauthorized users → `Access Denied`

------------------------------------------------------------------------

## 🧪 Testing Routes

### Public:

-   GET `/register`
-   POST `/register`
-   GET `/login`
-   POST `/login`

### JWT-Protected:

-   GET `/profile`

### Admin-Protected:

-   GET `/admin`

------------------------------------------------------------------------

## 🔍 Technologies Used

-   Node.js\
-   Express.js\
-   MongoDB + Mongoose\
-   bcrypt\
-   express-session\
-   connect-mongo\
-   jsonwebtoken\
-   EJS\
-   express-validator

------------------------------------------------------------------------

## 🧩 Future Enhancements

-   Refresh Token Flow\
-   Logout (Destroy session + JWT blacklist)\
-   UI dashboard\
-   CSRF Protection\
-   Email verification

------------------------------------------------------------------------

## ✅ Conclusion

This project includes: ✔ Forms\
✔ MongoDB\
✔ JWT\
✔ RBAC\
✔ Admin Seeder\
✔ Clean folder structure\
✔ Full comments
