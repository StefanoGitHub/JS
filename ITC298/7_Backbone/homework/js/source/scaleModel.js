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

