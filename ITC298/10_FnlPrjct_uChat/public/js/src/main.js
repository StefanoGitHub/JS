/**
 * Created by Stefano on 11/08/15.
 */
//main.js

//require view and module
var ChatView = require('./chatView.js');
var ChatModel = require('./chatModel.js');

//create the model
var chatModel = new ChatModel();

//create the view and connect it to the model
var chatView = new ChatView({
    model: chatModel
});

//render the view into html file
chatView.render();
