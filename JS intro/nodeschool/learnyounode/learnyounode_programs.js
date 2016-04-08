/*********************
EXERCISE 1
Write a program that prints the text "HELLO WORLD" to the console (stdout).
*********************/
console.log("HELLO WORLD");

/*********************
EXERCISE 2
Write a program that accepts one or more numbers as command-line arguments and prints the sum of those numbers to the console (stdout).
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
var buffer = fs.readFileSync(process.argv[2]);
//converts file (buffer obj) to strings
var strBuffer = buffer.toString();
//return the number of \n (lines) in the file (the last does not have a newline character at the end of the last line)
console.log(strBuffer.split("\n").length-1);

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

/*********************
EXERCISE 5
Create a program that prints a list of files in a given directory, filtered by the extension of the files. You will be provided a directory name as the first argument to your program (e.g. '/path/to/dir/') and a file extension to filter by as the second argument.
For example, if you get 'txt' as the second argument then you will need to filter the list to only files that end with .txt. Note that the second argument will not come prefixed with a '.'.
The list of files should be printed to the console, one file per line. You must use asynchronous I/O.
*********************/
var fs = require('fs');
var path = process.argv[2];
var ext = process.argv[3];

fs.readdir(path, function(err, files) {
    if (err) {
        throw err;
    } else {
        var match = files.filter(function(file) {
            var split = file.split(".");
            return split.length > 1 && split.pop() == ext;
        });
        //console.log(match, ext, "\n"+path);
        console.log(match.join("\n"));
    }
});


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


/*********************
EXERCISE 7
Write a program that performs an HTTP GET request to a URL provided to you as the first command-line argument. Write the String contents of each "data" event from the response to a new line on the console (stdout).
*********************/
var http = require('http');
var url = process.argv[2];

http.get(url, function callback (response) { 
    response.setEncoding("utf8");
    response.on('data', function (res){
        console.log(res);
    });
    response.on('error', function (error){
        //process.stderr.write(error + '\n');
        console.error(error);
    });
});

/*********************
EXERCISE 8
Write a program that performs an HTTP GET request to a URL provided to you as the first command-line argument. Collect all data from the server (not just the first "data" event) and then write two lines to the console (stdout). The first line you write should just be an integer representing the number of characters received from the server. The second line should contain the complete String of characters sent by the server.
*********************/
var http = require('http');
var url = process.argv[2];

http.get(url, function callback (response) { 
                var data = [];
                response.on('data', function (res){
                                        data.push(res);
                                    });
                response.on('end', function (){
                                        var string = data.join('');
                                        console.log(string.length)
                                        console.log(string);
                                    });
                response.on('error', function (error){
                                        process.stderr.write(error + '\n');
                                    });
            }
);

/*********************
EXERCISE 9
You will be provided with three URLs as the first three command-line arguments.
You must collect the complete content provided by each of the URLs and print it to the console (stdout), one line per URL. You must print them out in the same order as the URLs are provided to you as command-line arguments.
*********************/
var http = require('http');
var urlA = process.argv[2];
var urlB = process.argv[3];
var urlC = process.argv[4];

var getUrl = function (url, callback) {
    http.get(url, function (response) { 
        var data = [];
        response.setEncoding("utf8");
        response.on('data', function (res){
            data.push(res);
        });
        response.on('end', function (){
            return callback(null, data.join(''));
        });
        response.on('error', function (error){
            return callback(error);
        });
    })
};

getUrl(urlA, function callback (error, data) {
    if (error) {
        console.error(error);
        //process.stderr.write(error);
    }
    console.log(data);
    //process.stdout.write(data + '\n');
    getUrl(urlB, function callback (error, data) {
        if (error) {
            console.error(error);
            //process.stderr.write(error);
        }
        console.log(data);
        //process.stdout.write(data + '\n');
        getUrl(urlC, function callback (error, data) {
            if (error) {
                console.error(error);
                //process.stderr.write(error);
            }
            console.log(data);
            //process.stdout.write(data + '\n');
        });
    });
});

/*********************
EXERCISE 10
Write a TCP time server!
Your server should listen to TCP connections on the port provided by the first argument to your program. For each connection you must write the current date & 24 hour time in the format:    "YYYY-MM-DD hh:mm"
followed by a newline character. Month, day, hour and minute must be zero-filled to 2 integers. For example:    "2013-07-06 17:42"
*********************/
var net = require('net')
var port = process.argv[2];
var date = new Date();

var server = net.createServer(function callback (socket) {

    var formattedMonth = (date.getMonth() > 9) ? date.getMonth() + 1 : ('0' + (date.getMonth() + 1));
    var formattedDay = (date.getDate() > 9) ? date.getDate() : ('0' + date.getDate());
    var formattedHour = (date.getHours() > 9) ? date.getHours() : ('0' + date.getHours());
    var formttedMinute = (date.getMinutes() > 9) ? date.getMinutes() : ('0' + date.getMinutes());

    var formattedDate = date.getFullYear() + '-' +
        formattedMonth + '-' +
        formattedDay + ' ' +
        formattedHour + ':' +
        formttedMinute + '\n';

    socket.end(formattedDate)    
});

server.listen(port)

/*********************
EXERCISE 11
Write an HTTP server that serves the same text file for each request it receives.
Your server should listen on the port provided by the first argument to your program.
You will be provided with the location of the file to serve as the second command-line argument. You must use the fs.createReadStream() method to stream the file contents to the response.
*********************/
var http = require('http');
var fs = require('fs');
var port = process.argv[2];
var path = process.argv[3];

var server = http.createServer(function callback (request, response) {
    fs.createReadStream(path).pipe(response)
});

server.listen(port);

/*********************
EXERCISE 12
Write an HTTP server that receives only POST requests and converts incoming POST body characters to upper-case and returns it to the client.
Your server should listen on the port provided by the first argument to your program.
*********************/
var http = require('http');
var map = require('through2-map');
var port = process.argv[2];

var server = http.createServer(function callback (request, response) {
    if (request.method == 'POST') {
        request.pipe(map(function (chunk) {
            return chunk.toString().toUpperCase();
        })).pipe(response)
    }
});

server.listen(port);

/*********************
EXERCISE 13
Write an HTTP server that serves JSON data when it receives a GET request to the path '/api/parsetime'. Expect the request to contain a query string with a key 'iso' and an ISO-format time as the value.
For example:
  /api/parsetime?iso=2013-08-10T12:10:15.474Z
The JSON response should contain only 'hour', 'minute' and 'second' properties. For example:
    {
      "hour": 14,
      "minute": 23,
      "second": 15
    }
Add second endpoint for the path '/api/unixtime' which accepts the same query string but returns UNIX epoch time in milliseconds (the number of milliseconds since 1 Jan 1970 00:00:00 UTC) under the property 'unixtime'. For example:
    { "unixtime": 1376136615474 }
Your server should listen on the port provided by the first argument to your program.
*********************/
var http = require('http');
var url = require('url');
var port = Number(process.argv[2]);

var server = http.createServer(function callback (request, response) {
    var urlObj = url.parse(request.url, true);
    var time = new Date(urlObj.query.iso) 
    var result = {};

    if (request.method == 'GET' && urlObj.pathname == '/api/parsetime') {
        result = {
            hour : time.getHours(),
            minute : time.getMinutes(),
            second : time.getSeconds()
        };
    }
    if (request.method == 'GET' && urlObj.pathname == '/api/unixtime') {
        result = {
            unixtime : time.getTime()
        };
    }

    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(result));
});

server.listen(port);

