/*********************
EXERCISE 3
Write a program that uses a single synchronous filesystem operation to read a file and print the number of newlines (\n) it contains to the console (stdout), similar to running cat file | wc -l.
The full path to the file to read will be provided as the first command-line argument. You do not need to make your own test file.
*********************/
//load module from the Node core library
var fs = require('fs');
//get path to the file, provided as the first command-line argument
var buffer = fs.readFileSync(process.argv[2]);
//converts file (buffer obj) to strings
var strBuffer = buffer.toString();
//return the number of \n (lines) in the file (the last does not have a newline character at the end of the last line)
console.log(strBuffer.split("\n").length-1);