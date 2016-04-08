//async_each.js
var wait = require('./wait.js');
var async = require('async');

var fib = [0, 1, 1, 2, 3, 5, 8, 13];
var output = [];

//async each loop
async.each(fib, function(item, callback){
    wait(item, function(err, data) {
        console.log('processing element: ' + item);
        output.push(data * 2);
        callback();    
    });
    //callback(); //why here it doesn't work??...
}, function(err){
    if (err) {
        console.log('Error');
    } else {
        console.log('Done: ', output); //the order in the array is NOT guaranteed
    }   
});
