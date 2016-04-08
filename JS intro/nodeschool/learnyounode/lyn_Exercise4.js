/*********************
EXERCISE 4
Write a program that uses a single asynchronous filesystem operation to read a file and print the number of newlines it contains to the console (stdout), similar to running cat file | wc -l.
The full path to the file to read will be provided as the first command-line argument.
*********************/
var fs = require('fs');
//get path to the file, provided as the first command-line argument
fs.readFile(process.argv[2], "utf-8", function(err, data) {
    if (err) throw err;
    console.log(data.split("\n").length - 1);
});