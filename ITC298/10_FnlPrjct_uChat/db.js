/**
 * Created by Stefano on 11/08/15.
 */
//db.js

var sqlite = require("sqlite3");
var async = require('async');
var db = new sqlite.Database("uChat.db");

var database = {

    connection: null,

    init: function(dbReady) {
//        var db = new sqlite.Database("uChat.db");
        //initialize the db
        database.connection = db;

        async.waterfall([
            function(done) {
                db.run("CREATE TABLE IF NOT EXISTS t_sessions (username, sessionID);", function() {
                    console.log("t_sessions created");
                    done();
                });
            },
            function(done) {
                db.run("CREATE TABLE IF NOT EXISTS t_users (username, pwd, email);", function() {
                    console.log("t_users created");
                    done();
                });
            },
            /************************* FOR TEST **********************************/
            function(done) {
                db.run("DELETE FROM t_users;", function() {
                    console.log("users cleaned");
                    done();
                });
            },
            function(done) {
                db.run("DELETE FROM t_sessions;", function() {
                    console.log("sessions cleaned");
                    done();
                });
            }
            //function(done) {
            //    db.run("INSERT INTO t_users VALUES ($username, $pwd, $email);", {
            //        $username: "stefano",
            //        $pwd: 123,
            //        $email: "my@email.me"
            //    }, function() {
            //        console.log("user inserted");
            //        done();
            //    });
            //},
            //function(done) {
            //    db.run("INSERT INTO t_sessions VALUES ($username, $sessionID);", {
            //        $username: "stefano",
            //        $sessionID: "132456"
            //    }, function() {
            //        console.log("session inserted");
            //        done();
            //    });
            //}
        /************************* END FOR TEST **********************************/
        ], function(err) {
            if (err) {
                console.log('Error');
            }
            dbReady();
        });

    },

    deleteSession: function(user, done) {
        console.log('delete session',  user);
        db.run("DELETE FROM t_sessions WHERE username = $username;",{
                $username: user
            }, function () {
                if (done) {
                    console.log('deleted');
                    done();
                }
            console.log('deleted2');
            });
    },

    insertSession: function(sessionData, done) {
        console.log('delete session',  sessionData.$username);
        db.run("INSERT INTO t_sessions VALUES ($username, $sessionID);", sessionData, function () {
            if (done) {
                console.log('new session inserted');
                done();
            }
            console.log('new session insert2');
        });
    },

    insertUser: function(userData, done) {
        console.log('delete session',  userData.$username);
        db.run("INSERT INTO t_users VALUES ($username, $pwd, $email);", userData, function () {
            if (done) {
                console.log('user inserted');
                done();
            }
            console.log('user inserted2');
        });
    }

};

module.exports = database;