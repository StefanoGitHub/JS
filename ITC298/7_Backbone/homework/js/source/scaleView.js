/**
 * Created by Stefano on 10/23/15.
 */
//scaleView.js

var GalacticScaleView = Backbone.View.extend({
    el: "#galacticScale",
    template: _.template( $("#scale-template").html() ),
    events: {
        "click .planet": "calculateWeight",
        "click #reset": "reset",
        "keyup #input": "updateWeight"
    },
    calculateWeight: function(e) {
        //get data from the user
        var selectedPlanet = $(e.target).attr("data-planet");
        var input = $(e.view.$('#input')).val();
        //call the function from the model
        this.model.calculateWeight(selectedPlanet);
        //render the page with the new data
        this.render();
        $(e.view.$('#input')).val(input);
        $(e.view.$('[data-planet="'+selectedPlanet+'"]')).css("background-color", "cornflowerblue");
    },
    render: function() {
        var model = this.model.toJSON();
        var html = this.template(model);
        this.$el.html(html);
    },
    reset: function() {
        this.model.set("result", '-');
        this.model.set("input", 0);
        this.model.set("image", 'galaxy.jpg');
        this.model.set("description", 'Our galaxy');
        this.render();
    },
    updateWeight: function(e) {
        var input = $(e.view.$('#input')).val();
        this.model.set("input", input);
    }
});


module.exports = GalacticScaleView;
