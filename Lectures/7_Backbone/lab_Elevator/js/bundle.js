(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Stefano on 10/25/15.
 */
//elevatorModel.js

//define mnemonic names to html code for arrows
var up = '&#9650;', down = '&#9660;';

//code necessary to provide the right 'this' obj inside setTimeout()
var __nativeST__ = window.setTimeout;
window.setTimeout = function (vCallback, nDelay) {
    var oThis = this, aArgs = Array.prototype.slice.call(arguments, 2);
    return __nativeST__(vCallback instanceof Function ? function () {
        vCallback.apply(oThis, aArgs);
    } : vCallback, nDelay);
};

var ElevatorModel = Backbone.Model.extend({
    defaults: {
        direction: ' ',
        currentFloor: 0,
        selectedFloor: null,
        doors: 'open',
        moving: false
    },
    setRequestedFloor: function(requestedFloor) {
        if (!this.get('moving')) {
            var currentFloor = this.get('currentFloor');
            if (requestedFloor != currentFloor) {
                this.set('selectedFloor', requestedFloor);
            }
        }
    },
    moveUp: function() {
        this.set('direction', up);
        var currentFloor = this.get('currentFloor');
        this.set('currentFloor', ++currentFloor);
    },
    moveDown: function(){
        this.set('direction', down);
        var currentFloor = this.get('currentFloor');
        this.set('currentFloor', --currentFloor);
    },
    checkStatus: function() {
        var currentFloor = this.get('currentFloor');
        var selectedFloor = this.get('selectedFloor');
        if (selectedFloor) {
            if (currentFloor < selectedFloor) {
                this.set('moving', true);
                this.set('doors', 'close');
                setTimeout.call(this, this.moveUp, 1000);
            } else if (currentFloor > selectedFloor) {
                this.set('moving', true);
                this.set('doors', 'close');
                setTimeout.call(this, this.moveDown, 1000);
            } else {
                setTimeout.call(this, function () {
                    this.set('moving', false);
                    this.set('direction', '  ');
                    setTimeout.call(this, function () {
                        this.set('doors', 'open');
                        this.set('selectedFloor', null);
                    }, 500);
                }, 500);
            }
        }
        //keep checking
        setTimeout.call(this, this.checkStatus, 2000);
    }
});

module.exports = ElevatorModel;


},{}],2:[function(require,module,exports){
/**
 * Created by Stefano on 10/25/15.
 */
//elevatorView.js

var ElevatorView = Backbone.View.extend({
    el: "#elevator",
    initialize: function() {
        //set a refresh of the page upon changes of result
        this.listenTo(this.model, "change:currentFloor", this.render);
        this.listenTo(this.model, "change:selectedFloor", this.render);
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
        this.model.setRequestedFloor(requestedFloor);
        this.render();
    },
    render: function() {
        var model = this.model.toJSON();
        var html = this.template(model);
        this.$el.html(html);
    }
});


module.exports = ElevatorView;

},{}],3:[function(require,module,exports){
/**
 * Created by Stefano on 10/25/15.
 */
//main.js

//require view and module
var ElevatorView = require('./elevatorView.js');
var ElevatorModel = require('./elevatorModel.js');

//create the model
var elevatorModel = new ElevatorModel();

//create the view and connect it to the model
var elevatorView = new ElevatorView({
    model: elevatorModel
});

//render the view into html file
elevatorView.render();

//start the process
elevatorModel.checkStatus();

/**
 * Install:
 * $ sudo npm install -g watchify
 * Execute:
 * $ watchify source/main.js -o bundle.js
 **/
},{"./elevatorModel.js":1,"./elevatorView.js":2}]},{},[3]);
