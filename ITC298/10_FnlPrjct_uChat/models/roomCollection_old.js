/**
 * Created by Stefano on 11/20/15.
 */
//roomCollection.js

var Backbone = require("backbone");
var User = require("./userModel");

var RoomCollection = Backbone.Collection.extend({

    model: User,

    initialize: function() {

        this.on('chatMessage', function(chatMessage) {
            console.log('chatMessage', chatMessage);
            this.forEach(function(user) {
                user.socket.emit('chatMessage', user.username + ': ' + chatMessage); //route the event out to all other
                // connected User models
            });
        }, this); //sets the `this` value inside the callback

        //this.on('entrance', function(chatMessage) {
        //    console.log('entrance', chatMessage);
        //    this.forEach(function(user) {
        //        user.socket.broadcast.emit('chatMessage', chatMessage);
        //    });
        //}, this);

        this.on('logout disconnect', function(user) {
            this.remove(user);
            console.log('models @ logout', this.models.length);
        }, this);
    },

    addThis: function (user) {
        //add the user to the collection/room
        this.add(user);
        //inform other users
        user.socket.broadcast.emit('chatMessage', user.username + ' joined the conversation');

        //user.trigger('entrance', user.username + ' joined the conversation');
        //welcome the user
        user.socket.emit('chatMessage', user.username + ', welcome to the conversation!');


        console.log('models @ join:', this.models.length);
    }

});

module.exports = RoomCollection;