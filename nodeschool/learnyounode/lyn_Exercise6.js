/*********************
EXERCISE 6
Create a program that prints a list of files in a given directory, filtered by the extension of the files. The first argument is the directory name and the second argument is the extension filter. Print the list of files (one file per line) to the console. You must use asynchronous I/O.

In this exercise, the data will be your filtered list of files, as an Array. If you receive an error, e.g. from your call to  fs.readdir(), the callback must be called with the error, and only the error, as the first argument.

You must not print directly to the console from your module file, only from your original program.

In the case of an error bubbling up to your original program file, simply check for it and print an informative message to the console.

These four things are the contract that your module must follow.
  * Export a single function that takes exactly the arguments described.
  * Call the callback exactly once with an error or some data as described.
  * Don't change anything else, like global variables or stdout.
  * Handle all the errors that may occur and pass them to the callback.

*********************/
//dir_filter.js
var fs = require('fs')

module.exports = function (path, ext, callback) {

    fs.readdir(path, function(err, files) {
        if (err) {
            return callback(err);
        } else {
            var matchFiles = files.filter(function(file) {
                var split = file.split(".");
                return split.length > 1 && split.pop() == ext;
            });
            return callback(err, matchFiles);
        }
    });

};

//program.js
var dir = require('./dir_filter.js')

var path = process.argv[2];
var ext = process.argv[3];

dir(path, ext, function callback(err, files) {
    if (err) {
        console.log('Error: ', err);
    }
    console.log(files.join("\n"));
});