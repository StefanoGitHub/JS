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
//the callback passed to tsocket.emit('saveChat', username);socket.emit('saveChat', username);hat function, called once the db is actually ready, will start the server
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

    //var user = new User(socket);

    socket.on('userConnection', function(username) {
        console.log(username, ' connected');

        //here update usersConnected list

        io.emit('chat message', username + ' joined the conversation');
    });

    socket.on('userDisconnection', function(username){
        console.log(username, ' disconnected');
        io.emit('chat message', username + ' left the conversation');
        //socket.disconnect();

        /************* how to delete cookies? otherwise when is sent to login it is still authenticated ***************/

        //db.deleteSession(user);
    });

    socket.on('saveChat', function(chatData) {
        //console.log('chatData:', chatData);

        db.saveChatHistory(chatData, function () {
        console.log('chat saved 3');
        io.emit('chat message', 'chat saved!');
        //io.emit('chat saved', 'chat saved!'); //here should popup a message "chat saved"
        });

        //db.getChatHistory(chatData.username, function (historyFromDB) {
        //    console.log('historyFromDB', historyFromDB);
        //});
    });

    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
        //console.log('message: ' + msg);
    });
});
