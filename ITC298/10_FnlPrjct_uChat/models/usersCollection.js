/**
 * Created by Stefano on 11/20/15.
 */
//usersCollection.js

var Backbone = require("backbone");
var User = require("./userModel");
var db = require("../db");

module.exports = Backbone.Collection.extend({

    model: User,
    connectedUsers: [],

    initialize: function() {
        //register for events
        this.on('chatMessage', function(username, msg) {
            this.models.forEach(function(user) {
                //route the event out to all connected User models
                user.socket.emit('chatMessage', username, msg);
            });
        }, this); //sets the `this` value inside the callback

        this.on('joinMessage', function(newUser) {
            var username = newUser.get('username');
            newUser.trigger('chatMessage', username, ' joined the conversation');
        }, this);

        this.on('welcomeMessage', function(newUser) {
            //welcome only the joining user
            var username = newUser.get('username');
            newUser.socket.emit('chatMessage', null, 'Welcome to the conversation ' + username + '!');
        }, this);

        this.on('logout', function(loggingOutUser) {
            var username = loggingOutUser.get('username');
            loggingOutUser.trigger('chatMessage', username, 'left the conversation');
            this.remove(loggingOutUser);
            this.updateConnectedUsers();
        }, this);

        this.on('disconnect', function(user) {
            this.remove(user);
        }, this);

        //update the user list on every change of elements in the collection
        this.on('update', function() {
            var self = this;
            this.models.forEach(function(user) {
                //route the event out to all connected User models
                user.socket.emit('updateUsersList', self.toJSON());
            });
        }, this);

    },

    addUser: function (user) {
        //add the user to the collection/room
        this.add(user);
        var self = this;
        db.getMessages(function(err, dataFromDB) {
            if (err) { console.error(err); }
            //load last 10 messages of the current chat
            user.socket.emit('loadChat', dataFromDB);
            //inform other users
            user.trigger('joinMessage', user);
            //welcome the user
            user.trigger('welcomeMessage', user);
            self.updateConnectedUsers();
        });
    },

    rejoin: function (user) {
        //re-add user to chat, without fuss
        this.add(user);
        //send chat history to client
        db.getMessages(function(err, dataFromDB) {
            if (err) { console.error(err); }
            user.socket.emit('loadChat', dataFromDB);
        });

    },

    updateConnectedUsers: function () {
        var users = [];
        this.models.forEach(function(user) {
            var username = user.get('username');
            users.push(username);
        });
        this.connectedUsers = users;
    }

});
