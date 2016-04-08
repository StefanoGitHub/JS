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