/**
 * Created by Stefano on 11/08/15.
 */
//chatModel.js

//var fromDB = "chat history...";
//var db = require("../../db");
//var Backbone = require("backbone");

module.exports = Backbone.Model.extend({
//var ChatModel = Backbone.Model.extend({

    defaults: {
        connectedUsers: [ 'stefano', 'thomas', 'bill' ],
        chatMessages: [ 'M1', 'M2', 'M3' ]
    },

    //save_chat: function (userName, messages) {
    //    //here the code to update the history of the chat
    //    db.getChatHistory(userName, function (err, userName, historyFromDB) {
    //        //console.log(chat_history);
    //        var newChatHistory = historyFromDB + messages;
    //        db.saveChatHistory(userName, newChatHistory);
    //    });
    //},

});

//module.exports = ChatModel;
