import React from "react";

export interface NumberItem {
    value: number;
}

export default function NumberList({ numbers }: { numbers: NumberItem[] }) {
    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold">Number List</h3>
            <ul className="list-disc pl-6 mt-2">
                {numbers.map((n, idx) => (
                    <li key={idx}>{n.value}</li>
                ))}
            </ul>
        </div>
    );
}
