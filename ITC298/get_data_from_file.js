var fs = require("fs");

//create/overwrite file
fs.writeFile("number.txt", '3', function(err) {
    console.log("File created");
});

/*
fs.readFile("number.txt", "utf8", function(err, file) {
    //use an early return to quit on errors
    if (err) return console.log("Couldn't read file!");
    //otherwise, add one and write the file
    var added = (file * 2) + 2;
    fs.writeFile("number.txt", added, function(err) {
        //on error, let the user know
        if (err) return console.log("Couldn't write to the file!");
        //otherwise, log success
        console.log("Wrote file: ", added);
    });
});
*/

/*--------------------------
alternative less convoluted 
--------------------------*/

var onRead = function(err, data) {
    if (err) return console.log("Couldn't read file");
    added = (data * 2) + 1;
    fs.writeFile("number.txt", added, onWrite(err, added));
};

var onWrite = function(err, added) {
    if (err) return console.log("Couldn't write file");
    console.log("Wrote file: ", added);
}

fs.readFile("number.txt", "utf8", onRead);
