//index.js 
var hapi = require("hapi");
var fs = require("fs");

var server = new hapi.Server();
server.connection({ port: 8000 });
server.start(function(){
    console.log('Server running!')
    console.info(server.info);
});

server.views({
    engines: {
        html: require('handlebars')
    },
    path: "./"
});

var showLink = function(request, reply) {
    reply.view("template.html", {
            link: 'get fortune',
            line: ''
        });
};

var returnLine = function(request, reply) {
    
    var x = request.params.x || 'random';
    var line = '';
    
    fs.readFile("./fortune.txt", "utf-8", function(err, data) {
        if (err) throw err;
        lines = data.split("\n");
        
        if (x == 'random' || x >= lines.length) {
            line = lines[Math.floor(Math.random() * lines.length)];
        } else {
            line = lines[x];
        }
        
        reply.view("template.html", {
            link: '',
            line: line
        });
    });
}

server.route([
    //localhost:8000 - show a "get fortune" link that goes to the /fortune page.
    { method: "GET", path: "/", handler: showLink },
    //localhost:8000/fortune - show a random entry from the fortunes list.
    //localhost:8000/fortune/X - show a specific fortune from the list, where X is the numerical index of that fortune
    { method: "GET", path: "/fortune/{x?}", handler: returnLine }
]);

