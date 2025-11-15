const fs = require('fs').promises;

console.log('Starting promise chain...');

fs.readFile('input.txt', 'utf8')
    .then((data) => {
        // return the write Promise so we can chain
        return fs.writeFile('output.txt', data);
    })
    .then(() => {
        console.log('File copied successfully!');
    })
    .catch((err) => {
        console.error('Error during file copy (promises):', err);
    });
