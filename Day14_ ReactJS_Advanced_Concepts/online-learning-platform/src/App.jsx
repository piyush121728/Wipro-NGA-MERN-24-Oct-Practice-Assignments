import React, { Suspense, useState } from "react";
import Loader from "./components/Loader";
import Dashboard from "./pages/Dashboard";
import Shop from "./pages/Shop";
import ExampleWithModal from "./pages/ExampleWithModal";

// Lazy load demo components
const CourseDetails = React.lazy(() => import("./components/CourseDetails"));
const InstructorProfile = React.lazy(() => import("./components/InstructorProfile"));

// Root App component - hosts all demos
export default function App() {
  const [showCourse, setShowCourse] = useState(false);
  const [showInstructor, setShowInstructor] = useState(false);

  return (
    <div style={{ padding: 20 }}>
      <header className="bg-primary text-white py-3 mb-4 text-center shadow-sm">
        <h1 className="h3 m-0 fw-semibold">Online Learning Platform</h1>
      </header>

      <button onClick={() => setShowCourse(prev => !prev)}>Toggle Course Details</button>
      <button className="mt-2" onClick={() => setShowInstructor(prev => !prev)} style={{ marginLeft: 10 }}>Toggle Instructor</button>

      <div className="mt-4">
        <Suspense fallback={<Loader />}>
          {showCourse && <CourseDetails courseId={1} />}
          {showInstructor && <InstructorProfile instructorId={2} />}
        </Suspense>
      </div>

      <hr />
      <Dashboard />
      <hr />
      <Shop />
      <hr />
      <ExampleWithModal />
    </div>
  );
}
