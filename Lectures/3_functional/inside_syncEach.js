//syncEach.js 

//@param list: An array to be processed
//@param f: A function called on each item of list; 
//          f is passed an item and its index
var each = function(list, fn) {
    //loop through list
    for (var i = 0; i < list.length; i++) {
        //call fn with the item and the index
        fn(list[i], i);
    }
};

var names = ["Alice", "Bob", "Carla"];
var greet = function(name, index) {
    console.log("Hello " + name + " (#" + index + ")");
};

each(names, greet); //logs "Hello Alice", "Hello Bob", "Hello Carla"
