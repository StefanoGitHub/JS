//index.js 
/*****************************************************************************************
Create a website that basically inventories your shelves for your friend. It should have the following page types:
- A home page that provides a short description of the site and a welcome message.
- A list page for each media type, such as all your CDs or all your books.
- A detail page, linked from the lists, that shows the metadata for a particular item (i.e., a book's author, page count, genre, and synopsis.
Additionally, these pages should share a common layout, including navigation and CSS that's shared between pages. 
*****************************************************************************************/

var hapi = require("hapi");
var fs = require("fs");

var server = new hapi.Server();
server.connection({ port: 8000 });
server.start(function(){
    console.log('Server running')
    console.info(server.info);
});

server.views({
    engines: {
        html: require('handlebars')
    },
    path: "./templates",
    isCached: false,
    layoutPath: "layouts",
    layout: "default_layout",
    partialsPath: "templates/partials"
});

var getWelcomePage = function(request, reply) {
    reply.view("index.html", {
        title: "Welcome"
    });
};

var getList = function(request, reply) {
    var section = request.path.slice(1);
    var sectionFile = section+".json";
    fs.readFile(sectionFile, "utf8", function(err, data) {
        if (err) { throw err }
        var listContent = JSON.parse(data);
        reply.view("list.html", {
            section: section,
            title: (section == 'music') ? 'My CDs' : 'My ' + section,
            items: listContent
        });
    });
};

var getItem = function(request, reply) {
    var itemNumber = request.params.itemNumber;
    var section = request.path.split('/')[1];
    var itemsFile = section+".json";
    fs.readFile(itemsFile, "utf8", function(err, data) {
        if (err) { throw err }
        var listContent = JSON.parse(data);
        var pageData = {
                section: section,
                itemData: listContent[itemNumber]
            };
        if (section == 'music') {
            pageData.CD = true;
        } else if (section == 'books') {
            pageData.book = true;
        } else if (section == 'movies') {
            pageData.movie = true;
        }
        reply.view("item.html", pageData);
    });
};


server.route([
    { method: "GET", path: "/", handler: getWelcomePage } ,
    { method: "GET", path: "/books", handler: getList },
    { method: "GET", path: "/movies", handler: getList },
    { method: "GET", path: "/music", handler: getList },
    { method: "GET", path: "/books/{itemNumber}", handler: getItem },
    { method: "GET", path: "/movies/{itemNumber}", handler: getItem },
    { method: "GET", path: "/music/{itemNumber}", handler: getItem }
]);


server.route({ 
    method: "GET", 
    path: "/assets/{param*}", handler: { 
                                    directory: { 
                                        path: "public"
                                    } 
                                } 
});