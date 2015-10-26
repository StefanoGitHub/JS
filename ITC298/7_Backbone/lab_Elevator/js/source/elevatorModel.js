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

