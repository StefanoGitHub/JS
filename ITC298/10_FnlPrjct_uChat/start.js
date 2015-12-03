//server.js
/**
 * /views - html templates go here
 * /public - css, js, images ...
 * /models - backbone models and collections
 * db.js - start and config SQLite
 * */

//set up the server
var hapi = require("hapi");
var server = new hapi.Server();
var User = require('./models/userModel');

var UsersCollection = require('./models/usersCollection');
var MessagesCollection = require('./models/messagesCollection');

//setup server
server.connection({ port: 8000 });
server.views({
    path: "./views/templates",
    engines: { html: require('handlebars') },
    layoutPath: "./views",
    layout: "layout",
    isCached: false
});
var handlers = require('./handlers/handlers');
server.route([
    { method: "GET", path: "/{page?}", handler: handlers.checkSession },
    { method: "POST", path: "/signin", handler: handlers.signin },
    { method: "POST", path: "/login", handler: handlers.login },

    { method: "GET", path: "/public/{param*}", handler: { directory: { path: "public" } } }
]);

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



//create users collection
var room = new UsersCollection();
//create messages collection
var conversation = new MessagesCollection();
conversation.listenTo(room, "chatMessage", conversation.appendMsg);



//set up the socket io server
var io = require('socket.io')(server.listener);

io.on('connection', function(socket){
    //create the user model, passing th socket obj
    var user = new User();
    user.setSocket(socket);

    socket.emit(); //ANOMALY: this used to avoid loss of first emit, somehow loss by the system

    //registering userConnection event
    socket.on('userConnection', function(userData) {
        user.verify(userData, function(err, authenticated) {
            if (err) { console.error(err); }
            if (authenticated) {
                if (room.connectedUsers.indexOf(userData.username) < 0) {
                    //if the user was not already connected
                    room.addUser(user);
                } else {
                    //otherwise re-add user to chat, without fuss
                    room.rejoin(user);
                }
            }
            //if user not authenticated log out
            else {
                user.logout(socket);
            }
        });
    });

    //registering logout event
    socket.on('logout', function() {
        user.logout(socket);
    });

});
