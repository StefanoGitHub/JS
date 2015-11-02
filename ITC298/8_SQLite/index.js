/**
 * Created by Stefano on 10/30/15.
 */

var sqlite = require("sqlite3");
var db = new sqlite.Database("test.db", function() {
    db.run("CREATE TABLE IF NOT EXISTS t_Users (name, age);");

    db.run("INSERT INTO t_Users VALUES ('Stefano', 31);");
    db.run("INSERT INTO t_Users VALUES ('Thomas', 33);");

    db.get("SELECT * FROM t_Users WHERE age < 32;", function(err, result) {
        if (err) {
            throw err;
        }
        console.log(result);
    });

    db.all("SELECT * FROM t_Users;", function(err, results) {
        if (err) {
            throw err;
        }
        console.log(results);
    });

    var insert = db.prepare("INSERT INTO t_Users VALUES ($name, $age);");
    insert.run({
        $name: "Alice",
        $age: 42
    }, function() {
        console.log("Done!");
    });


});
