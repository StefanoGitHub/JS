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
//render the view into html file
calcView.render();


/**
 * $ sudo npm install -g browserify
 *
 * $ browserify main.js -o bundle.js
 **/