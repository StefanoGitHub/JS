//pizza.js
var hapi = require("hapi");
var orders = require("./orders");


var server = new hapi.Server();
server.connection({ port: 8000 });

server.views({
    engines: {
        html: require('handlebars')
    },
    //option in development
    //isCashed: false,
    path: "templates"
});

server.route([
    {
        method: "GET",
        path: "/{name?}",
        handler: function(request, reply) {
            var name = request.params.name || "visitor";
            reply.view("index.html", {
                    user: name,
                    pizzas: orders.pizzas
                });
            }
    },
    {
        method: "POST",
        path: "/order/",
        handler: function(request, reply) {
                //console.log(request.payload);
                orders.add(request.payload);
            reply.view("index.html", {
                        pizzas: orders.pizzas
                    });
            }
    }
]);


server.start(function() {
    console.log('Server running!');
});