(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Stefano on 10/23/15.
 */
//calcModel.js

var CalculatorModel = Backbone.Model.extend({
    defaults: {
        result: 0,
        input: 0
    },
    doMath: function(operation) {
        //get current value
        var value = this.get('result');
        //get input value
        var input = this.get('input');
        //execute operation
        var output = 0;
        if (operation == 'add') {
            output = value + input;
        }
        if (operation == 'sub') {
            output = value - input;
        }
        if (operation == 'mult') {
            output = value * input;
        }
        if (operation == 'div') {
            output = value / input;
        }
        //set result
        this.set('result', output);
        //this.set("input", 0);
    }
});


module.exports = CalculatorModel;


},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
/**
 * Created by Stefano on 10/23/15.
 */
//main.js

var CalculatorView = require('./calcView.js');
var CalculatorModel = require('./calcModel.js');

//create the model
var calcModel = new CalculatorModel();

//create the view and connect it to the calc model
var calcView = new CalculatorView({
    model: calcModel
});
calcView.render();


/**
 * $ sudo npm install -g browserify
 *
 * $ browserify main.js -o bundle.js
 **/
},{"./calcModel.js":1,"./calcView.js":2}]},{},[3]);
