/**
 * Created by Stefano on 11/08/15.
 */
//server_prova.js
/**
 * /views - html templates go here
 * /public - css, js, images ...
 * db.js - start and config SQLite
 * */


//set up the server
var hapi = require("hapi");
var server = new hapi.Server();
server.connection({ port: 8000 });
server.views({
    path: "views/templates",
    layoutPath: "views",
    layout: "default",
    engines: { html: require('handlebars') },
    isCached: false
});
//setup the database
var db = require("./db");
//call the function (from db handler file) which create/connect the database
//the callback passed to that function, called once the db is actually ready, will start the server
db.init(function() {
    console.log("DB ready");

    //do stuff with the database

    //start the server
    server.start(function(){
        console.log('Server running');
    });
});

var handlers = require('./handlers/handlers');
server.route([
    { method: "GET", path: "/{page?}", handler: handlers.checkSession },
    { method: "POST", path: "/signin", handler: handlers.signin },
    { method: "POST", path: "/login", handler: handlers.login },
    { method: "GET", path: "/public/{param*}", handler: { directory: { path: "public" } } }
]);

//set up the socket io
var io = require('socket.io')(server.listener);
io.on('connection', function(socket){
    console.log('a user connected');
    io.emit('chat message', 'a user connected');
    socket.on('disconnect', function(user){
        console.log('a user disconnected');
        io.emit('chat message', 'a user disconnected');
        if (user) {

            /************************* HERE USER IS NOT RIGHT !!!!  **********************************/

            db.deleteSession(user);
        }
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
        //console.log('message: ' + msg);
    });
});
