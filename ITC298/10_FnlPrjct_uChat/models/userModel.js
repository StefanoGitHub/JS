/**
 * Created by Stefano on 11/20/15.
 */
//userModel.js

var Backbone = require("backbone");
var db = require("../db");

module.exports = Backbone.Model.extend({

    constructor: function(socket) {
        this.socket = socket;
        //socket.on("userConnection", this.login.bind(this));
        //socket.on("disconnect", this.cleanUp.bind(this));
    },

    verify: function(userData, done) {
        var self = this;
        console.log('userData in verify:', userData);
        db.getSession(userData.username, function(err, fromDB) {
            if (err) { console.error(err); }
            var authenticated = false;
            if (fromDB || fromDB.sessionID == userData.sessionID) {
                authenticated = true;
                self.username = userData.username;
                self.sessionID = userData.sessionID;
                self.identity = userData.identity;
                self.socket.on('chatMessage', function(msg) {
                    self.socket.emit('chatMessage', msg);
                    //console.log('message: ' + msg);
                });

            }
            //console.log('self:', self);
            done(err, authenticated);
        });

    },

    disc: function (socket) {
        //var self = this;
            //console.log(socket.username, ' disconnected');
        //delete session from DB
        //db.deleteSession(socket.username, function (err) {
            //if (err) { console.error(err); }
            //inform other users
            socket.emit('chatMessage', socket.username + ' left the conversation', function () {
                //emit event which redirects the client to login page
                socket.emit('userDisconnection');
                //disconnect the user socket
                socket.disconnect();
            });
            //console.log(socket.username, ' disconnected');
        //});
    }

});

/*
    defaults: {
        userName: '',
        pwd: '',
        sessionID: '',
        chat_history: null,
        newMessages: '',
        socket: null
    },

    connect: function(socket, done) {
        this.set('socket', socket);
        done();
    },

    save_chat: function (userName, messages) {
        //here the code to update the history of the chat
        db.connection.getChatHistory(userName, function (err, userName, historyFromDB) {
            //console.log(chat_history);
            var newChatHistory = historyFromDB + messages;
            db.connection.saveChatHistory(userName, newChatHistory);
        });
    }

});
*/
