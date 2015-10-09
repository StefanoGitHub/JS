//index.js 

var hapi = require("hapi");
var async = require("async");


var server = new hapi.Server();
server.connection({
    port: 8000
});
server.start(function(){
    console.info(server.info);
});

var counter = 0;

server.route({
    method: "GET",
    path: "/{name?}",
    handler: function(request, reply) {
        var name = request.params.name || "visitor";
        counter++;
        console.log(request.params);
        reply("Hello " + name + " from Hapi.js! " + counter);
    }
})

server.route({
    method: "GET",
    path: "/{name}/{id}",
    handler: function(request, reply) {
        var name = request.params.name;
        var id = request.params.id;
        reply(name + " | " + id);
    }
})