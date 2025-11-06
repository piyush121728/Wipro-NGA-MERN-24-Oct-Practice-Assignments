import React, { useEffect } from "react";

export default function HoistingDemo() {
    useEffect(() => {
        // Function hoisting demo
        console.log("call hoistedFunction before declaration:", hoistedFunction(2));

        // Variable hoisting demo
        // var variables are hoisted (declared but initialized to undefined)
        console.log("aVar before declaration (should be undefined):", (window as any).aVar);

        // let/const variables are not hoisted in the same way (temporal dead zone)
        try {
            // Accessing aLet before declaration throws ReferenceError
            // We'll simulate it using an IIFE so it doesn’t crash the whole script
            (function () {
                // @ts-expect-error intentional TDZ access
                // eslint-disable-next-line no-unused-expressions
                console.log("aLet before declaration:", aLet);
            })();
        } catch {
            console.log("Accessing let before declaration throws ReferenceError (as expected)");
        }

        // Now declare variables
        var aVar = 42;
        let aLet = 100;
        const aConst = 200;

        console.log("aVar after assignment:", aVar);
        console.log("aLet after declaration:", aLet);
        console.log("aConst after declaration:", aConst);

        // Function declaration (hoisted)
        function hoistedFunction(x: number) {
            return x + 10;
        }

        // Function expression (not hoisted)
        const unHoisted = (x: number) => x + 20;
        console.log("call unHoisted after assignment:", unHoisted(3));

        console.log("Hoisting demo finished in console.");
    }, []);

    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold">Hoisting Demo</h3>
            <p className="mt-2">
                Open the browser console to see the hoisting behavior of <code>var</code>,{" "}
                <code>let</code>, <code>const</code>, and function declarations.
            </p>
            <ul className="list-disc pl-6 mt-2">
                <li><b>Function declarations</b> are hoisted (can be called before they appear).</li>
                <li><b>var</b> is hoisted but initialized as <code>undefined</code>.</li>
                <li><b>let</b> and <b>const</b> exist in a “temporal dead zone” until declared.</li>
                <li><b>Function expressions</b> (arrow functions) are not hoisted.</li>
            </ul>
        </div>
    );
}
