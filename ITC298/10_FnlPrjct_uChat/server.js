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
    engines: { html: require('handlebars') },
    path: "./templates",
    isCached: false,
    layoutPath: "layouts",
    layout: "layout"
});
server.route([
    { method: "GET", path: "/", handler: checkLogin },
    { method: "GET", path: "/login", handler: displayLogin },
    { method: "POST", path: "/login", handler: login },
    { method: "GET", path: "/public/{param*}", handler: { directory: { path: "public" } } }
]);


//set up the socket io
var io = require('socket.io')(server.listener);
io.on('connection', function(socket){
    console.log('a user connected');
    io.emit('chat message', 'a user connected');
    socket.on('disconnect', function(){
        console.log('a user disconnected');
        io.emit('chat message', 'a user disconnected');
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
        //console.log('message: ' + msg);
    });
});


//start the server
//server.start(logRunning);

//setup the database
var db = require("./db");
//call the function (from db handler file) which create/connect the database
//the callback passed to that function, called once the db is actually ready, will start the server
db.init(function() {
    console.log("DB ready");

    //here we can do stuff with the database


    //start the server
    server.start(function(){
        console.log('Server running');
    });
});
//var INSERT = db.connection.prepare("INSERT INTO t_users VALUES ($username, $pwd, $email);");
var PWD = db.connection.prepare("SELECT pwd FROM t_users WHERE username = $username;");
var INSERT_SESSION = db.connection.prepare("INSERT INTO t_sessions VALUES ($username, $sessionID);");
var DELETE_SESSION = db.connection.prepare("DELETE FROM t_sessions WHERE username = $username;");


function displayLogin(req, reply) {
    reply.view("login.html", { pageTitle: "uChat log-in" });
}

function checkLogin(req, reply) {
    //console.log("req.state: ", req.state);
    if (!req.state.username) {
        return reply.redirect("/login");
    }
    db.get("SELECT * FROM t_users WHERE username = $username", {
        $username: req.state.username
    }, function(err, result) {
        //console.log("result: ", result);
        console.log("err: ", err);
        if (!result || result.sessionID != req.state.session) {
            return reply.redirect("/login");
        }
        reply.view("index.html", { pageTitle: "uChat" });
    });
}

function login(req, reply) {
    //console.log(req.payload);
    //expected will contain the expected password expected by the system (ideally stored in a DB)
    //console.log(req.payload.username);
    PWD.get({
            $username: req.payload.username
        }, function(err, dataFromDB) {
        if (err) {
            throw err;
        }
        console.log(dataFromDB);

        if (dataFromDB && req.payload.pwd == dataFromDB.pwd) {
            //var response = reply("Worked!");
            var ID = String(Date.now());
            //response.state("username", req.payload.username);
            //response.state("sessionID", ID);
            reply.view("index.html", { pageTitle: "uChat" });

            //clear previous session data (the whole row where the data is stored)
            DELETE_SESSION.run({
                $username: req.payload.username
            }, function() {
                //save the new session ID
                INSERT_SESSION.run({
                    $username: req.payload.username,
                    $sessionID: ID
                });
            })
        } else {
            reply.redirect("/login");
        }
    });
}
