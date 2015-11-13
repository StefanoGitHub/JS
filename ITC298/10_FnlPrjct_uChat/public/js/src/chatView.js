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
