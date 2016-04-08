/**
 * Created by Stefano on 10/31/15.
 */
//server.js

var hapi = require("hapi");
var sqlite = require("sqlite3");

var users = {
    stefano: "123",
    admin: "admin"
};

var server = new hapi.Server();
server.connection({ port: 8080 });

var db = new sqlite.Database("auth.db", function() {
    //table t_Auth has two columns, username, sessionID
    db.run("CREATE TABLE IF NOT EXISTS t_Auth (username, sessionID);", function() {
        //once the table has been created, start the server
        console.log('Starting server...');
        server.start();
        console.log('Server running!');
    });
});


server.route({
    method: "GET",
    path: "/",
    handler: function(req, reply) {
        //console.log("req.state: ", req.state);
        if (!req.state.user) {
            return reply.redirect("/login");
        }
        db.get("SELECT * FROM t_Auth WHERE username = $user", {
            $user: req.state.user
        }, function(err, result) {
            //console.log("result: ", result);
            console.log("err: ", err);
            if (!result || result.sessionID != req.state.session) {
                return reply.redirect("/login");
            }
            reply("Your are logged in");
        });
    }
});


server.route({
    method: "GET",
    path: "/login",
    handler: function(req, reply) {
        reply(
            "<form method=POST>" +
            "<input name=user placeholder=username>" +
            "<input name=password placeholder=password>" +
            "<input type=submit>" +
            "</form>"
            );
    }
});


server.route({
    method: "POST",
    path: "/login",
    handler: function(req, reply) {
        //console.log(req.payload);
        //expected will contain the expected password expected by the system (ideally stored in a DB)
        var expected = users[req.payload.user];
        if (req.payload.password == expected) {
            var response = reply("Worked!");
            var ID = String(Date.now());
            response.state("user", req.payload.user);
            response.state("session", ID);

            //clear previous session data (the whole row where the data is stored)
            db.run("DELETE FROM t_Auth WHERE username = $user", {
                $user: req.payload.user
            }, function() {
                //save the new session ID
                db.run("INSERT INTO t_Auth VALUES ($user, $session)", {
                    $user: req.payload.user,
                    $session: ID
                });
            })
        } else {
            reply.redirect("/login");
        }
    }
});


