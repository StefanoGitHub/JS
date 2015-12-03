/**
 * Created by Stefano on 11/20/15.
 */
//messagesCollection.js

var Backbone = require("backbone");
var Message = Backbone.Model.extend();
var db = require("../db");

module.exports = Backbone.Collection.extend({

    model: Message,

    appendMsg: function(username, msg) {
        var timestamp = String(Date.now());
        var chatMessage = new Message({
            username: username,
            message: msg,
            timestamp: timestamp
        });
        this.add(chatMessage);
        db.saveMessage({
            $username: username,
            $message: msg,
            $timestamp: timestamp
        }

            //test
            , function() {
            console.log('message inserted');
        }

        );
    }

});

