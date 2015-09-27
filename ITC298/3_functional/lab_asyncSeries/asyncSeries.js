//asyncSeries.js

//loop through the tasks recursively
var asyncSeriesRecursive = function (tasks, done, currentTaskIndex, results) {
    //check if the current index in the tasks array exists
    if (currentTaskIndex < tasks.length) {
        //call the correspondent task
        tasks[currentTaskIndex](function (err, currentResult) {
            //once the callback is called check err
            if (err) {
                //if error call done with err
                done(err);
            }

            //load the result of the task to the results array
            results.push(currentResult);
            //call the next task, passing the results array
            asyncSeriesRecursive(tasks, done, currentTaskIndex + 1, results);

            //if the current task is actually the last one, and done exists,
            //call done (the callback of the asyncSeries function)
            if (currentTaskIndex == tasks.length - 1 && done) {
                done(null, results);
            }
        });
    }
};


var asyncSeries = function(tasks, done) {
    var startTaskIndex = 0;
    var results = [];
    //start a recursive loop from the first element (index = 0) and with an empty results array
    asyncSeriesRecursive(tasks, done, startTaskIndex, results);
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
    }, console.log.bind(console, 3) //here the callback is never called
    //function(callback) {
    //    console.log(3);
    //    callback();
    //}
], function(err) {
    console.log("This should not run unless there are errors."); //this message will always be logged
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