// Challenge 3: reads process.argv and greets user with current date/time.
// Usage: node greet.js John

const moment = (() => {
    try {
        return require("moment");
    } catch (e) {
        return null;
    }
})();

const args = process.argv.slice(2);
const name = args[0] || "Friend";

let dateTimeStr;
if (moment) {
    // Format similar to example: "Fri Nov 7 2025, 10:45 AM"
    dateTimeStr = moment().format("ddd MMM D YYYY, h:mm A");
} else {
    // Fallback using built-in API if moment not installed
    const now = new Date();
    dateTimeStr = now.toLocaleString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

console.log(`Hello, ${name}! Today is ${dateTimeStr}.`);
