import React, { useState } from "react";
import Modal from "../components/Modal";

// Example page to demonstrate Portal-based Modal
export default function ExampleWithModal() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <h2>Portal Modal Example</h2>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <h3>Modal Title</h3>
        <p>This modal is rendered via a portal (outside main DOM).</p>
      </Modal>
    </div>
  );
}
