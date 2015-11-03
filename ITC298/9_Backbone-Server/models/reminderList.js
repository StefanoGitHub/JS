/**
 * Created by Stefano on 11/2/15.
 */
//reminderList.js

var Backbone = require("backbone");
var db = require("../db");
var Reminder = require("./reminder");

var ReminderList = Backbone.Collection.extend({
    model: Reminder,
    load: function(callback) {
        var self = this;
        //select reminders from db
        var query = "SELECT * FROM t_Reminders;";
        db.connection.all(query, function(err, results) {
            //fill list with Reminders
            //console.log(results);
            self.reset(results);
            self.each(function(task) {
                //convert 1 and 0 to true/false
                var completed = task.get("complete");
                task.set("complete", !!completed); //!! converts 0 -> true -> false
            });
            callback();
        });
    }

});

module.exports = ReminderList;