import React from "react";
import { NumberItem } from "./NumberList";

export default function Logger({ numbers }: { numbers: NumberItem[] }) {
    function handleLog() {
        console.log("--- Logging numbers with forEach ---");
        numbers.forEach((n, i) => console.log(`index ${i}:`, n.value));
        console.log("--- Done ---");
    }

    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold">Logger</h3>
            <p className="mt-2">Click to iterate over the list and log values to the console.</p>
            <button className="mt-2 px-3 py-1 rounded border" onClick={handleLog}>
                Log to Console
            </button>
        </div>
    );
}
