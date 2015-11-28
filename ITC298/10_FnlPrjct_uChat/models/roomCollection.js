/**
 * Created by Stefano on 11/20/15.
 */
//roomCollection.js

var Backbone = require("backbone");
var User = require("./userModel");

//var RoomCollection = Backbone.Collection.extend({
module.exports = Backbone.Collection.extend({

    model: User,
    connectedUsers: [],
    messages: [],

    initialize: function() {
        //register for events
        this.on('chatMessage', function(chatMessage) {
            console.log('chatMessage: '+ chatMessage);
            this.messages.push(chatMessage);
            this.models.forEach(function(user) {
                user.socket.emit('chatMessage', chatMessage); //route the event out to all connected User models
            });
        }, this); //sets the `this` value inside the callback

        this.on('joinMessage', function(newUser, chatMessage) {
            //console.log('joinMessage: '+ newUser + chatMessage);
            this.messages.push(newUser + ' ' + chatMessage);
            //inform all other users of the joining
            newUser.socket.broadcast.emit('chatMessage', newUser.username + ' ' + chatMessage);
        }, this);

        this.on('welcomeMessage', function(user, message) {
            //welcome only the joining user
            user.socket.emit('chatMessage', message);
        }, this);

        this.on('logout', function(user) {
            this.remove(user);
            this.updateConnectedUsers();
            console.log('models @ logout', this.models.length);
            console.log('logout', this.connectedUsers);
        }, this);

        this.on('disconnect', function(user) {
            this.remove(user);
            console.log('models @ disconnect', this.models.length);
            console.log('disconnect', this.connectedUsers);
        }, this);

    },

    addThis: function (user) {
        //add the user to the collection/room
        this.add(user);
        //inform other users
        user.trigger('joinMessage', user, ' joined the conversation');
        //welcome the user
        user.trigger('welcomeMessage', user, 'Welcome to the conversation!');
        this.updateConnectedUsers();
        console.log('models @ addThis', this.models.length);
        console.log('addThis', this.connectedUsers);
    },

    rejoin: function (user) {
        //re-add user to chat, without fuss
        this.add(user);
        this.updateConnectedUsers();
    },

    updateConnectedUsers: function () {
        var users = [];
        this.models.forEach(function(user) {
            users.push(user.username);
        });
        this.connectedUsers = users;
        console.log('models @ updateConnectedUsers', this.models.length);
        console.log('updateConnectedUsers', this.connectedUsers);
        //return this.connectedUsers;
    }

});

//module.exports = RoomCollection;