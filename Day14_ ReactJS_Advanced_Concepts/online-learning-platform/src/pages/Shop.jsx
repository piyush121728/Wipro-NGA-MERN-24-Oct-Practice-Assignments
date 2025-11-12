import React, { useState } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import BrokenProductCard from "../components/BrokenProductCard";

// Shop page demonstrating Error Boundary functionality
export default function Shop() {
  const [broken, setBroken] = useState(false);
  const product = { name: "Bookverse Guide", shouldThrow: broken };

  return (
    <div>
      <h2>Shop Page</h2>
      <button onClick={() => setBroken(b => !b)}>
        Toggle Broken (Current: {String(broken)})
      </button>
      <div className="mt-4">
        <ErrorBoundary>
          <BrokenProductCard product={product} />
        </ErrorBoundary>
      </div>
    </div>
  );
}
