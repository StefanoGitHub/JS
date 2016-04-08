//db.js

var sqlite = require("sqlite3");
var async = require('async');
var db = new sqlite.Database("uChat.db");

module.exports = {

    connection: null,

    init: function(dbReady) {
        //initialize the db
        this.connection = db;

        async.waterfall([
            function(done) {
                db.run("CREATE TABLE IF NOT EXISTS t_sessions (username, sessionID);", function() {
                    done();
                });
            },
            function(done) {
                db.run("CREATE TABLE IF NOT EXISTS t_users (username, pwd, email);", function() {
                    done();
                });
            },
            function(done) {
                db.run("CREATE TABLE IF NOT EXISTS t_messages (username, message, timestamp);", function() {
                    done();
                });
            }
        /************************* END FOR TEST **********************************/
        ], function(err) {
            if (err) { console.error(err); }
            dbReady();
        });

    },

    /****************** SESSION *******************/
    deleteSession: function(username, done) {
        done = done || function(){};
        db.run("DELETE FROM t_sessions WHERE username = $username;", { $username: username }, function (err) {
            if (err) { console.error(err); }
            done();
        });
    },
    getSession : function(username, done) {
        done = done || function(){}; //err, dataFromDB
        db.get("SELECT * FROM t_sessions WHERE username = $username", { $username: username }, function (err, dataFromDB) {
            if (err) { console.error(err); }
            done(err, dataFromDB);
        });
    },
    insertSession: function(sessionData, done) {
        done = done || function(){};
        db.run("INSERT INTO t_sessions VALUES ($username, $sessionID);", sessionData, function (err) {
            if (err) { console.error(err); }
            done();
        });
    },

    /****************** USER *******************/
    getUser : function(username, done) {
        done = done || function(){};
        db.get("SELECT * FROM t_users WHERE username = $username", { $username: username }, function (err, dataFromDB) {
            if (err) { console.error(err); }
            done(err, dataFromDB);
        });
    },
    insertUser: function(userData, done) {
        done = done || function(){};
        db.run("INSERT INTO t_users VALUES ($username, $pwd, $email);", userData, function (err) {
            if (err) { console.error(err); }
            done();
        });
    },

    /****************** CHAT MESSAGES *******************/

    saveMessage: function(chatMessage, done) {
        done = done || function(){};
        db.run("INSERT INTO t_messages VALUES ($username, $message, $timestamp);", chatMessage, function (err) {
            if (err) { console.error(err); }
            done();
        });
    },
    getMessages : function(done) {
        done = done || function(){};
        db.all("SELECT * FROM t_messages ORDER BY timestamp", function (err, dataFromDB) {
            if (err) { console.error(err); }
            done(err, dataFromDB);
        });
    }

};
