var wait = function (input, callback) {
    setTimeout(function() {
        //after timeout calls callback passing input
        callback(null, input);
    }, Math.round(Math.random() * 1000));
};

module.exports = wait;


/*********************
whould this work?
********************* /
var wait = function (delay, callback, inputs[]) {
    setTimeout(callback(null, inputs[]), Math.round(Math.random() * delay));
};

*/