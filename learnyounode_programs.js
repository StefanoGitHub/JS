/*********************
EXERCISE 1
Write a program that prints the text "HELLO WORLD" to the console (stdout).
*********************/
console.log("HELLO WORLD");

/*********************
EXERCISE 2

*********************/
var array = process.argv;
var sum = 0;
for (var i=2; i < array.length; i++) {
    sum += Number(array[i]);
}
console.log(sum);

/*********************
EXERCISE 3
Write a program that uses a single synchronous filesystem operation to read a file and print the number of newlines (\n) it contains to the console (stdout), similar to running cat file | wc -l.
The full path to the file to read will be provided as the first command-line argument. You do not need to make your own test file.
*********************/
//load module from the Node core library
var fs = require('fs');
//get path to the file, provided as the first command-line argument
var buffer = fs.readFileSync(process.argv[0]);
//converts file (buffer obj) to strings
var strBuffer = buffer.toString();
//return the number of \n (lines) in the file (the last does not have a newline character at the end of the last line)
console.log(strBuffer.split().length-1);

/*********************
EXERCISE 4
Write a program that uses a single asynchronous filesystem operation to read a file and print the number of newlines it contains to the console (stdout), similar to running cat file | wc -l.
The full path to the file to read will be provided as the first command-line argument.
*********************/
var fs = require('fs');
//get path to the file, provided as the first command-line argument
fs.readFile(process.argv[0], function(err, data) {
    if (err) throw err;
    console.log(data.split().length-1);
});

!!!!!!!!!!! NOT WORKING !!!!!!!!!!!!!!!

/*********************
EXERCISE 5
Create a program that prints a list of files in a given directory, filtered by the extension of the files. You will be provided a directory name as the first argument to your program (e.g. '/path/to/dir/') and a file extension to filter by as the second argument.
For example, if you get 'txt' as the second argument then you will need to filter the list to only files that end with .txt. Note that the second argument will not come prefixed with a '.'.
The list of files should be printed to the console, one file per line. You must use asynchronous I/O.
*********************/
var fs = require('fs');
var path = process.argv[0];
var ext = process.argv[1];

//The callback gets two arguments (err, files) where files is an array of the names of the files in the directory excluding '.' and '..'
fs.readdir(path, function(err, files) {
    if (err) {
        throw err;
    } else {
        var match = [];
        files.forEach(function(file, i) {
            if (!file.search('.'+ext) < 0){
                match.push(file);
            }  
        });
        console.log(match, ext, "\n"+path);

    }
});

!!!!!!!!!!! NOT WORKING !!!!!!!!!!!!!!!


/*********************
EXERCISE 6
*********************/

/*********************
EXERCISE 7
*********************/

/*********************
EXERCISE 8
*********************/



