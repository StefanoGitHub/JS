//grep.js

//1. Get the listing of all files in the directory, using the fs.readdir function.
//2. Use the async module to log the name of each file, then log "all finished" when done.
//3. For each file, open a stream, and log each line to the console, preceded by the filename.
//4. Check each line for "needle" and add the file to an array of matches, logged out at the end.
//5. As a bonus, use async.filter to create the array of matches.

var fs = require("fs");
var async = require('async');
var byline = require('byline');

var matches = [];

fs.readdir('haystack', function(error, files) {
    async.each(files, function(file, callback1){
        //exclude OSX file(s)
        if (file.indexOf('.') == 0) {
            return callback1();    
        }
        //logging file names
        console.log('Checking ' + file + '...');
        var rStream = fs.createReadStream('haystack/' + file, {'encoding': 'utf8'});
        //reading files
        rStream.on('data', function(data) {
            var lines = data.split('\n').filter(function(line) {
                return line != '';
            });
            //searching 'needle' in each line
            async.each(lines, function(line, callback2) {
                var found = line.toLowerCase().indexOf('needle');
                if (found >= 0) {
                    //console.log('!!!!! MATCH !!!!!!');
                    console.log('\n' + file + ': \t', line + '\n');
                    matches.push(file);
                    callback2();
                //} else {
                    //console.log('\n' + file + ': \t', line + '\n');
                }
            });
        });
        rStream.on('end', function() {
            //console.log('end');
            callback1();    
        });
    }, function(err){
        if (err) {
            console.log('!!Error!!');
        } else {
            //logging the result
            console.log('RESULT:', '\n"needle" found in:', matches.toString(), '\n\n\n');
        }   
    });
});


