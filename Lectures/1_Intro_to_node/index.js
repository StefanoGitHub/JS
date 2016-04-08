

var fs = require("fs");

fs.writeFile("testfile.js", 'var text = "\'This space intentionally left blank.\'"; console.log(text);', function(err) {
    console.log("File written!");
});

var exec = require('child_process').exec,
    child;

child = exec('node testfile.js {{args}}',
             function (error, stdout, stderr) {
    console.log('from testfile.js: ' + stdout);
    //console.log('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
});