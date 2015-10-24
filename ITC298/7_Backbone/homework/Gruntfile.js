//Gruntfile.js

//1. First step install global version -> $ (sudo) npm install grunt-cli -g
//2. Install local version (inside project folder) -> $ npm install grunt --save

module.exports = function(grunt) {
    //custom task
    grunt.registerTask("hello", function() {
        console.log("Hello from Grunt!");
        //grunt.file.write("build/test.txt", "This file is written sync");
    })
    
    //npm install grunt-autoprefixer --save
    //grunt.loadNpmTasks("grunt-autoprefixer"); //to run: $ grunt autoprefixer
    //npm install grunt-contrib-watch --save
    grunt.loadNpmTasks("grunt-contrib-watch"); //to run: $ grunt watch
    //$ npm install hapi grunt-concurrent grunt-nodemon --save
    //grunt.loadNpmTasks("grunt-concurrent"); //to run: $ grunt concurrent
    //grunt.loadNpmTasks("grunt-nodemon"); //to run: $ grunt nodemon

    grunt.loadNpmTasks('grunt-browserify');

    //config Grunt with an obj
    grunt.initConfig({
        //concurrent runs simultaneous tasks
        //concurrent: {
        //    dev: {
        //        //tasks to be executed simultaneously
        //        tasks: ["nodemon", "watch"],
        //        options: { logConcurrentOutput: true } // logs error from both tasks
        //    }
        //},
        //nodemon: {
        //    //nodemon starts the server and restart it after every chenge
        //    dev: { script: "index.js" }
        //},
        //property obj for the watch task
        watch: {
            //watch performs defined tasks whenever changes are saved in matching files
            options: { livereload: true }, //option valid for all targets
            prefix: {
                //target files to keep under control
                //globbing-patterns: http://gruntjs.com/configuring-tasks#globbing-patterns
                files: "js/*js",
                //when they change, execute this task
                tasks: ["autoprefixer"]
            },
            html: {
                //any html
                files: "**/*.html",
                //no tasks -> just live reload
                tasks: []
            }
        }//,
        //autoprefixer processes CSS file(s) adding browser prefixes 
        //autoprefixer: {
        //    dev: {
        //        expand: true,
        //        flatten: true,
        //        // Targetc file(s)
        //        src: "src/css/**/*.css",
        //        dest: "build/css/"
        //    }
        //}
    });
    
    //default task(s), executed when run "$ node grunt"
    grunt.registerTask("default", ["concurrent", "autoprefixer"]);
    
};