import React, { useEffect, useState } from "react";

// Lazy-loaded InstructorProfile component (loaded only when requested)
export default function InstructorProfile({ instructorId }) {
  const [inst, setInst] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInst({ id: instructorId, name: "Jane Doe", bio: "Senior React Instructor" });
    }, 700);
    return () => clearTimeout(timer);
  }, [instructorId]);

  if (!inst) return <div>Loading instructor data…</div>;

  return (
    <div className="card shadow-sm border-0 mb-3">
      <div className="card-body">
        <h2 className="card-title fw-bold text-primary">Instructor Info:</h2>

        <h5 className="fw-bold card-title">{inst.name}</h5>
        <p className="card-text text-muted">{inst.bio}</p>
      </div>
    </div>


  );
}
