/**
 * Created by Stefano on 11/20/15.
 */
//userModel.js

var Backbone = require("backbone");
var db = require("../db");

module.exports = Backbone.Model.extend({

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
                //register for chatMessage event
                self.socket.on('chatMessage', function(msg) {
                    //trigger a chatMessage event that will be caught by the room
                    self.trigger('chatMessage', self.get('username'), msg);
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
            //emit event that will delete the user from the room collection
            self.trigger('logout', self);
            //disconnect the user socket
            socket.disconnect();
        });
    }

});
