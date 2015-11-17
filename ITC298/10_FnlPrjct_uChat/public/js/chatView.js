/**
 * Created by Stefano on 11/08/15.
 */
//chatView.js

var ChatView = Backbone.View.extend({

    el: "#chat_body",

    initialize: function() {
        //set a refresh of the page upon changes
        this.listenTo(this.model, "change:chat_history", this.render);
    },

    template: _.template( $("#chat-template").html() ),

    events: {
        "click #save-chat": "save_chat"
    },

    //save_chat: function(e) {
    //    //get message from the user
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

module.exports = ChatView;
