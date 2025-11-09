# 📚 BookVerse – React Frontend (Day 3 & 3.5)

BookVerse is a dynamic React-based online book catalog application built using **Create React App**.  
It demonstrates **React fundamentals**, **routing**, **component lifecycle**, and **integration with a mock backend** (`json-server`).  
This version (Day 3 + 3.5) includes **conditional navigation** between Book Details and Author Info pages.

---

## 🚀 Features

- **Dynamic Data Fetching** using `json-server`
- **Routing** with `react-router-dom`
- **Grid/List Toggle Layouts**
- **Search Functionality**
- **Reusable Components** (`withLoader`, `RenderMessage`, `BookCard`, etc.)
- **Author Navigation:**  
  - Clicking the author’s name opens their Author Info page  
  - Clicking elsewhere on the card opens Book Details
- **Loading Spinner** via Higher Order Component (HOC)
- **Smooth Fade-In Animations** for Route Transitions

---

## 🧩 Project Structure

```
src/
│
├── components/
│   ├── App.jsx
│   ├── BookList.jsx
│   ├── BookCard.jsx
│   ├── BookDetails.jsx
│   ├── AuthorInfo.jsx
│   ├── SearchBox.jsx
│   ├── RenderMessage.jsx
│   └── withLoader.jsx
│
├── data/
│   └── authorsData.js
│
├── App.css
└── index.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone <your-repo-url>
cd bookverse
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Start the Mock Backend
```bash
npx json-server --watch public/books.json --port 8000
```
✅ Backend runs on [http://localhost:8000/books](http://localhost:8000/books)

### 4️⃣ Start the React App
```bash
npm start
```
✅ App runs on [http://localhost:3000](http://localhost:3000)

---

## 🧠 Core Components

### **1. App.jsx**
Handles main routing for:
- `/home` → BookList
- `/book/:id` → BookDetails
- `/author/:authorName` → AuthorInfo  
Manages global loading state shared across components.

### **2. BookList.jsx**
Fetches books from the backend API.  
Allows toggling between grid and list layouts, includes search, and renders individual BookCards.

### **3. BookCard.jsx**
Displays each book's title, author, and price.  
Implements **conditional click navigation**:
- Click on card → BookDetails
- Click on author → AuthorInfo

### **4. BookDetails.jsx**
Displays detailed info (title, price, description) for a selected book.  
Fetches data using the book ID from the route.

### **5. AuthorInfo.jsx**
A class-based component showing an author's bio and top 3 books.  
Includes a “Back to Home” button for easy navigation.

### **6. withLoader.jsx**
A Higher Order Component (HOC) that wraps components to show a spinner while data loads.

### **7. RenderMessage.jsx**
Renders dynamic fallback messages (e.g., “No books found”).

---

## 🧰 Technologies Used

- **React 18+**
- **React Router DOM v6**
- **Bootstrap 5**
- **json-server** (Mock REST API)
- **JavaScript (ES6+)**
- **HTML5 & CSS3**

---

## 🖼️ UI Preview (Placeholders)

- 🏠 Home Page – Grid/List Book View  
- 📘 Book Details Page  
- ✍️ Author Info Page (with Back to Home)  
- 🔄 Routing Transition Animation  

---

## 🧾 Scripts

| Command | Description |
|----------|-------------|
| `npm start` | Runs React app in development mode |
| `npx json-server --watch public/books.json --port 8000` | Starts mock backend server |
| `npm run build` | Builds the app for production |
| `npm test` | Launches test runner |

---

## 🧑‍💻 Developer Notes

- Ensure the **json-server** is running before starting the app.
- Backend endpoint: `http://localhost:8000/books`
- React frontend runs at: `http://localhost:3000`
- Uses **HOC pattern**, **React Hooks**, and **Lifecycle Methods**.
- Modular structure for reusability and maintainability.

---

## 📚 Learn More

- [React Documentation](https://reactjs.org/)
- [React Router Documentation](https://reactrouter.com/)
- [Bootstrap Docs](https://getbootstrap.com/)
- [JSON Server Guide](https://github.com/typicode/json-server)

---

## 👨‍💻 Author
**Developed as part of the Wipro MERN FY26 Program (Day 10–14 Coding Challenge)**  
Author: *Piyush Kumar*  
Project: *BookVerse (React Frontend with Routing & Backend Integration)*  
