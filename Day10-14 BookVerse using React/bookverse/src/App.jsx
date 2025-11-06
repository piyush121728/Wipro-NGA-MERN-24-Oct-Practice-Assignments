// App.jsx
// Parent component to render the BookList and display page header

import React from "react";
import BookList from "./components/BookList";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>📚 BookVerse</h1>
        <p>Discover your next great read!</p>
      </header>

      {/* Render the main BookList section */}
      <BookList />
    </div>
  );
};

export default App;
