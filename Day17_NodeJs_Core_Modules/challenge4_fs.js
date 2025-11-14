const fs = require('fs').promises;
const path = require('path');

(async () => {
    try {
        // Take CLI input (3rd argument)
        const userInput = process.argv[2];

        if (!userInput) {
            console.log("Please pass input text. Example:");
            console.log("node challenge4_fs.js \"Your feedback here\"");
            return;
        }

        const filePath = path.join(__dirname, 'feedback.txt');

        // Write input from user
        await fs.writeFile(filePath, userInput, 'utf8');
        console.log('Data written successfully.');

        // Read it back
        console.log('Reading file...');
        const content = await fs.readFile(filePath, 'utf8');
        console.log(content);

    } catch (err) {
        console.error('Error:', err);
    }
})();
