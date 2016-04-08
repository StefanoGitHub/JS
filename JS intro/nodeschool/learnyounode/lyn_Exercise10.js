/*********************
EXERCISE 10
Write a TCP time server!
Your server should listen to TCP connections on the port provided by the first argument to your program. For each connection you must write the current date & 24 hour time in the format:    "YYYY-MM-DD hh:mm"
followed by a newline character. Month, day, hour and minute must be zero-filled to 2 integers. For example:    "2013-07-06 17:42"
*********************/
var net = require('net')
var port = process.argv[2];
var date = new Date();

var server = net.createServer(function callback (socket) {

    var formattedMonth = (date.getMonth() > 9) ? date.getMonth() + 1 : ('0' + (date.getMonth() + 1));
    var formattedDay = (date.getDate() > 9) ? date.getDate() : ('0' + date.getDate());
    var formattedHour = (date.getHours() > 9) ? date.getHours() : ('0' + date.getHours());
    var formttedMinute = (date.getMinutes() > 9) ? date.getMinutes() : ('0' + date.getMinutes());

    var formattedDate = date.getFullYear() + '-' +
        formattedMonth + '-' +
        formattedDay + ' ' +
        formattedHour + ':' +
        formttedMinute + '\n';

    socket.end(formattedDate)    
});

server.listen(port)

/**********************
LearnYouNode Solution
***********************

var net = require('net')

function zeroFill(i) {
  return (i < 10 ? '0' : '') + i
}

function now () {
  var d = new Date()
  return d.getFullYear() + '-'
    + zeroFill(d.getMonth() + 1) + '-'
    + zeroFill(d.getDate()) + ' '
    + zeroFill(d.getHours()) + ':'
    + zeroFill(d.getMinutes())
}

var server = net.createServer(function (socket) {
  socket.end(now() + '\n')
})

server.listen(Number(process.argv[2]))
*/