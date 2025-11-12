import React, { useEffect, useState } from "react";

// Lazy-loaded CourseDetails component (loaded only when requested)
export default function CourseDetails({ courseId }) {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // simulate API delay
    const timer = setTimeout(() => {
      setCourse({ id: courseId, title: "Advanced React", description: "Learn lazy loading and Suspense." });
    }, 800);
    return () => clearTimeout(timer);
  }, [courseId]);

  if (!course) return <div>Loading course data…</div>;

  return (
    <div className="card shadow-sm border-0 mb-3">
      <div className="card-body">
        <h2 className="card-title fw-bold text-primary">Course Details:</h2>

        <h5 className="card-title fw-bold card-title">{course.title}</h5>
        <p className="card-text text-muted">{course.description}</p>
      </div>
    </div>

  );
}
