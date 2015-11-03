/**
 * Created by Stefano on 11/2/15.
 */
//reminder.js

var Backbone = require("backbone");
var db = require("../db");

//Reminder will act as a constructor for our reminders [var reminder = new Reminder();]
var Reminder = Backbone.Model.extend({
    defaults: {
        //the default values should reflect the columns in the Reminders table
        task: '',
        complete: false
    },
    create: function (callback) {
        //with this callback becomes optional
        callback = callback || function() {};
        //get its own data
        var data = this.toJSON(); //this is the reminder obj (the one from which we call the create function)
        //run an INSERT on the db
        var query = "INSERT INTO t_Reminders (task, complete) VALUES ($task, $complete);";
        //pass in its data
        db.connection.run(query, {
            $task: data.task,
            $complete: data.complete
        },
        //when done, call the callback
        callback);
    }
});

//var reminder = new Reminder();
//console.log(reminder.toJSON());

module.exports = Reminder;