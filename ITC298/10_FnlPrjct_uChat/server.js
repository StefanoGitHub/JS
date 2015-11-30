/**
 * Created by Stefano on 11/08/15.
 */
//server.js
/**
 * /views - html templates go here
 * /public - css, js, images ...
 * db.js - start and config SQLite
 * */


//set up the server
var hapi = require("hapi");
var server = new hapi.Server();
var User = require('./models/userModel');
//var Backbone = require("backbone");

//var UserView = require('./models/userView');
var UsersCollection = require('./models/usersCollection');
//var ChatView = require('./public/js/chatView');

server.connection({ port: 8000 });
server.views({
    path: "./views/templates",
    engines: { html: require('handlebars') },
    layoutPath: "./views",
    layout: "layout",
    isCached: false
});
//setup the database
var db = require("./db");

//create/connect the database
db.init(function() {
    console.log("DB ready");

    //once the db is actually ready, start the server
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

//shouldn't we create here the "default room"?
var room = new UsersCollection();

//set up the socket io server
var io = require('socket.io')(server.listener);

io.on('connection', function(socket){
    //create the user model, passing th socket obj
    var user = new User(socket);
    //and its view
    //var userView = new UserView( { model: user });
    //var chatView = new ChatView( { collection: room} );
    io.emit('test', 'a test');
    io.emit('createConnectedUsersList', room);
    //registering userConnection event
    socket.on('userConnection', function(userData) {
        user.verify(userData, function(err, authenticated) {
            if (err) { console.error(err); }
            if (authenticated) {
                if (room.connectedUsers.indexOf(userData.username) < 0) {
                    room.addThis(user);
                } else {
                    room.rejoin(user);

                }
                //console.log('connectedUsers (server)', room.connectedUsers);
            } else {

                // !!!!!!!! check when we get here and figure out what to do !!!!!!!!!!!
                console.log('ERROR server.js line:76');

            }
        });
    });

    //registering logout event
    socket.on('logout', function(){
        user.logout(socket);
    });

    //registering saveChat event
    //socket.on('saveChat', function(chatData) {
    //    //console.log('chatData:', chatData);
    //
    //    db.saveChatHistory(chatData, function () {
    //        console.log('chat saved 3');
    //        io.emit('chat message', 'chat saved!');
    //        //io.emit('chat saved', 'chat saved!'); //here should popup a message "chat saved"
    //    });
    //
    //    //db.getChatHistory(chatData.username, function (historyFromDB) {
    //    //    console.log('historyFromDB', historyFromDB);
    //    //});
    //});

    //socket.on('disconnect', function(){

        // !!!!!!! ERROR !!!!!!!!!!!!!!!
        // need to do something otherwise at any page reload we add a new user...

        //user.clean(socket);
        //socket.emit('chatMessage', user.username + ' left the conversation')
        //user.logout(socket);
    //});

});
