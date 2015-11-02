/**
 * Created by Stefano on 10/25/15.
 */
//elevatorView.js

var ElevatorView = Backbone.View.extend({
    el: "#elevator",
    initialize: function() {
        //set a refresh of the page upon changes of result
        this.listenTo(this.model, "change:currentFloor", this.render);
        this.listenTo(this.model, "change:direction", this.render);
        this.listenTo(this.model, "change:doors", this.render);
    },
    template: _.template( $("#elevator-template").html() ),
    events: {
        "click :button": "setRequest"
    },
    setRequest: function(e) {
        //get data from the user
        var requestedFloor = $(e.target).attr("data-floor");
        $(e.view.$('[data-floor="'+requestedFloor+'"]')).css("background-color", "grey");
        this.model.setRequestedFloor(requestedFloor);
        this.render();
    },
    render: function() {
        var model = this.model.toJSON();
        var html = this.template(model);
        this.$el.html(html);
/*
        var selectedFloors = this.model.getSelectedFloors();

        if (selectedFloors.length > 0) {
            for (var i = 0; i < selectedFloors.length; i++) {
                this.$el.find('[data-floor="'+selectedFloors[i]+'"]').attr("data-selected", "selected");
                this.$el.find('[data-floor="'+selectedFloors[i]+'"]').css("background-color", "grey");
            }
        }
*/
        var selectedFloor = this.model.getSelectedFloor();
        //console.log(targetFloor);
        this.$el.find('[data-floor="'+selectedFloor+'"]').css("background-color", "grey");
    }
});


module.exports = ElevatorView;
