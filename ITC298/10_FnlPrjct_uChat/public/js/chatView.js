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
