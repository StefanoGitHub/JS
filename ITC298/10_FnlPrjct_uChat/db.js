/**
 * Created by Stefano on 11/08/15.
 */
//db.js

var sqlite = require("sqlite3");

var database = {

    connection: null,

    init: function(dbReady) {
        var db = new sqlite.Database("uChat.db");
        var INSERT = db.prepare("INSERT INTO t_users VALUES ($username, $pwd, $email);");
        //var DELETE = db.prepare("DELETE FROM $table;");
        var DELETE = db.prepare("DELETE FROM t_users;");

        //create/connect the db
        database.connection = db;

        db.run("CREATE TABLE IF NOT EXISTS t_sessions (username, sessionID);");
        //create the table

        db.run("CREATE TABLE IF NOT EXISTS t_users (username, pwd, email);", function() {
            //now the table is created

            //clean the table
            DELETE.run({ $table: "t_users" }, function() {
                //then, insert some data
                INSERT.run({
                    $username: "stefano",
                    $pwd: 123,
                    $email: "my@email.me"
                }, function () {
                    console.log("inserted");

                    // call the callback (which will start the server)
                    dbReady();
                });
            });

        });
    }
};


module.exports = database;