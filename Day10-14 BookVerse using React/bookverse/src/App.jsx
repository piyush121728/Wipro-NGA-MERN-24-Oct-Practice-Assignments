// App.jsx
// Entry point integrating styled components with Bootstrap

import React from "react";
import BookList from "./components/BookList";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className="App bg-light p-4">
      <header className="bg-dark text-white p-3 rounded">
        <h1>📚 BookVerse</h1>
        <p>Discover your next great read!</p>
      </header>

      <BookList />
    </div>
  );
};

export default App;

