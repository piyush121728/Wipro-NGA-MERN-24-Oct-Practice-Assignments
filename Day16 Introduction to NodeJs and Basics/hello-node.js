// Challenge 1 solution
console.log("Node.js version:", process.version);
console.log("Current file name:", __filename);
console.log("Current directory:", __dirname);

const welcome = () => {
    const now = new Date();
    console.log(`[${now.toLocaleTimeString()}] Welcome to Node.js!`);
};

const intervalId = setInterval(welcome, 3000);

// Bonus: stop after 10 seconds
setTimeout(() => {
    clearInterval(intervalId);
    console.log("Stopped welcome messages after 10 seconds.");
}, 10000);
