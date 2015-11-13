/**
 * Created by Stefano on 11/08/15.
 */
//server.js
/**
 * /views - html templates go here
 * /public - css, js, images ...
 * db.js - start and config SQLite
 * */


var hapi = require("hapi");

var server = new hapi.Server();
server.connection({ port: 8000 });

server.views({
    engines: { html: require('handlebars') },
    path: "./views",
    isCached: false
});

server.start(function(){
    console.log('Server running');
});

server.route([
    { method: "GET", path: "/", handler: getChat },
    { method: "GET", path: "/uChat", handler: getChat },
    { method: "GET", path: "/public/{param*}", handler: { directory: { path: "public" } } }
]);

function getChat(req, reply) {
    reply.view("index.html");
}


/*
 var db = require("./db");
 //call the function (from db handler file) which create/connect the database
 //the callback passed to that function, called once the db is actually ready, will start the server
 db.init(function() {
 console.log("DB ready");

 var reminder = new Reminder({
 task: 'Start server'
 });

 //console.log(reminder.toJSON());
 reminder.create(function(err){
 if (err) {
 console.error(err);
 }
 db.connection.all("SELECT * FROM t_Reminders", function(err, results) {
 //console.log(err, results);
 });
 });

 server.start(function(){
 console.log('Server running');
 });
 });
*/