/**
 * Created by Stefano on 11/20/15.
 */
//usersCollection.js

var Backbone = require("backbone");
var User = require("./userModel");

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
            //inform all other users of the joining
            newUser.socket.broadcast.emit('chatMessage', username, ' joined the conversation');
        }, this);

        this.on('welcomeMessage', function(newUser) {
            //welcome only the joining user
            newUser.socket.emit('chatMessage', null, 'Welcome to the conversation!');
        }, this);

        this.on('logout', function(user) {
            this.updateConnectedUsers();
            var username = user.get('username');
            user.socket.broadcast.emit('chatMessage', username, 'left the conversation');
            this.remove(user);
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
        }, this); //sets the `this` value inside the callback

    },

    addThis: function (user) {
        //add the user to the collection/room
        this.add(user);
        //inform other users
        user.trigger('joinMessage', user);
        //welcome the user
        user.trigger('welcomeMessage', user);
        this.updateConnectedUsers();
    },

    rejoin: function (user) {
        //re-add user to chat, without fuss
        this.add(user);
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
