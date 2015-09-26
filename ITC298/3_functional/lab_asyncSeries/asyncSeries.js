//asyncSeries.js

//var pause = require('./pause');


var asyncSeries = function(tasks, done) {
    return asyncSeriesRecursive(tasks, done, 0, []);
};

var asyncSeriesRecursive = function (tasks, done, currentTaskIndex, results) {

    if (currentTaskIndex < tasks.length) {
        tasks[currentTaskIndex](function (err, currentResult) {
            if (err) {
                done(err);
            }

            results.push(currentResult);
            asyncSeriesRecursive(tasks, done, currentTaskIndex + 1, results);

            if (currentTaskIndex == tasks.length - 1 && done) {
                done(null, results);
            }
        });
    }
};


asyncSeries([
    function(callback) {
        console.log(1);
        callback();
    }, function(callback) {
        setTimeout(function() {
            console.log(2);
            callback();
        }, 1000);
    }, console.log.bind(console, 3)
], function(err) {
    if (err) {
        console.log("This should not run unless there are errors.");
    }
});
//logout -> 1  2 3


asyncSeries([
    function(callback) {
        var a = 4;
        var b = a - 3;
        callback(null, b);
    }, function(callback) {
        setTimeout(function() {
            var a = 1;
            var b = a + 1;
            callback(null, b);
        }, 1000);
    }, function (callback) {
        var a = 1;
        var b = a + 2;
        callback(null, b);
    }
], function(err, results) {
    if (err) {
        console.log("Errors happened!");
    }
    console.log(results);
});
//logout -> [ 1, 2, 3 ]