import React, { useMemo } from "react";

class NumberWrapper {
    value: number;
    constructor(value: number) {
        this.value = value;
    }
    double() {
        return this.value * 2;
    }
    toString() {
        return `NumberWrapper(${this.value})`;
    }
}

export default function ConstructorDemo() {
    const examples = useMemo(() => {
        const a = new NumberWrapper(5);
        const b = new NumberWrapper(12);
        return [a, b];
    }, []);

    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold">Constructor Demo</h3>
            <p className="mt-2">This demonstrates creating objects with constructors and calling instance methods.</p>
            <div className="mt-2">
                {examples.map((e, i) => (
                    <div key={i} className="mb-2">
                        <div>{e.toString()}</div>
                        <div>double() =&gt; {e.double()}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
