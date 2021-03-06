/**
 * Created by Stefano on 11/20/15.
 */
//userModel.js

var Backbone = require("backbone");
var db = require("../db");

module.exports = Backbone.Model.extend({

    defaults: {
        status: 'offline'
    },

    setSocket: function(socket) {
        this.socket = socket;
    },

    verify: function(userData, done) {
        var self = this;
        //verify the user (on the server)
        db.getSession(userData.username, function(err, fromDB) {
            if (err) { console.error(err); }
            var authenticated = false;
            if (fromDB && fromDB.sessionID == userData.sessionID) {
                //set user's properties
                self.set('username', userData.username);
                self.set('sessionID', userData.sessionID);
                authenticated = true;
                //self.connect();
                //register for chatMessage event
                self.socket.on('chatMessage', function(msg) {
                    //trigger a chatMessage event that will be caught by the room
                    self.trigger('chatMessage', self.get('username'), msg);
                });
                self.socket.on('typing', function() {
                    //trigger a chatMessage event that will be caught by the room
                    self.set('status', 'typing...');
                    self.trigger('updateUsersList');
                });
                self.socket.on('stopTyping', function() {
                    //trigger a chatMessage event that will be caught by the room
                    self.set('status', 'online');
                    self.trigger('updateUsersList');
                });

                self.socket.on('disconnect', function() {
                    //trigger a chatMessage event that will be caught by the room
                    self.trigger('disconnect', self);
                });
            }
            //return result
            done(err, authenticated);
        });
    },

    logout: function (socket) {
        var self = this;
        //delete session from DB
        db.deleteSession (self.username, function () {
            //disconnect the user socket
            socket.disconnect();
        });
    },

    disconnect: function () {
        this.set('status', 'offline');
    },
    connect: function () {
        this.set('status', 'online');
    }


});
