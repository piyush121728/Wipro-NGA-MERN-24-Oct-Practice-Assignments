import React from "react";

interface FilterProps {
    showEven: boolean;
    setShowEven: (b: boolean) => void;
    showDoubled: boolean;
    setShowDoubled: (b: boolean) => void;
}

export default function FilterControls({
    showEven,
    setShowEven,
    showDoubled,
    setShowDoubled,
}: FilterProps) {
    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold">Filter & Map Controls</h3>
            <div className="mt-2 space-x-4">
                <label>
                    <input
                        type="checkbox"
                        checked={showEven}
                        onChange={(e) => setShowEven(e.target.checked)}
                    />{" "}
                    Show only even numbers
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={showDoubled}
                        onChange={(e) => setShowDoubled(e.target.checked)}
                    />{" "}
                    Show doubled values (map)
                </label>
            </div>
        </div>
    );
}
