
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="d-flex justify-content-end mb-3 pe-3">
      <button
        className={`btn px-4 py-2 rounded-pill shadow-sm 
      ${theme === "light" ? "btn-dark" : "btn-light"}`}
        onClick={toggleTheme}
      >
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </div>

  );
}
