(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Stefano on 10/23/15.
 */
//main.js

var GalacticScaleView = require('./scaleView.js');
var GalacticScaleModel = require('./scaleModel.js');

//create the model
var scaleModel = new GalacticScaleModel();

//create the view and connect it to the model
var scaleView = new GalacticScaleView({
    model: scaleModel
});
//render the view into html file
scaleView.render();


/**
 * Install:
 * $ sudo npm install -g watchify
 * Execute:
 * $ watchify source/main.js -o bundle.js
 **/
},{"./scaleModel.js":2,"./scaleView.js":3}],2:[function(require,module,exports){
/**
 * Created by Stefano on 10/23/15.
 */
//scaleModel.js

var GalacticScaleModel = Backbone.Model.extend({
    defaults: {
        result: '-',
        input: 0,
        image: 'galaxy.jpg',
        description: 'Our galaxy'
    },
    calculateWeight: function(planet) {
        //get input value
        var input = this.get('input');
        //execute operation
        var output = 0;
        var image = '';
        var description = planet;
        if (planet == 'mercury') {
            output = input * 0.38;
            image = 'mercury.jpg'
        }
        if (planet == 'venus') {
            output = input * 0.904;
            image = 'venus.jpg'
        }
        if (planet == 'mars') {
            output = input * 0.376;
            image = 'mars.jpg'
        }
        if (planet == 'moon') {
            output = input * 0.1654;
            image = 'moon.jpg'
        }
        //set results
        this.set('image', image);
        this.set('description', description);
        var digits = Number(input).toString().replace(/[.,]+/g, '').length;
        this.set('result', Number(output).toPrecision(digits)+' kg');
    }
});


module.exports = GalacticScaleModel;


},{}],3:[function(require,module,exports){
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

},{}]},{},[1]);
