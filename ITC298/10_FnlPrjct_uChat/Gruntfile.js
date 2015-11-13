/**
 * Created by Stefano on 11/08/15.
 */
//Gruntfile.js

module.exports = function(grunt) {

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-concurrent");
    grunt.loadNpmTasks("grunt-nodemon");
    grunt.loadNpmTasks('grunt-browserify');

    //config Grunt with an obj
    grunt.initConfig({

        concurrent: {
            //concurrent runs simultaneous tasks
            dev: {
                //tasks to be executed simultaneously
                tasks: [ "nodemon", "watch" ],
                options: { logConcurrentOutput: true } // logs error from both tasks
            }
        },

        nodemon: {
            //nodemon starts the server and restart it after every change
            dev: {
                script: "server.js"
            }
        },

        watch: {
            //watch performs defined tasks whenever changes are saved in matching files
            html: {
                //any html
                files: "views/*.html",
                //no tasks -> just live reload
                tasks: []
            },
            bundle: {
                //any html
                files: ["public/js/bundle.js", "*.js", "css/*.css"],
                //no tasks -> just live reload
                tasks: []
            },
            js: {
                //any html
                files: "public/js/src/*.js",
                //no tasks -> just live reload
                tasks: ["browserify"]
            },
            //option valid for all targets
            options: { livereload: true }
        },

        browserify: {
            //browserify generates a single js file from the different js files in the js/src/ folder
            dist: {
                src: "public/js/src/main.js",
                dest: "public/js/bundle.js"
            }
        }
    });

    //default task(s), executed when run "$ grunt"
    grunt.registerTask("default", ["concurrent", "browserify"]);

};