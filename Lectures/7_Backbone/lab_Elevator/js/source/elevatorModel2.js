/**
 * Created by Stefano on 10/25/15.
 */
//elevatorModel.js

var up = '&#9650;', down = '&#9660;';

var __nativeST__ = window.setTimeout;
window.setTimeout = function (vCallback, nDelay) {
    var oThis = this, aArgs = Array.prototype.slice.call(arguments, 2);
    return __nativeST__(vCallback instanceof Function ? function () {
        vCallback.apply(oThis, aArgs);
    } : vCallback, nDelay);
};

var wait = function(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
};

var ElevatorModel = Backbone.Model.extend({
    defaults: {
        direction: ' ',
        currentFloor: 0,
        buttonUp: 'up.jpg',
        buttonDown: 'down.jpg',
        targetFloor: 0,
        selectedFloor: null,
        //selectedFloors: [],
        doors: 'open',
        moving: false
    },
    setRequestedFloor: function(requestedFloor) {
        //set target
/*
        var selectedFloors = this.get('selectedFloors');
        var selectedFloor = this.get('selectedFloors');
        var currentFloor = this.get('currentFloor');
        if (requestedFloor != currentFloor) {
            selectedFloors.push(requestedFloor);
            this.set('selectedFloors', selectedFloors);
        }
*/
        if (!this.get('moving')) {
            var targetFloor = this.get('targetFloor');
            var currentFloor = this.get('currentFloor');
            if (requestedFloor != currentFloor && requestedFloor != targetFloor) {
                this.set('targetFloor', requestedFloor);
                this.set('selectedFloor', requestedFloor);
            }
        }

    },
/*
    getSelectedFloors: function() {
        return this.get('selectedFloors');
    },
*/
    getSelectedFloor: function() {
        return this.get('selectedFloor');
    },
    moveUp: function() {
        this.set('direction', up);
        var currentFloor = this.get('currentFloor');
        currentFloor++;
        //console.log(currentFloor);
        this.set('currentFloor', currentFloor);
    },
    moveDown: function(){
        this.set('direction', down);
        var currentFloor = this.get('currentFloor');
        currentFloor--;
        this.set('currentFloor', currentFloor);
    },
    checkStatus: function() {
/*
        var currentFloor = this.get('currentFloor');
        var selectedFloors = this.get('selectedFloors');
        if (selectedFloors.length > 0) {
            var targetFloor = selectedFloors[0];
            //this.set('targetFloor', targetFloor)
            if (currentFloor < targetFloor) {
                this.set('doors', 'close');
                //this.moveUp();
                setTimeout.call(this, this.moveUp, 1000);
            } else if (currentFloor > targetFloor) {
                this.set('doors', 'close');
                //this.moveDown();
                setTimeout.call(this, this.moveDown, 1000);
            } else {
                setTimeout.call(this, function() {
                    selectedFloors = selectedFloors.slice(1);
                    this.set('selectedFloors', selectedFloors);
                    this.set('direction', '  ');
                    //this.set('doors', 'open');
                    setTimeout.call(this, function() {
                        this.set('doors', 'open');
                    }, 500);
                }, 1000);

            }
        }
*/
        var currentFloor = this.get('currentFloor');
        var targetFloor = this.get('targetFloor');
        //if (targetFloor != currentFloor) {
            //this.set('targetFloor', targetFloor)
            if (currentFloor < targetFloor) {
                this.set('moving', true);
                this.set('doors', 'close');
                //this.moveUp();
                setTimeout.call(this, this.moveUp, 1000);
            } else if (currentFloor > targetFloor) {
                this.set('moving', true);
                this.set('doors', 'close');
                //this.moveDown();
                setTimeout.call(this, this.moveDown, 1000);
            } else {
                setTimeout.call(this, function() {
                    //targetFloor = selectedFloors.slice(1);
                    this.set('moving', false);
                    this.set('direction', '  ');
                    this.set('selectedFloor', null);
                    //this.set('doors', 'open');
                    setTimeout.call(this, function() {
                        this.set('doors', 'open');
                    }, 500);
                }, 1000);

            }
        //}

        //keep checking
        setTimeout.call(this, this.checkStatus, 2000);
    }
});

module.exports = ElevatorModel;

