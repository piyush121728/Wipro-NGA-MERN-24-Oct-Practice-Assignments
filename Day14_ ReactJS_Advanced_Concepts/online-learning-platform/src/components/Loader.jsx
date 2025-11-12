import React from "react";

// Loader component shows a spinner while content or lazy components are being fetched.
export default function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center p-4">
      <div className="spinner-border text-secondary" role="status" aria-label="loading">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>

  );
}
