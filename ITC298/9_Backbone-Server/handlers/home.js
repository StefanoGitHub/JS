/**
 * Created by Stefano on 11/2/15.
 */
//home.js
var ReminderList = require("../models/ReminderList");

module.exports = function(req, reply){
    var list = new ReminderList();
    list.load(function() {
        var data = list.toJSON();
        //console.log(data);
        //list is now ready
        reply.view("index", {
            test: 'test OK',
            reminders: data
        });

    })
};

