/**
 * Created by Stefano on 11/20/15.
 */
//usersCollection.js

var Backbone = require("backbone");
var User = require("./userModel");
var db = require("../db");

module.exports = Backbone.Collection.extend({

    model: User,
    //connectedUsers: [],

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

        this.on('disconnect', function(user) {
        }, this);

    },

    connectUser: function (user) {
        console.log('this:', this);
        console.log('user:', user.toJSON());
        console.log('findWhere:', this.findWhere({username: user.username}));
        //if he/she has never joined the chat, add the user to the collection/room
        //if (!this.findWhere({username: user.username})) {
            this.add(user);
        //}
        console.log('findWhere2:', this.findWhere({username: user.username}));
        console.log('this2:', this);

        user.connect();
        //this.listenTo(user, "change", this.updateUserList);
        this.trigger('updateUsersList');
        //var self = this;
        db.getMessages(function(err, dataFromDB) {
            if (err) { console.error(err); }
            //load last 10 messages of the current chat
            user.socket.emit('loadChat', dataFromDB);
        });
    },

    disconnectUser: function (user) {
        user.disconnect();
        this.trigger('updateUsersList');
        user.socket.disconnect();
    }


});
