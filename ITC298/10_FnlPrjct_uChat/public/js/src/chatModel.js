/**
 * Created by Stefano on 11/08/15.
 */
//chatModel.js

var fromDB = "Welcome to uChat!";

var ChatModel = Backbone.Model.extend({

    defaults: {
        chat_history: fromDB,
        inRoom: this.getConnectedUsers
    },
/*
    getHistory: function() {
        //here the code to update the history of the chat
        var fromDB = "Welcome to uChat!";
        this.set('chat_history', fromDB);
    },
*/
    //updateHistory: function (newMessage) {
    //    //here the code to update the history of the chat
    //    var chat_history = this.get('chat_history');
    //    //console.log(chat_history);
    //    var updatedHistory =  chat_history + '<br>' + newMessage;
    //    this.set('chat_history', updatedHistory);
    //},
    getConnectedUsers: function () {
        //here the code to list all connected users
        this.set('inRoom', "you");
    }

});

module.exports = ChatModel;
