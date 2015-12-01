/**
 * Created by Stefano on 11/20/15.
 */
//usersCollection.js

var Backbone = require("backbone");
var User = require("./userModel");

//var UsersCollection = Backbone.Collection.extend({
module.exports = Backbone.Collection.extend({

    model: User,
    connectedUsers: [],
    messages: ['hello', 'uChat'],

    initialize: function() {
        //console.log('messages:', this.messages);
        //register for events
        this.on('chatMessage', function(chatMessage) {
            console.log('chatMessage: '+ chatMessage);
            this.messages.push(chatMessage);
            this.models.forEach(function(user) {
                user.socket.emit('chatMessage', chatMessage); //route the event out to all connected User models
            });
            console.log('messages: '+ this.messages);
        }, this); //sets the `this` value inside the callback

        this.on('joinMessage', function(newUser) {
            var username = newUser.get('username');
            var joinMessage = username + ' joined the conversation';
            console.log('joinMessage: '+ joinMessage);
            this.messages.push(joinMessage);
            //inform all other users of the joining
            newUser.socket.broadcast.emit('chatMessage', joinMessage);
        }, this);

        this.on('welcomeMessage', function(newUser) {
            //welcome only the joining user
            newUser.socket.emit('chatMessage', 'Welcome to the conversation!');
            console.log(newUser.get('username') + ': Welcome to the conversation!');
        }, this);

        this.on('logout', function(user) {
            this.remove(user);
            this.updateConnectedUsers();
            //console.log('models @ logout', this.models.length);
            //console.log('logout', this.models);
        }, this);

        this.on('disconnect', function(user) {
            this.remove(user);
            console.log(user.get('username'), 'disconnected');
            //console.log('models @ disconnect', this.models.length);
            //console.log('disconnect', this.models);
        }, this);

    },

    addThis: function (user) {
        //add the user to the collection/room
        this.add(user);
        //inform other users
        user.trigger('joinMessage', user);
        //welcome the user
        user.trigger('welcomeMessage', user);
        this.updateConnectedUsers();
        //console.log(this.models.length, ' models @ addThis: ', this.models);
    },

    rejoin: function (user) {
        //re-add user to chat, without fuss
        this.add(user);

        console.log('after rejoin', this.models)
        //console.log(this.models.length, ' models @ rejoin: ', this.models);
    },

    updateConnectedUsers: function () {
        var users = [];
        this.models.forEach(function(user) {
            var username = user.get('username');
            users.push(username);
        });
        this.connectedUsers = users;
        //console.log('models @ updateConnectedUsers', this.models.length);
        //console.log('updateConnectedUsers', this.models);
        //return this.connectedUsers;
    }

});

//module.exports = UsersCollection;