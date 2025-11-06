import React, { useMemo, useState } from "react";
import NumberList, { NumberItem } from "./components/NumberList";
import FilterControls from "./components/FilterControls";
import Logger from "./components/Logger";
import HoistingDemo from "./components/HoistingDemo";
import ConstructorDemo from "./components/ConstructorDemo";

const baseNumbers: NumberItem[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => ({ value: v }));

export default function App() {
  const [showEven, setShowEven] = useState(false);
  const [showDoubled, setShowDoubled] = useState(false);

  const processed = useMemo(() => {
    let arr = baseNumbers.slice();

    if (showEven) {
      arr = arr.filter((n) => n.value % 2 === 0);
    }

    if (showDoubled) {
      arr = arr.map((n) => ({ value: n.value * 2 }));
    }

    return arr;
  }, [showEven, showDoubled]);

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">
        JSX & JavaScript Concepts Sprint — Solution
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left side: filters + number list */}
        <div className="rounded-lg border">
          <FilterControls
            showEven={showEven}
            setShowEven={setShowEven}
            showDoubled={showDoubled}
            setShowDoubled={setShowDoubled}
          />
          <NumberList numbers={processed} />
        </div>

        {/* Right side: logger + demos */}
        <div className="rounded-lg border p-4">
          <Logger numbers={processed} />
          <div className="my-4">
            <HoistingDemo />
          </div>
          <div className="my-4">
            <ConstructorDemo />
          </div>
        </div>
      </div>

      <footer className="mt-6 text-sm text-gray-600">
        <div>How to run:</div>
        <ol className="list-decimal pl-6">
          <li>
            Create a new React + TypeScript project using{" "}
            <code>npx create-react-app my-app --template typescript</code>.
          </li>
          <li>
            Add the five components in <code>src/components/</code>.
          </li>
          <li>Replace <code>src/App.tsx</code> with this code.</li>
          <li>Run <code>npm start</code> and open your browser at <code>http://localhost:3000</code>.</li>
        </ol>
      </footer>
    </div>
  );
}
