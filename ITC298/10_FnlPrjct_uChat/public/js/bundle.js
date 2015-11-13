(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
/**
 * Created by Stefano on 11/08/15.
 */
//chatView.js

var ChatView = Backbone.View.extend({
    el: "#chat_body",
    initialize: function() {
        //set a refresh of the page upon changes of result
        //this.listenTo(this.model, "change:chat_history", this.render);
    },
    template: _.template( $("#chat-template").html() ),
    events: {
        //"click #send": ""
    },
    render: function() {
        var model = this.model.toJSON();
        var html = this.template(model);
        this.$el.html(html);
    }//,
    //send_msg: function(e) {
    //    //get message from the user
    //    var message = $(e.view.$('#msg_area')).val();
    //    //console.log(message);
    //    //clear the textarea
    //    $(e.view.$('#msg_area')).val('');
    //    this.model.updateHistory(message);
    //}
});

module.exports = ChatView;

},{}],3:[function(require,module,exports){
/**
 * Created by Stefano on 11/08/15.
 */
//main.js

//require view and module
var ChatView = require('./chatView.js');
var ChatModel = require('./chatModel.js');

//create the model
var chatModel = new ChatModel();

//create the view and connect it to the model
var chatView = new ChatView({
    model: chatModel
});

//render the view into html file
chatView.render();

},{"./chatModel.js":1,"./chatView.js":2}]},{},[3]);
