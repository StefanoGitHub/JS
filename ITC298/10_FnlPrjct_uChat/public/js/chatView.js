/**
 * Created by Stefano on 11/08/15.
 */
//chatView.js

var UserView = require('../../models/userView');

//var ChatView = Backbone.View.extend({
module.exports = Backbone.View.extend({

    tagName: 'ul',
    id: 'connected_users',
    //el: "#hapi_container",

    initialize: function() {
        this.render();
        //set a refresh of the page upon changes
        //this.listenTo(this.collection, "change:models", this.render);
        //this.listenTo(this.model, "change:chatMessages", this.render);
    },

    //template: _.template( $("#chat_messages-template").html() ),

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
        this.collection.each(function (user) {
            var userView = new UserView( { model: User });
            this.$el.append(userView.render().el);
        }, this);
        return this;

        //var model = this.collection.toJSON();
        //var html = this.template(model);
        //this.$el.html(html);
    }

});

//module.exports = ChatView;
