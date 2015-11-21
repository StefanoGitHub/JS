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
/*
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
 */
            hapi: {
                //any html
                files: [ "public/js/main.js", "public/js/chatView.js", "public/js/chatModel.js"],
                //no tasks -> just live reload
                tasks: ["browserify"]
            },

            everything: {
                //any html
                files: [ "public/css/*.css", "views/**/*.html", "*.js", "handlers/*.js" ],
                //no tasks -> just live reload
                tasks: []
            },

            //option valid for all targets
            options: { livereload: true }
        },

        browserify: {
            //browserify generates a single js file from the different js files in the js folder
            dist: {
                src: "public/js/main.js",
                dest: "public/js/bundle.js"
            }
        }
    });

    //default task(s), executed when run "$ grunt"
    grunt.registerTask("default", ["concurrent", "browserify"]);
    //grunt.registerTask("default", "concurrent");


};