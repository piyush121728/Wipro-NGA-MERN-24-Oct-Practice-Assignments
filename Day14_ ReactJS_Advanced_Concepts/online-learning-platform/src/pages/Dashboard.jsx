import React, { useState } from "react";
import StatsCard from "../components/StatsCard";

// Dashboard page demonstrates Pure Components behavior
export default function Dashboard() {
  const [cards, setCards] = useState([
    { id: 1, title: "Users", value: 1200, lastUpdated: "2025-10-10" },
    { id: 2, title: "Courses", value: 35, lastUpdated: "2025-10-10" },
    { id: 3, title: "Revenue", value: "$8,400", lastUpdated: "2025-10-10" },
  ]);

  const simulateUpdate = (single = true) => {
    setCards(prev =>
      prev.map(c => (single && c.id !== 1 ? c : { ...c, value: c.value + " *", lastUpdated: new Date().toLocaleString() }))
    );
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={() => simulateUpdate(true)}>Update One</button>
      <button onClick={() => simulateUpdate(false)} style={{ marginLeft: 10 }}>Update All</button>
      <div className="d-flex flex-wrap gap-3 mt-4">
        {cards.map(c => (
          <StatsCard key={c.id} {...c} />
        ))}
      </div>

    </div>
  );
}
