/**
 * Created by Stefano on 11/20/15.
 */
//roomCollection.js

var Backbone = require("backbone");
var User = require("./userModel");
//var sql = require("../database");

var RoomCollection = Backbone.Collection.extend({

    model: User

    //initialize: function() {
    //    this.on("chatMessage", function(event) {
    //        console.log(event);
    //        this.forEach(function(user) {
    //            user.send(event); //route the event out to all other connected User models
    //        });
    //    }, this); //sets the `this` value inside the callback
    //},

    //join: function (user, done) {
    //    //console.log('user:', user);
    //    this.add(user.toJSON());
    //    //register for chat messages event
    //    //inform other users
    //    user.socket.emit('chatMessage', user.username + ' joined the conversation');
    //    done();
    //}

});

module.exports = RoomCollection;