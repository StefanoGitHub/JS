/**
 * Created by Stefano on 11/11/15.
 */
//index.js

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendfile('index.html');
});

io.on('connection', function(socket){

    console.log('a user connected');
    io.emit('chat message', 'a user connected');

    socket.on('disconnect', function(){
        console.log('a user disconnected');
        io.emit('chat message', 'a user disconnected');
    });

    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
        console.log('message: ' + msg);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});