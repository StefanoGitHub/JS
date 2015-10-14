//index.js 
var hapi = require("hapi");

var server = new hapi.Server();
server.connection({ port: 8000 });
server.start(function(){
    console.log('Server running!')
});

server.views({
    engines: {
        html: require('handlebars')
    },
    path: "./templates",
    //path: ".",
    isCached: false
});

server.route({ 
    method: "GET", 
    path: "/", 
    handler: function(req, reply){
        reply.view("index");
    } 
});

//static resources - CSS, images, files, etc.
server.route({ 
    method: "GET", 
    path: "/assets/{param*}", 
    handler: { 
        directory: { 
            //served from the build folder, since in this case generated/copied via Grunt
            path: "build"
        } 
    } 
});