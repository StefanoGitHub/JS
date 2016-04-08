//get.js
var request = require('request');
var fs = require("fs");

var pageAddress = ("http://google.com");

/*
request(pageAddress, function (error, response, body) {
    if (error) {
        console.error(error);
    }
    console.log(body);
});
*/

var req = request.get(pageAddress);

/*
req.on("response", function(response) {
    console.log(response);
});
req.on("error", function(error) {
    console.error(error);
});
*/

req.on("end", function(){
    console.log("done!");
});

var output = fs.createWriteStream('download.html');

req.pipe(output);

