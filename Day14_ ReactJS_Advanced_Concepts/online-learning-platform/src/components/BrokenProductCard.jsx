import React from "react";

// Component intentionally throws an error for demonstration purposes
export default function BrokenProductCard({ product }) {
  if (product?.shouldThrow) throw new Error("BrokenProductCard crashed intentionally");
  return (
    <div className="card shadow-sm border-0 mb-3">
      <div className="card-body">
        <h3 className="card-title fw-bold text-primary">{product?.name ?? "Unnamed Product"}</h3>
      </div>
    </div >
  );
}
