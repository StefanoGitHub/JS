/**
 * Created by Stefano on 11/08/15.
 */
//userView.js

var Backbone = require("backbone");

module.exports = Backbone.View.extend({

    tagName: 'li',

    initialize: function() {
        this.render();
        //this.listenTo(this.model, "change:connectedUsers", this.render);
    },

    //template: _.template( $("#user-template").html() ),

    events: {

        //"click #save-chat": "save_chat"
    },

    render: function() {
        var html = this.template(this.model.toJSON());
        this.$el.html(html);
        return this;
    }

});

//module.exports = ChatView;
