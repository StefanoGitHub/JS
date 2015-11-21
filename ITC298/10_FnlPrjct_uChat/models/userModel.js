/**
 * Created by Stefano on 11/20/15.
 */
//userModel.js

var Backbone = require("backbone");
var db = require("../db");

module.exports = Backbone.Model.extend({

    constructor: function(socket) {
        this.socket = socket;
        this.auth = false;
        //socket.on("userConnection", this.login(userData));
        //socket.on("disconnect", this.cleanUp.bind(this));
    },

    login: function(event) {
        var self = this;
        db.checkSession(event.username, event.session, function(err, valid) {
            if (!valid) return self.disconnect();
            //otherwise...
            //store our credentials
            self.auth = {
                user: event.username,
                session: event.session
            }
            //join the chat
            self.registerChats();
        });
    },

    registerChats: function() {
        this.socket.on("chat message", function() {
            //handle chat messages, probably by dispatching events for the other users
        });
    },

    cleanUp: function() {
        if (this.auth) { //we have a session, so kill it
            db.deleteSession(this.auth.user, this.auth.session);
        }
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
