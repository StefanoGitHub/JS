/**
 * Created by Stefano on 11/13/15.
 */

var db = require("../db");
var async = require('async');

var PWD = db.connection.prepare("SELECT pwd FROM t_users WHERE username = $username;");

module.exports = {

    checkSession: function (req, reply) {
        var page = req.params.page;
        switch (page) {

            case "login":
                reply.view("login.html", { pageTitle: "uChat log-in" });
                break;

            case "signin":
                reply.view("signin.html", { pageTitle: "uChat sign-in" });
                break;

            default:
                db.connection.get("SELECT * FROM t_sessions WHERE username = $username", {
                    $username: req.state.username
                }, function (err, result) {
                    if (err) {
                        console.log('Error');
                    }
                    //console.log("result: ", result);
                    if (!result || result.sessionID != req.state.sessionID) {
                        //console.log("err: ", err);
                        reply.redirect("/login");
                    } else {
                        reply.view("chat.html", {pageTitle: "uChat", username: req.state.username });
                    }
                });
                break;

        }
    },

    signin: function (req, reply) {
        var ID = String(Date.now());
        var newUserName = req.payload.username;
        reply.state("username", newUserName);
        reply.state("sessionID", ID);
        async.waterfall([
            /****************** need to implement check if user is already in db *******/
                function(done) {
                db.insertUser({
                        $username: newUserName,
                        $pwd: req.payload.pwd,
                        $email: req.payload.email
                    }, function() {
                        console.log("new user inserted");
                        done();
                    });
                },
                function(done) {
                    db.insertSession({
                        $username: newUserName,
                        $sessionID: ID
                    }, function() {
                        console.log("session inserted");
                        done();
                    });
                }],
            function(err) {
                if (err) {
                    console.log('Error');
                }
                reply.view("chat.html", { pageTitle: "uChat", username: newUserName });
            });
    },

    login: function (req, reply) {
        var username = req.payload.username;
        PWD.get({
            $username: username
        }, function (err, dataFromDB) {
            if (err) {
                throw err;
            }
            console.log(dataFromDB);

            if (dataFromDB && req.payload.pwd == dataFromDB.pwd) {
                //var response = reply("Worked!");
                var ID = String(Date.now());
                reply.state("username", username);
                reply.state("sessionID", ID);

                //clear previous session data (the whole row where the data is stored)
                db.deleteSession(username, function () {
                    //save the new session ID
                    db.insertSession({
                        $username: username,
                        $sessionID: ID
                    }, function () {
                        reply.view("chat.html", { pageTitle: "uChat", username: username });
                    });
                    //return reply.redirect("/uChat");
                })
            } else {
                reply.redirect("/login");
            }
        });
    }

};


