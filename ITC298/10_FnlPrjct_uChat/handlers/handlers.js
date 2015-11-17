/**
 * Created by Stefano on 11/13/15.
 */

var db = require("../db");
var async = require('async');

module.exports = {

    checkSession: function (req, reply) {
        var page = req.params.page;
        var identity = req.state.identity;

        switch (page) {

            case "login":
                if (identity == 'authenticated') {
                    reply.redirect("/uChat");
                } else {
                    reply.view("login.html", {
                        pageTitle: "uChat log-in",
                        notification: ''
                    });
                }
                break;

            case "signin":
                reply.view("signin.html", {
                    pageTitle: "uChat sign-in",
                    notification: ''
                });
                break;

            case "uChat":
                if (identity == 'authenticated') {
                    var userName = req.state.username;
                    var sessionID = req.state.sessionID;

                    reply.view("chat.html", {
                        pageTitle: "uChat",
                        username: userName,
                        sessionID: sessionID
                    });
                } else {
                    reply.redirect("/login");
                    //db.getSession({
                    //    $username: userName
                    //}, function (err, result) {
                    //    if (err) {
                    //        console.log('Error');
                    //    }
                    //    //console.log("result: ", result);
                    //    if (!result || result.sessionID != sessionID) {
                    //        //console.log("err: ", err);
                    //        reply.redirect("/login");
                    //    } else {
                    //        reply.view("chat.html", {
                    //            pageTitle: "uChat",
                    //            username: userName,
                    //            sessionID: sessionID
                    //        });
                    //    }
                    //});
                }
                break;

            default:
                reply.redirect("/login");
                break;

        }
    },

    signin: function (req, reply) {
        //pwd & email & username are required in the form, no need to check if not null
        var newUserName = req.payload.username;
        var pwd = req.payload.pwd;
        var email = req.payload.email;

        //verify if user already exists
        db.getUser({
                $username: newUserName
            }, function (err, dataFromDB) {
            if (err) {
                throw err;
            }
            if (!dataFromDB) {
                //create sessionID
                var sessionID = String(Date.now());
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
                                $sessionID: sessionID
                            }, function () {
                                //console.log("session inserted");
                                done();
                            });
                        }],
                    function (err) {
                        if (err) {
                            console.log('Error');
                        }
                        //set cookies
                        reply.state("username", newUserName);
                        reply.state("sessionID", sessionID);
                        reply.state("identity", 'authenticated');

                        //reply.view("chat.html", {
                        //    pageTitle: "uChat",
                        //    username: newUserName,
                        //    sessionID: sessionID
                        //});
                        reply.redirect("/uChat");
                    });
            } else {
                //if user already in DB notify
                reply.view("signin.html", {
                    pageTitle: "uChat sign-in",
                    notification: 'User already exists, just log-in!'
                });
            }
        });
    },

    login: function (req, reply) {
        //pwd & username are required in the form, no need to check if not null
        var username = req.payload.username;
        var pwd = req.payload.pwd;
        //console.log('login username:', username);

        console.log('request.state[username]', req.state[username]);

        //if authenticated redirect
        var identity = req.state.identity;
        if (identity == 'authenticated') {
            reply.redirect("/uChat");
        } else {
            db.getUser({
                $username: username
            }, function (err, dataFromDB) {
                if (err) {
                    throw err;
                }
                //console.log('username:', username);
                //console.log('pwd:', dataFromDB);

                if (!dataFromDB) {
                    //reply.redirect("/signin");
                    reply.view("login.html", {
                        pageTitle: "uChat log-in",
                        notification: 'User not registered, please Sign-in.'
                    });
                } else {
                    if (pwd == dataFromDB.pwd) {
                        //create sessionID
                        var sessionID = String(Date.now());
                        //clear previous session data (the whole row where the data is stored)
                        db.deleteSession({
                            $username: username
                        }, function () {
                            //save the new session ID
                            db.insertSession({
                                $username: username,
                                $sessionID: sessionID
                            }, function () {
                                //reply.view("chat.html", {
                                //    pageTitle: "uChat",
                                //    username: username,
                                //    sessionID: sessionID
                                //});
                                //set/update cookies
                                reply.state("username", username);
                                reply.state("sessionID", sessionID);
                                reply.state("identity", 'authenticated');
                                reply.redirect("/uChat");
                            });
                        })
                    } else {
                        //reply.redirect("/login");
                        reply.view("login.html", {
                            pageTitle: "uChat log-in",
                            notification: 'Username or Password not correct'
                        });
                    }
                }
            });
        }
    }

};


