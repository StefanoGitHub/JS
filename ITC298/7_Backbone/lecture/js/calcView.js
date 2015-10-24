/**
 * Created by Stefano on 10/23/15.
 */
//calcView.js

var CalculatorView = Backbone.View.extend({
    el: "#calculator", //once created it has different properties
    initialize: function() {
        //set a refresh of the page upon changes of result
        this.listenTo(this.model, "change:result", this.render);
    },
    template: _.template( $("#calc-template").html() ),
    events: {
        //clicked on an operation button
        "click .operation": "runOperation",
        //something is typed (keyboard) in the input element
        "keyup .input": "updateInput"
    },
    render: function() {
        var model = this.model.toJSON();
        var html = this.template(model);
        this.$el.html(html);
        return this;
    },
    runOperation: function(e) {
        //in Backbone the e obj is the view (not the element), so to access the element use .target property
        var operation = $(e.target).attr("data-op");
        //alternatively, as long as the class has the suffix 'data-'
        //$(e.target).data("op");
        this.model.doMath(operation);
    },
    updateInput: function(e) {
        //
        this.model.set("input", Number(e.target.value));
    }
});


module.exports = CalculatorView;
