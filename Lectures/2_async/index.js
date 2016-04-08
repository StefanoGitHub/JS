//index.js
var wait = require('./wait.js');

//console.log('ready');
var fib = [0, 1, 1, 2, 3, 5, 8, 13];
var output = [];


/*
wait('info', function(err, data) {
    console.log(data);
});

//sync loop, not working
fib.forEach(function(item) {
    //output.push(item * 2);
    wait(item, function(err, data) {
        //output.push(item * 2);
        output.push(data * 2);
    })
});
console.log(output); //output empty
*/


//async loop
var async = require('async');

//async.each(arr, iterator(data, callback(err, data){...}){...}, [callbackMain(err){...}] );
/*******************************************************
async.each(fib, function(item, callback){
    console.log('processing element: ' + item);
    output.push(item * 2);
    callback(); //what is this??
}, function(err){
    if (err) {
        console.log('Error');
    } else {
        wait(output, function(err, data){
            console.log(data);
        })
    }   
});
*******************************************************/

/*
//each example
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
    }
    else {
        console.log('Done: ', output); //the order in the array is NOT guaranteed
    }   
});
*/

/*
//map example
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
*/



async.waterfall([
    function(callback) {
        async.map(fib, function(item, callback){
            wait(item, function(err, data) {
                console.log('multiplying element: ' + data);
                callback(null, data *= 2);
            });
        }, function(err, results){
            if (err) {
                callback(err);
            } else {
                callback(null, results);
            }
        });
    },
    function(prevResults, callback) {
        async.map(fib, function(item, callback){
            wait(item, function(err, data) {
                console.log('adding to element: ' + data);
                callback(null, data + 1);
            });
        }, function(err, results){
            if (err) {
                callback(err);
            } else {
                callback(null, results);
            }
        });
    }
    ], function(err, finalResults) {
        if (err) {
            console.log('Error');
        } else {
            console.log('Done: ', finalResults)
        }   
});


