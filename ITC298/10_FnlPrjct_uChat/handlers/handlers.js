/**
 * Created by Stefano on 11/13/15.
 */

var db = require("../db");
var async = require('async');

//var PWD = db.connection.prepare("SELECT pwd FROM t_users WHERE username = $username;");

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
                db.getSession({
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
                        reply.view("chat.html", { pageTitle: "uChat", username: req.state.username });
                    }
                });
                break;

        }
    },

    signin: function (req, reply) {
        var newUserName = req.payload.username;
        var pwd = req.payload.pwd;
        var email = req.payload.email;

        if (pwd && email && newUserName) {

            var ID = String(Date.now());
            reply.state("username", newUserName);
            reply.state("sessionID", ID);

            async.waterfall([
                    /****************** need to implement check if user is already in db *******/
                        function (done) {
                        db.insertUser({
                            $username: newUserName,
                            $pwd: pwd,
                            $email: email
                        }, function () {
                            //console.log("new user inserted");
                            done();
                        });
                    },
                    function (done) {
                        db.insertSession({
                            $username: newUserName,
                            $sessionID: ID
                        }, function () {
                            //console.log("session inserted");
                            done();
                        });
                    }],
                function (err) {
                    if (err) {
                        console.log('Error');
                    }
                    reply.view("chat.html", {pageTitle: "uChat", username: newUserName});
                });
        } else {
            reply.redirect("/signin");
        }
    },

    login: function (req, reply) {
        var username = req.payload.username;
        var pwd = req.payload.pwd;

        if (pwd && username) {
            db.getPassword({
                $username: username
            }, function (err, dataFromDB) {
                if (err) {
                    throw err;
                }
                //console.log('username:', username);
                //console.log('pwd:', dataFromDB);

                if (!dataFromDB) {
                    reply.redirect("/signin");
                } else {
                    if (pwd == dataFromDB.pwd) {
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
                                reply.view("chat.html", {pageTitle: "uChat", username: username});
                            });
                            //return reply.redirect("/uChat");
                        })
                    } else {
                        reply.redirect("/login");
                    }
                }
            });
        } else {
            reply.redirect("/login");
        }
    }

};


