/**
 * Created by Stefano on 11/08/15.
 */
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
                db.run("CREATE TABLE IF NOT EXISTS t_users (username, pwd, email, chat_history);", function() {
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
        db.run("INSERT INTO t_users VALUES ($username, $pwd, $email, '');", userData, function (err) {
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
    getMessages : function(some, done) {
        done = done || function(){};
        db.all("SELECT * FROM t_users", function (err, dataFromDB) {
            if (err) { console.error(err); }
            done(err, dataFromDB);
        });
    }


    /****************** CHAT HISTORY *******************/

    //deleteChatHistory: function(userName, done) {
    //    //console.log('delete session',  username);
    //    db.run("DELETE FROM t_sessions WHERE username = $username;", {
    //        $username: userName
    //    }, function () {
    //        if (done) {
    //            //console.log('deleted');
    //            done();
    //        }
    //        //console.log('deleted2');
    //    });
    //},
    //getChatHistory: function(username, done) {
    //    done = done || function(){}; //err, historyFromDB
    //    db.get("SELECT chat_history FROM t_users WHERE username = $username", {
    //        $username: username
    //    }, function (err, historyFromDB) {
    //        if (err) { console.error(err); }
    //        console.log('from DB', historyFromDB);
    //        done(err, historyFromDB);
    //    });
    //},
    //
    //saveChatHistory: function(chatData, doneSaving) {
    //    console.log('chatData:', chatData);
    //    async.waterfall([
    //        function(callback) {
    //            database.getChatHistory(chatData.username, function (err, historyFromDB) {
    //                if (err) { console.error(err); }
    //                console.log('history:', historyFromDB);
    //                callback(null, historyFromDB);
    //            });
    //        },
    //        function(historyFromDB, callback) {
    //            if (!historyFromDB) {
    //                historyFromDB = '';
    //            }
    //            var newHistory = historyFromDB + chatData.newMessages;
    //            db.run("UPDATE t_users SET chat_history = $newChatHistory WHERE username = $username", {
    //                $username: chatData.username,
    //                $newChatHistory: newHistory
    //            }, function (err) {
    //                if (err) { console.error(err); }
    //                console.log('chat saved1 (' + newHistory + ')');
    //                callback(null);
    //            });
    //        }
    //    ], function(err) {
    //        if (err) { console.error(err); }
    //        console.log('chat saved 2');
    //        doneSaving();
    //    });
    //
    //}

};
