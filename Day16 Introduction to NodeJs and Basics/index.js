// Challenge 2: prints a stylized colored banner using figlet + chalk

const figlet = require("figlet");
const chalk = require("chalk");

figlet.text("Welcome to Node.js", { horizontalLayout: 'default' }, (err, data) => {
    if (err) {
        console.error("Figlet error:", err);
        return;
    }
    // colored banner
    console.log(chalk.cyanBright(data));
    console.log(chalk.yellowBright("→ A simple Node.js CLI banner using figlet + chalk"));
});
