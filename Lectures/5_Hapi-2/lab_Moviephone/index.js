//index.js
/*****************************************************************************************
Using the data in movies.json, show the following pages:
- A home page with information about the theater and a list of all movies with showtimes
- A detail page for each movie with the poster, length, and starring actors
*****************************************************************************************/

var hapi = require("hapi");
var fs = require("fs");

var server = new hapi.Server();
server.connection({ port: 8000 });

var movieList = [];
fs.readFile("movies.json", "utf8", function(err, data) {
    if (err) { throw err }
    movieList = JSON.parse(data).movies;
    server.start(function(){
        console.log('Server running')
        console.info(server.info);
    });
});

server.views({
    engines: {
        html: require('handlebars')
    },
    path: "./templates",
    isCached: false,
    layoutPath: "layouts",
    layout: "default_layout"
});

var getHomePage = function(request, reply) {
    reply.view("index.html", {
            movieList: movieList,
            pageTitle: "Cinema",
            title: "Neighbourhood Cinema"
        });
}

var getMovie = function(request, reply) {
    var index = request.params.index;
    reply.view("movie.html", {
            movie: movieList[index],
            pageTitle: movieList[index].title
        });
};


server.route([
    { method: "GET", path: "/", handler: getHomePage },
    { method: "GET", path: "/{index}", handler: getMovie }
]);


server.route({ 
    method: "GET", 
    path: "/assets/{param*}", handler: { 
        directory: { 
            path: "public"
        } 
    } 
});