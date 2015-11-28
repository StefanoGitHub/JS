(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
/**
 * Created by Stefano on 11/08/15.
 */
//chatView.js

//var Backbone = require("backbone");

//var ChatView = Backbone.View.extend({
module.exports = Backbone.View.extend({

    el: "#hapi_container",

    initialize: function() {
        //set a refresh of the page upon changes
        this.listenTo(this.model, "change:connectedUsers", this.render);
        this.listenTo(this.model, "change:chatMessages", this.render);
    },

    template: _.template( $("#chat_messages-template").html() ),

    events: {

        //"click #save-chat": "save_chat"
    },

    //save_chat: function(e) {
    //    //get message from the usert_users
    //    var messages = $(e.view.$('#messages')).val();
    //    var userName = $(e.view.$('#username')).val();
    //    console.log(message);
    //    this.model.save_chat(userName, messages);
    //},

    render: function() {
        var model = this.model.toJSON();
        var html = this.template(model);
        this.$el.html(html);
    }

});

//module.exports = ChatView;

},{}],3:[function(require,module,exports){
/**
 * Created by Stefano on 11/08/15.
 */
//main.js

//require view and module
var ChatView = require('./chatView.js');
var ChatModel = require('./chatModel.js');
//var roomCollection = require('../../models/roomCollection.js');

//create the model
var chatModel = new ChatModel();

//create the view and connect it to the model
var chatView = new ChatView({
    model: chatModel
    //users: roomCollection.connectedUsers,
    //messages: roomCollection.messages
});

//render the view into html file
chatView.render();

},{"./chatModel.js":1,"./chatView.js":2}]},{},[3]);
