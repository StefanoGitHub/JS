//combined.js

var fs = require('fs');
var async = require('async');
var request = require('request');

var list = [];
//if() {fs.mkdirSync('pages');}

fs.readFile('urls.txt', 'utf8', function(error, text) {
    list = text.split('\n');
    async.each(list, function(url, callback) {
        if (url == '')  {
            return callback();
        }
        var fileName = url.split('//').pop().split('.').shift();
        var output = fs.createWriteStream('pages/' + fileName + '.html');
        console.log(fileName + '.html created...');
        var req = request.get(url)
        req.pipe(output);
        req.on('end', callback);
    }, function(error) {
        if (error) {
            console.log('Error');
        } else {
            console.log('Done!');
        }   
    }); //end async.each
}); //end readFile