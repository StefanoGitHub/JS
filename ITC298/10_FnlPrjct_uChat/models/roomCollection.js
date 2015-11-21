/**
 * Created by Stefano on 11/20/15.
 */
//roomCollection.js

var Backbone = require("backbone");
var User = require("./userModel");
//var sql = require("../database");

module.exports = Backbone.Collection.extend({
    model: User,
    join: function (user) {
        this.add(user);
    }

});