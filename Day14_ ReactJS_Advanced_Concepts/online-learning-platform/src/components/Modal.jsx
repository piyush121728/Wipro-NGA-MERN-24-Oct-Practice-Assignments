import React, { useEffect } from "react";
import ReactDOM from "react-dom";

// Portal-based Modal component (renders outside main DOM hierarchy)
const modalRoot = document.getElementById("modal-root");

export default function Modal({ open, onClose, children }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-25"
      onMouseDown={onClose}
    >
      <div
        className="bg-white text-dark p-4 rounded-3 min-vw-25"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="btn-close float-end"
          aria-label="Close"
        ></button>
        {children}
      </div>
    </div>
    ,
    modalRoot
  );
}
