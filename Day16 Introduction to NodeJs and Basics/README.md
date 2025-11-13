# 🚀 Day 16 — Introduction to Node.js & Basics

This project contains all three coding challenges for **Day 16: Introduction to Node.js & Basics**.  
It demonstrates key Node.js fundamentals such as using global objects, timers, command-line arguments, and external npm packages (`chalk`, `figlet`, `moment`).

---

## 📁 Project Structure

```
Day16 Introduction to NodeJs and Basics/
├── hello-node.js      # Challenge 1 – Node fundamentals & timers
├── index.js           # Challenge 2 – ASCII art banner using figlet + chalk
├── greet.js           # Challenge 3 – CLI greeting app using process.argv
├── package.json       # npm dependencies & scripts
└── README.md          # Project documentation
```

---

## 🧩 Challenge Descriptions

### 🥇 **Challenge 1 – Hello Node**
**File:** `hello-node.js`

- Displays Node.js version, file name, and directory name.
- Prints a welcome message every 3 seconds using `setInterval()`.
- Stops automatically after 10 seconds using `clearInterval()`.

**Run:**
```bash
node hello-node.js
```

---

### 🥈 **Challenge 2 – Colorful Banner App**
**File:** `index.js`

- Uses `figlet` to create stylized ASCII text.
- Uses `chalk` for colorful terminal output.
- Run via an npm script (`npm start`).

**Run:**
```bash
npm start
```

**Output Example:**
```
██╗    ██╗███████╗██╗     ██████╗  █████╗ ███╗   ███╗
██║    ██║██╔════╝██║     ██╔══██╗██╔══██╗████╗ ████║
██║ █╗ ██║█████╗  ██║     ██████╔╝███████║██╔████╔██║
██║███╗██║██╔══╝  ██║     ██╔═══╝ ██╔══██║██║╚██╔╝██║
╚███╔███╔╝███████╗███████╗██║     ██║  ██║██║ ╚═╝ ██║
 ╚══╝╚══╝ ╚══════╝╚══════╝╚═╝     ╚═╝  ╚═╝╚═╝     ╚═╝
→ A simple Node.js CLI banner using figlet + chalk
```

---

### 🥉 **Challenge 3 – CLI Greeting App**
**File:** `greet.js`

- Reads your name from command-line arguments (`process.argv`).
- Displays a greeting message with the current date and time.
- Uses `moment` for formatted date/time output.

**Run:**
```bash
node greet.js YourName
```

**Example Output:**
```
Hello, Piyush! Today is Thu Nov 13 2025, 10:15 AM.
```

---

## ⚙️ Installation & Setup

1. **Initialize project**
   ```bash
   npm init -y
   ```

2. **Install dependencies**
   ```bash
   npm install chalk@4 figlet moment
   ```

   > 💡 Using `chalk@4` ensures CommonJS compatibility (`require()` syntax).

3. **Run individual challenges**
   ```bash
   # Challenge 1
   npm run hello

   # Challenge 2
   npm start

   # Challenge 3
   npm run greet -- YourName
   ```

---

## 📦 package.json Scripts

```json
"scripts": {
  "start": "node index.js",
  "hello": "node hello-node.js",
  "greet": "node greet.js"
}
```

---

## 🧠 Concepts Covered

| Concept | Description |
|----------|--------------|
| **Node.js Runtime** | Running JS outside the browser |
| **Global Objects** | `__filename`, `__dirname`, `process`, `console` |
| **Timers** | `setTimeout()`, `setInterval()`, `clearInterval()` |
| **CLI Arguments** | Using `process.argv` |
| **NPM Packages** | Installing and using external modules (`chalk`, `figlet`, `moment`) |
| **package.json** | Managing dependencies and scripts |

---

## 🏁 Expected Output Summary

| Challenge | Run Command | Description |
|------------|--------------|-------------|
| 1 | `node hello-node.js` | Shows Node info + interval messages |
| 2 | `npm start` | Displays colorful ASCII “Welcome to Node.js” banner |
| 3 | `node greet.js Piyush` | Prints personalized greeting with date/time |

---

## 🧾 Author

**Name:** Piyush Kumar  
**Batch:** Wipro MERN FY26  
**Topic:** Day 16 — Introduction to Node.js & Basics  

---

### 💬 Note
If you encounter `TypeError: chalk.cyanBright is not a function`, run:
```bash
npm install chalk@4
```
This project is designed for **CommonJS syntax** (`require`), so Chalk v4 is compatible.

---

✨ *Happy Coding with Node.js!* ✨
