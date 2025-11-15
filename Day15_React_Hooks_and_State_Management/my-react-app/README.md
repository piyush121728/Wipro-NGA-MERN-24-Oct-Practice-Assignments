# React Hooks & State Management – PWA Enabled Fitness App

This project was built using **Create React App (CRA)** and enhanced with:

- ⚛️ React Hooks  
- 🎯 Redux State Management  
- 🌐 React Router  
- 🎨 Bootstrap Styling  
- 📦 Workbox PWA (InjectManifest mode)  
- 📲 Offline Support + Installable App  
- 🏋️‍♂️ Workout Tracker, BMI Calculator, Counters & More  

It is part of the **Wipro MERN FY26 – Day 15 React Hooks & State Management Assignment**.

---

## 🚀 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode.  
Open **http://localhost:3000** in your browser.

The page will reload automatically when you make changes.  
You may also see lint errors in the console.

---

### `npm run build`
Builds the app for production inside the **build/** folder.

The build is optimized with:
- Minified JS/CSS  
- Hashed filenames  
- Precache manifest (via Workbox)  
- Tree-shaken code  
- Optimized static assets  

This build is ready to be deployed.

---

### Serving the Production Build (PWA)
To test PWA features (offline mode, installability):


1. Install a static server:
```
npm install -g serve
```

2. delete existing build folder:
```
rm -r -fo build
```

3. create build folder:
```
npm run build
```

4. Serve the build folder:
```
serve -s build
```

5. Open the link shown in terminal.

This enables:
- Service Worker  
- Workbox caching  
- Offline support  
- “Add to Home Screen” prompt  

---

### `npm test`
Launches the test runner in interactive watch mode.  
(Only applicable if tests are added.)

---

### `npm run eject`
⚠ **Warning:** this is irreversible.  
Ejecting copies all config files (Webpack, Babel, ESLint) into your project.

---

# 📚 Learn More
- CRA Docs: https://facebook.github.io/create-react-app/  
- React Docs: https://reactjs.org/  
- React Router Docs: https://reactrouter.com/  
- Redux Toolkit Docs: https://redux-toolkit.js.org/  
- Bootstrap Docs: https://getbootstrap.com/  
- Workbox Docs: https://developer.chrome.com/docs/workbox  

---

# 🔥 Project Features

### ✔ React Hooks
- useState  
- useEffect  
- useReducer  
- useRef  
- Custom Hooks  

### ✔ Redux Global Store
- Centralized state  
- Reducers + actions  
- Shared component communication  

### ✔ Routing with React Router
- Home  
- Workout Tracker  
- BMI Calculator  
- Quotes/API  
- Challenges Page  

### ✔ Styled with Bootstrap
- Responsive Navbar  
- Footer  
- Cards  
- Buttons  
- Layout grids  
- Forms  

### ✔ PWA (Progressive Web App)
- Offline caching  
- Runtime caching (API + images)  
- Precache for static assets  
- Installable on mobile  
- Fast load via Workbox  

Service worker location:
```
src/service-worker.js
```

---

# 📦 Folder Structure
```
src/
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   ├── WorkoutTracker.js
│   ├── BMI.js
│   ├── Counter.js
│   └── ...
├── pages/
│   ├── Home.js
│   ├── About.js
│   ├── Challenges.js
│   └── ...
├── store/
│   ├── index.js
│   └── reducers.js
├── App.js
├── index.js
└── service-worker.js
```

---

# 📝 Deployment
You can deploy using:
- Netlify  
- Vercel  
- GitHub Pages  
- Firebase Hosting  
- Render  
- Any static hosting provider  

---

# 🧪 Troubleshooting

### Service worker not registering?
- Ensure it's in `/src`, not `/public`
- Use `npm run build`
- Use `serve -s build` to test PWA

### Lighthouse warning about IndexedDB?
Run Lighthouse in **Incognito Mode**.

### “serve not recognized”
Install globally:
```
npm install -g serve
```

---

# 👤 Author
**Piyush Kumar**  
Wipro MERN FY26 – Day 15 React Assignments
