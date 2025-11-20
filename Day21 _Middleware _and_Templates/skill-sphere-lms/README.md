# SkillSphere LMS -- Day 21 (Middleware & Templates)

A Node.js + Express project demonstrating:

-   Lightweight & modular middleware\
-   Custom logging + Morgan production logging\
-   Template rendering using EJS\
-   JSON body parsing & form handling\
-   Dynamic routes & data validation\
-   Clean folder architecture following best practices

## 🚀 Features

### ✅ 1. Global Logging Middleware (Custom + Morgan)

-   Custom logger for readable logs\
-   Morgan (combined mode) for production-grade logging\
-   Both run together as per your selection (Option C)

### ✅ 2. Body Parsing Middleware

-   \`express.json()\` -- parses JSON bodies\
-   \`express.urlencoded({ extended: true })\` -- parses form data

### ✅ 3. Course Routes

-   **GET /courses** → Renders all courses using EJS template\
-   **GET /courses/:id** → Returns a single course (validated ID)\
-   **POST /courses** → Adds a new course and updates \`courses.json\`

### ✅ 4. User Routes

-   **POST /users** → Creates a new user\
-   **GET /users** → Returns all users in memory

### ✅ 5. EJS Template Rendering

-   All templates stored in the **views/** folder\
-   No business logic inside templates\
-   Clean markup for easy maintenance

------------------------------------------------------------------------

## 📁 Project Structure

    skill-sphere-lms-day21-best/
    ├── index.js
    ├── package.json
    ├── .gitignore
    ├── routes/
    │   ├── courses.js
    │   └── users.js
    ├── middleware/
    │   ├── logger.js
    │   └── validateCourseId.js
    ├── data/
    │   └── courses.json
    ├── views/
    │   └── courses.ejs
    └── README.md

------------------------------------------------------------------------

## ⚙️ Installation & Setup

### 1️⃣ Install dependencies

\`\`\` npm install \`\`\`

### 2️⃣ Start the server

\`\`\` npm start \`\`\`

### 3️⃣ Visit in your browser

-   Root route → http://localhost:4000/\
-   Courses page → http://localhost:4000/courses

------------------------------------------------------------------------

## 🧪 API Endpoints

### 📌 Courses API

#### **GET /courses**

Renders an HTML page listing all courses.

#### **GET /courses/:id**

Returns JSON for a specific course: \`\`\`json { "id": 101, "name":
"React Mastery", "duration": "6 weeks" } \`\`\`

#### **POST /courses**

Body: \`\`\`json { "name": "Express.js Advanced", "duration": "5 weeks"
} \`\`\`

------------------------------------------------------------------------

### 📌 Users API

#### **POST /users**

\`\`\`json { "name": "Piyush", "email": "p@example.com" } \`\`\`

#### **GET /users**

Returns all users stored in memory.

------------------------------------------------------------------------

## 🛡️ Middleware Summary

### 🔹 Custom Logger

Lightweight request logger: \`\`\` \[CustomLog\] GET /courses \`\`\`

### 🔹 Morgan Logger

Production-grade logging: \`\`\` ::1 - - \[22/Nov/2025:14:23:01 +0530\]
"GET /courses HTTP/1.1" 200 145 \`\`\`

### 🔹 ID Validation Middleware

Rejects non-numeric course IDs: \`\`\`json { "error": "Invalid course
ID" } \`\`\`

------------------------------------------------------------------------

## 🎨 EJS Templates

-   All templates in **/views**
-   No logic inside templates\
-   Only rendering data passed from routes\
-   Clean and minimal HTML structure

------------------------------------------------------------------------

## 📝 Best Practices Followed

✔ Modular middleware\
✔ Morgan for production logging\
✔ Dedicated views/ folder\
✔ No mixing logic and presentation\
✔ Clean folder architecture\
✔ Persistent course storage (JSON file)

------------------------------------------------------------------------

## 🤝 Contributing

Feel free to open issues or submit PRs if you want to extend the
project.

------------------------------------------------------------------------

## 📜 License

This project is for educational and training purposes.
