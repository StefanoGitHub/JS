/**
 * Created by Stefano on 11/20/15.
 */
//usersCollection.js

var Backbone = require("backbone");
var User = require("./userModel");
var db = require("../db");

module.exports = Backbone.Collection.extend({

    model: User,

    initialize: function() {
        //register for events
        this.on('chatMessage', function(username, msg) {
            this.models.forEach(function(user) {
                //route the event out to all connected User models
                user.socket.emit('chatMessage', username, msg);
            });
        }, this); //sets the `this` value inside the callback

        this.on('updateUsersList', function() {
            var self = this;
            this.models.forEach(function(user) {
                //route the event out to all connected User models
                user.socket.emit('updateUsersList', self.toJSON());
            });
        }, this);

        this.on('joinMessage', function(newUser) {
            var username = newUser.get('username');
            //inform all other users of the joining
            newUser.socket.broadcast.emit('serviceMessage', username, ' joined the conversation');
        }, this);

        this.on('welcomeMessage', function(newUser) {
            //welcome only the joining user
            var username = newUser.get('username');
            newUser.socket.emit('serviceMessage', null, 'Welcome to the conversation ' + username + '!');
        }, this);

        this.on('logout', function(user) {
            var username = user.get('username');
            user.socket.broadcast.emit('serviceMessage', username, 'left the conversation');
        }, this);

    },

    connectUser: function (user) {
        //if the user has been already in the chat, replace him/her
        if (this.findWhere({username: user.get("username")})) {
            this.remove(this.findWhere({username: user.get("username")}));
        }
        //add the user to the collection/room
        this.add(user);
        user.connect();
        this.trigger('updateUsersList');
        db.getMessages(function(err, dataFromDB) {
            if (err) { console.error(err); }
            //load last 10 messages of the current chat
            user.socket.emit('loadChat', dataFromDB);
            //inform other users
            user.trigger('joinMessage', user);
            //welcome the user
            user.trigger('welcomeMessage', user);
        });
    },

    disconnectUser: function (user) {
        user.disconnect();
        user.trigger('logout', user);
        this.trigger('updateUsersList');
        user.socket.disconnect();
    }

});
