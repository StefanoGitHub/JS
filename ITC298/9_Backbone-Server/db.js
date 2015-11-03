/**
 * Created by Stefano on 11/2/15.
 */
//db.js

var sqlite = require("sqlite3");

var database = {
    connection: null,
    init: function(dbReady) {
        var db = new sqlite.Database("reminder.db");
        //create/connect the db
        database.connection = db;
        //create the table
        db.run("CREATE TABLE IF NOT EXISTS t_Reminders (task, complete);", function() {
            //once the table is created, call the callback (which will start the server)
            dbReady();
        });
    }
};


module.exports = database;