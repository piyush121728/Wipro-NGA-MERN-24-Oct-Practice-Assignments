
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4 shadow">
      <div className="container">
        <Link className="navbar-brand" to="/">React Project</Link>

        <div>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/workout">Workout Tracker</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
