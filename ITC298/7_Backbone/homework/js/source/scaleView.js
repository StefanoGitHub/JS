/**
 * Created by Stefano on 10/23/15.
 */
//scaleView.js

var GalacticScaleView = Backbone.View.extend({
    el: "#galacticScale",
    template: _.template( $("#scale-template").html() ),
    events: {
        "click .planet": "calculateWeight",
        "keyup #input": "updateWeight"
    },
    render: function() {
        var model = this.model.toJSON();
        var html = this.template(model);
        this.$el.html(html);
    },
    calculateWeight: function(e) {
        var planet = $(e.target).attr("data-planet");
        var input = $(e.view.$('#input')).val();
        this.model.calculateWeight(planet);
        this.render();
        $(e.view.$('#input')).val(input);

        $(e.view.$(':button')).css("background-color", "none");// working??
        //console.log($(e.view.$(':button'))); //works
        $(e.target).css("background-color", "skyblue");//why not working?????
        //$(e.view.$('body')).css('background-color', 'blue');//works
    },
    updateWeight: function(e) {
        var input = $(e.view.$('#input')).val();
        this.model.set("input", input);
    }
});


module.exports = GalacticScaleView;
