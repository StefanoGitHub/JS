var fs = require('fs');

module.exports = function (path, ext, callback) {
    
    fs.readdir(path, function (err, files) {
        if (err) {
            return callback(err);
        } else {
            var matchFiles = files.filter(function (file) {
                var split = file.split(".");
                return split.length > 1 && split.pop() == ext;
            });
            //console.log(match, ext, "\n"+path);
            return callback(err, matchFiles);
        }
    });
    
};