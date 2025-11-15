const fs = require('fs').promises;

async function copyFileWithDelay() {
    try {
        console.log('Starting async/await copy...');

        const data = await fs.readFile('input.txt', 'utf8');

        // Bonus: simulate slow operation
        await new Promise((res) => setTimeout(res, 1000)); // 1 second

        await fs.writeFile('output_async.txt', data);

        console.log('File copied successfully (async/await)!');
    } catch (err) {
        console.error('Error during async/await file copy:', err);
    }
}

copyFileWithDelay();
