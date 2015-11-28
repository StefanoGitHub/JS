/**
 * Created by Stefano on 11/20/15.
 */
//userModel.js

var Backbone = require("backbone");
var db = require("../db");

module.exports = Backbone.Model.extend({

    initialize: function(socket) {
        //associate the socket to the user
        this.socket = socket;
        //var self = this;
        ////registering userDisconnection event
        //socket.on('logout', function(){
        //    this.logout(socket);
        //    //console.log(user.username, ' disconnected');
        //});

    },

    verify: function(userData, done) {
        var self = this;
        //verify the user (on the server)
        db.getSession(userData.username, function(err, fromDB) {
            if (err) { console.error(err); }
            var authenticated = false;
            if (fromDB && fromDB.sessionID == userData.sessionID) {
                authenticated = true;
                //set user's properties
                self.username = userData.username;
                self.sessionID = userData.sessionID;
                self.authenticated = 'authenticated';
                //register for chatMessage event
                self.socket.on('chatMessage', function(msg) {
                    //trigger a chatMessage event that will be caught by the room
                    self.trigger('chatMessage', msg);
                    //console.log('message: ' + msg);
                });
            }
            //return result
            done(err, authenticated);
        });

    },

    logout: function (socket) {
        var self = this;
        //console.log(socket.username, ' disconnected');
        //delete session from DB
        db.deleteSession (self.username, function () {
            //inform other users
            socket.emit('chatMessage', self.socket.username + ' left the conversation');
            //emit event that will delete the user from the room collection
            self.trigger('logout', self);
            console.log(self.username, ' disconnected');
            //disconnect the user socket
            socket.disconnect();
        });
    },

});

/*
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
