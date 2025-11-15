const fs = require('fs');

console.log('Starting read (callbacks)...');

fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Show content (to demonstrate asynchronous completion)
    console.log('File content:\n', data);

    // Bonus: artificial delay before confirmation
    setTimeout(() => {
        console.log('Read operation completed');
    }, 1000); // 1 second delay
});

// This log demonstrates that fs.readFile is non-blocking
console.log('This line runs before read callback finishes (non-blocking).');
