

var chalk = require("chalk");
var coloredText = chalk.bgBlue.white("White on blue\n");
coloredText += chalk.bgRed.black("Black on red");
console.log(coloredText);