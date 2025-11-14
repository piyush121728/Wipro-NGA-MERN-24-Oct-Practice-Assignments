
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import WorkoutTracker from "./components/WorkoutTracker";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>

        <Navbar />
        <div className="container">
          <ThemeToggle />

          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/workout" element={<WorkoutTracker />} />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
