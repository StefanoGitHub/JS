/**
 * Created by Stefano on 10/30/15.
 */

var sqlite = require("sqlite3");
var db = new sqlite.Database("serial.db");

var async = require("async");

async.waterfall([
    //multiply asynchronously
    function(cb) {
        db.run("CREATE TABLE IF NOT EXISTS t_Serial (x, y);", cb);
    },
    function(prevResults, cb) {
        db.run("INSERT INTO t_Serial VALUES ($x, $y)", {
            $x: 3,
            $y: 4
        }, cb);
    },
    function(prevResults, cb) {
        db.run("INSERT INTO t_Serial VALUES ($x, $y)", {
            $x: 1, $y: 2
        }, cb);
    },
    function(prevResults, cb) {
        db.all("SELECT * FROM t_Serial;", cb);
    },
    function(prevResults, cb) {
        console.log(prevResults);
        cb();
    }
], function(err, finalResult) {
    if (err) {
        throw err;
    }
    console.log("Done!");
});




//the following approach require too much "indentation"
//
//var db = new sqlite.Database("serial.db", function() {
//    db.run("CREATE TABLE IF NOT EXISTS t_Serial (x, y);", function () {
//        db.run("INSERT INTO t_Serial VALUES ($x, $y)", {
//            $x: 1, $y: 2
//        }, function () {
//            db.all("SELECT * FROM t_Serial;", function (err, results) {
//                if (err) {
//                    throw err;
//                }
//                console.log(results);
//            });
//        });
//    });
//});

