/**
 * Created by Stefano on 11/13/15.
 */

var db = require("../db");
var async = require('async');

module.exports = {

    checkSession: function (req, reply) {
        var page = req.params.page;
        var username = req.state.username || '';
        var sessionID = req.state.sessionID || '';
        var authenticated = false;

        var clearCookies = function () {
            reply.unstate("username");
            reply.unstate("sessionID");
        };

        db.getSession(username, function (err, dataFromDB) {
            if (err) { console.error(err); }
            if (dataFromDB) {
                if (dataFromDB.username == username && dataFromDB.sessionID == sessionID) {
                    authenticated = true;
                }
            }

            switch (page) {

                case "login":
                    if (authenticated) {
                        reply.redirect("/uChat");
                    } else {
                        clearCookies();
                        reply.view("login", {
                            pageTitle: "uChat log-in",
                            notification: ''
                        });
                    }
                    break;

                case "signin":
                    if (authenticated) {
                        reply.redirect("/uChat");
                    } else {
                        reply.view("signin", {
                            pageTitle: "uChat sign-in",
                            notification: ''
                        });
                    }
                    break;

                case "logout":
                    //if (!authenticated) {
                    //clearCookies();
                    //    reply.redirect("/login");
                    //} else {
                        db.deleteSession(username, function () {
                            clearCookies();
                            reply.view("login", {
                                pageTitle: "log-out",
                                notification: 'You successfully <strong>logged out</strong>'
                            });
                        });
                    //}
                    break;

                case "uChat":
                    if (authenticated) {
                        reply.view("chat", {
                            pageTitle: "uChat",
                            username: username,
                            sessionID: sessionID
                        });
                    } else {
                        reply.redirect("/login");
                    }
                    break;

                default:
                    reply.redirect("/login");
                    break;

            }
        });

    },

    signin: function (req, reply) {
        //pwd & email & username are required in the form, no need to check if not null
        var newUserName = req.payload.username;
        var pwd = req.payload.pwd;
        var email = req.payload.email;

        //verify if user already exists
        db.getUser(newUserName, function (err, dataFromDB) {
            if (err) { console.error(err); }
            if (!dataFromDB) {
                //create sessionID
                var sessionID = String(Date.now());
                async.waterfall([
                        function (done) {
                            db.insertUser({
                                $username: newUserName,
                                $pwd: pwd,
                                $email: email
                            }, function (err) {
                                if (err) { console.error(err); }
                                //console.log("new user inserted");
                                done();
                            });
                        },
                        function (done) {
                            db.insertSession({
                                $username: newUserName,
                                $sessionID: sessionID
                            }, function (err) {
                                if (err) { console.error(err); }
                                //console.log("session inserted");
                                done();
                            });
                        }],
                    function (err) {
                        if (err) { console.error(err); }
                        //set cookies
                        reply.state("username", newUserName);
                        reply.state("sessionID", sessionID);
                        reply.redirect("/uChat");
                });
            } else {
                //if user already in DB notify
                reply.view("signin", {
                    pageTitle: "uChat sign-in",
                    notification: 'User <strong>already exists</strong>, just log-in!'
                });
            }
        });
    },

    login: function (req, reply) {
        //if authenticated redirect
        if (req.state.authenticated == 'authenticated') {
            reply.redirect("/uChat");
        } else {
            //pwd & username are required in the form, no need to check if not null
            var username = req.payload.username;
            var pwd = req.payload.pwd;
            //console.log('login username:', username);

            db.getUser(username, function (err, dataFromDB) {
                if (err) { console.error(err); }
                //console.log('username:', username);
                //console.log('pwd:', dataFromDB);
                if (!dataFromDB) {
                    reply.view("login", {
                        pageTitle: "uChat log-in",
                        notification: 'User not registered, please <strong>Sign-in</strong>'
                    });
                } else {
                    if (pwd == dataFromDB.pwd) {
                        //create sessionID
                        var sessionID = String(Date.now());
                        //clear previous session data (the whole row where the data is stored)
                        db.deleteSession(username, function (err) {
                            if (err) { console.error(err); }
                            //save the new session ID
                            db.insertSession({
                                $username: username,
                                $sessionID: sessionID
                            }, function (err) {
                                if (err) { console.error(err); }
                                //set/update cookies
                                reply.state("username", username);
                                reply.state("sessionID", sessionID);
                                reply.redirect("/uChat");
                            });
                        })
                    } else {
                        reply.view("login", {
                            pageTitle: "uChat log-in",
                            notification: 'Username or Password <strong>not correct</strong>'
                        });
                    }
                }
            });
        }
    }

};


