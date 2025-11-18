# 📘 SkillSphere LMS – Basic Routing & Route Middleware
A simple Express.js project demonstrating **basic routing**, **dynamic parameters**, and **route-level middleware** using a structured folder setup and data stored in a JSON file.

---

## 🚀 Features

### ✅ Challenge 1 — Root Route  
- `GET /`  
- Returns a welcome message:  
  **"Welcome to SkillSphere LMS API"**

### ✅ Challenge 2 — Dynamic Course Route  
- `GET /courses/:id`  
- Fetches a course by ID from `courses.json`  
- Returns JSON response:
```json
{
  "id": 101,
  "name": "React Mastery",
  "duration": "6 weeks"
}
```

### ✅ Challenge 3 — Middleware for ID Validation  
A middleware ensures course IDs contain only numbers.

Invalid request:  
`GET /courses/abc` →  
```json
{ "error": "Invalid course ID" }
```

---

## 📁 Project Structure
```
skill-sphere-lms/
├── index.js
├── package.json
├── routes/
│   └── courses.js
├── middleware/
│   └── validateCourseId.js
├── data/
│   └── courses.json
└── README.md
```

---

## 📥 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone <your-repo-url>
cd skill-sphere-lms
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Start the server
```bash
npm start
```
Server runs at:  
👉 **http://localhost:4000**

---

## 🧪 API Endpoints

### 🔹 **GET /**  
Returns welcome message.

### 🔹 **GET /courses/:id**  
Fetches a course by numeric ID.  
Reads data from `data/courses.json`.

Example:
```
GET /courses/101
```

---

## 🛡️ Middleware: validateCourseId.js
Ensures only numeric IDs are allowed.

```js
module.exports = function validateCourseId(req, res, next) {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: "Invalid course ID" });
  }

  next();
};
```

---

## 📦 JSON Data Source (courses.json)
```json
{
  "courses": [
    { "id": 101, "name": "React Mastery", "duration": "6 weeks" },
    { "id": 102, "name": "Node.js Essentials", "duration": "4 weeks" },
    { "id": 103, "name": "MongoDB Crash Course", "duration": "3 weeks" }
  ]
}
```

---

## 📝 Approach Summary
- Routes organized using Express Router.
- Middleware used for validating dynamic parameters.
- Course details stored in a JSON file for clean separation.
- 404 handler included for non-existent routes.
- Minimal and clean Express setup.

---

## 🤝 Contributing
Feel free to open issues or submit PRs for improvements.

---

## 📜 License
This project is for educational purposes and part of a learning module on Express.js routing.
