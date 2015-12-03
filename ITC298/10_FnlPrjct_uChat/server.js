/**
 * Created by Stefano on 11/08/15.
 */
//server.js
/**
 * /views - html templates go here
 * /public - css, js, images ...
 * /models - backbone models
 * /collections - backbone collections
 * db.js - start and config SQLite
 * */

//set up the server
var hapi = require("hapi");
var server = new hapi.Server();
var User = require('./models/userModel');

var UsersCollection = require('./models/usersCollection');
var MessagesCollection = require('./models/messagesCollection');

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
                //console.log('condition?:', room.connectedUsers.indexOf(userData.username));
                if (room.connectedUsers.indexOf(userData.username) < 0) {
                    room.addThis(user);
                    //socket.emit('createConnectedUsersList', room.toJSON());
                } else {
                    room.rejoin(user);
                }
            }
            //is this actually necessary???
            else {

                // !!!!!!!! check when we get here and figure out what to do !!!!!!!!!!!
                console.log('ERROR server.js line:76');

            }
        });
    });

    //registering logout event
    socket.on('logout', function(){
        user.logout(socket);
    });

});
