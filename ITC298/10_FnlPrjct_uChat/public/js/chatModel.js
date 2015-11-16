/**
 * Created by Stefano on 11/08/15.
 */
//chatModel.js

//var fromDB = "chat history...";
var db = require("../../db");

var ChatModel = Backbone.Model.extend({

    defaults: {
        chat_history: "chat history...",
        inRoom: this.getConnectedUsers,
        connectedUsers: []
    },

    save_chat: function (userName, messages) {
        //here the code to update the history of the chat
        db.getChatHistory(userName, function (err, userName, historyFromDB) {
            //console.log(chat_history);
            var newChatHistory = historyFromDB + messages;
            db.saveChatHistory(userName, newChatHistory);
        });
    },

    getConnectedUsers: function () {
        //here the code to list all connected users
        this.set('inRoom', "you");
    }

});

module.exports = ChatModel;
