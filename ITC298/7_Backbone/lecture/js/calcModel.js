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

