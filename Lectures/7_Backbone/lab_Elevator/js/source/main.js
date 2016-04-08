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