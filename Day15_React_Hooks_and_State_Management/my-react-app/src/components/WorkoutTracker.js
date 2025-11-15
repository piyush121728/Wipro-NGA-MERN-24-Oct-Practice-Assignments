
import React, { useState, useEffect } from "react";
import useTimer from "../hooks/useTimer";

export default function WorkoutTracker() {
  const [sets, setSets] = useState(0);
  const [restSec, setRestSec] = useState(30);
  const timer = useTimer(0);

  const completeSet = () => {
    setSets(s => s + 1);
    timer.reset(0);
    timer.start();
  };

  useEffect(() => {
    if (timer.seconds >= restSec) {
      timer.pause();
      alert("Rest complete!");
    }
  }, [timer,timer.seconds, restSec]);

  return (
    <div className="card p-4 shadow-sm">
      <h3>Workout Tracker</h3>

      <p><strong>Sets Completed:</strong> {sets}</p>

      <div className="mb-3">
        <button className="btn btn-success me-2" onClick={completeSet}>
          Complete Set
        </button>
        <button className="btn btn-warning me-2" onClick={timer.pause}>
          Pause
        </button>
        <button className="btn btn-danger" onClick={() => timer.reset(0)}>
          Reset
        </button>
      </div>

      <p><strong>Rest Timer:</strong> {timer.seconds}s</p>

      <label className="form-label">Rest Seconds:</label>
      <input 
        type="number"
        className="form-control w-25"
        value={restSec}
        onChange={e => setRestSec(Number(e.target.value))}
      />
    </div>
  );
}
