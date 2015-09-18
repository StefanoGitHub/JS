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
    }
    console.log(data);
    getUrl(urlB, function callback (error, data) {
        if (error) {
            console.error(error);
        }
        console.log(data);
        getUrl(urlC, function callback (error, data) {
            if (error) {
                console.error(error);
            }
            console.log(data);
        });
    });
});


/**********************
LearnYouNode Solution
***********************

var http = require('http')
var bl = require('bl')
var results = []
var count = 0

function printResults () {
  for (var i = 0; i < 3; i++)
    console.log(results[i])
}

function httpGet (index) {
  http.get(process.argv[2 + index], function (response) {
    response.pipe(bl(function (err, data) {
      if (err)
        return console.error(err)

      results[index] = data.toString()
      count++

      if (count == 3)
        printResults()
    }))
  })
}

for (var i = 0; i < 3; i++)
  httpGet(i)

*/