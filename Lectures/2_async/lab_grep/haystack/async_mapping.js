//async_map.js
var wait = require('./wait.js');
var async = require('async');

var fib = [0, 1, 1, 2, 3, 5, 8, 13];
var output = [];

//async map loop
async.map(fib, function(item, callback){
    wait(item, function(err, data) {
        console.log('processing element: ' + data);
        callback(null, data *= 2);
    });
}, function(err, results){
    if (err) {
        console.log('Error');
    } else {
        console.log('Done: ', results); //the order in the array is guaranteed
    }   
});

