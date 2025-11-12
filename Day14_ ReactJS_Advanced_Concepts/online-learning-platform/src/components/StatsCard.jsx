import React from "react";

// Pure component: re-renders only when props actually change
function StatsCardInner({ title, value, lastUpdated }) {
  console.log(`Render: ${title}`);
  return (
    <div className="card border rounded-3 p-3 shadow-sm text-center mb-3">
      <h4 className="mb-2">{title}</h4>
      <div className="fs-4 fw-semibold text-primary">{value}</div>
      <small className="text-muted">Last updated: {lastUpdated}</small>
    </div>

  );
}

const StatsCard = React.memo(StatsCardInner);
export default StatsCard;
