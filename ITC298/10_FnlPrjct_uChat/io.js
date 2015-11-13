/**
 * Created by Stefano on 11/12/15.
 */
async.waterfall([
    //multiply asynchronously
    function(callback) {
        async.map(fib, function(item, callback) {
            wait(item, function(err, data) {
                console.log('multiplying element ' + data);
                callback(null, data *= 2);
            });
        }, function(err, results) {
            if (err) {
                callback(err);
            } else {
                callback(null, results);
            }
        });
    },
    function(prevResults, callback) {
        //adding asynchronously
        async.map(prevResults, function(item, callback) {
            wait(item, function(err, data) {
                console.log('adding to element ' + data);
                callback(null, data + 1);
            });
        }, function(err, results) {
            if (err) {
                callback(err);
            } else {
                callback(null, results);
            }
        });
    },
    function(prevResults, callback) {
        //reducing asynchronously
        async.reduce(prevResults, [], function(memo, item, callback) {
            wait(item, function(err, data) {
                var reduced = Number(memo) + Number(data);
                console.log('reducing...' + '[' + reduced + ']');
                callback(null, reduced);
            });
        }, function(err, results) {
            if (err) {
                callback(err);
            } else {
                callback(null, results);
            }
        });
    }
], function(err, finalResult) {
    if (err) {
        console.log('Error');
    } else {
        console.log('Done: ', finalResult)
    }
});
