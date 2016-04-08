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
    path: "./templates",
    isCached: false,
    layoutPath: "layouts", // wrapper/frame for the content of all the pages/routes
    layout: "default", // no .html
    partialsPath: "templates/partials"
});

var getIndex = function(request, reply) {
    reply.view("index.html", {
        title: "Home"
    });
};

var getClasses = function(request, reply) {
    // db.all("SELECT * FROM CLASSES", function(err, classList) {
    fs.readFile("classes.json", "utf8", function(err, data) {
        var classList = JSON.parse(data);
        reply.view("classes.html", {
            title: "Classes",
            classes: classList,
            admin: true
        });
    });
};


server.route([
    { method: "GET", path: "/", handler: getIndex } ,
    { method: "GET", path: "/classes", handler: getClasses }
]);

server.route({ 
    method: "GET", 
    path: "/assets/{param*}", // url root for public subfolders
    handler: { // with this we can "include/link" other files in our html code
        directory: { 
            path: "public" // directory containing other files
        } 
    } 
});