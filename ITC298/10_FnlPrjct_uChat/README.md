# Final Project

The goal of the final project is to provide a portfolio piece for students: something that can be taken into interviews and serve as an example of a real, working (if somewhat basic) application. It'll be written using HapiJS on the server, and Backbone on the client, with a Grunt build process running alongside for JS packaging and CSS pre-processing.


## Project spec: Chat client

This application is a simple, browser-based chatroom, similar to IRC or Slack. It lets users exchange text messages in real time, and also indicates user status (entering the room, typing, leaving the room).

### Must-haves

* The user should be able to see new chat messages come in without refreshing the page, in real time.
* Users can type messages, and have them immediately sent to all other connected users.
* In addition to the chat window, a secondary panel lists all the current members of the room.
* In this panel, user presence should be shown: when someone enters, when they leave, and when they're typing.
* The server should retain at least several hundred lines of history, and allow users to scroll back into the history even before they were connected.

### Nice-to-haves

* Use websockets instead of AJAX to create instant chat communication
* Allow users to upload or insert images and other media into the chatroom
* Authenticate users and allow access only via administered accounts
* Store timestamped logs as long as the server is running
* Use the HTML5 notifications API to pop up messages even when the tab isn't visible


## Structure

How you structure your project is up to you, and will depend heavily on what your application does and your own personal preferences. It is a good chance to be creative, or to try out different approaches. However, I would propose the following folder structure, as inspired by the `NPM web site <https://github.com/npm/newww>`__, as a decent starting place:

* ``routes`` - contains an array of route definitions in an array, exported via ``module.exports``. You can then directly pass this to your server (e.g., ``server.route(require("./routes/routes"));``).
* ``handlers`` - contains all the handlers for your various routes, thus gluing models and views together. These should be required into your route definition via ``require()`` (e.g., ``handler: require("../handlers/moduleName")``).
* ``views`` - contains all the default layout template, as well as two subfolders...
* ``views/templates`` - for main view templates
* ``views/partials`` - for shared template fragments
* ``models`` - the most free-form folder, containing modules that load data and run business logic.
* ``src`` - contains pre-Grunt JS, CSS, and image assets.
* ``build`` - the directory folder containing Grunt output, and served from your static resource route.