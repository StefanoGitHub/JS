//asyncEach.js

var wait = require('./wait');

//@param list: An array to be processed
//@param iterator: A function called on each item of list; 
//                  it will expect an item and a function
//@param completed: A function to be called when all items are processed

    // ?? how do we know what parameter(s) completed is expecting???

var asyncEach = function(list, iterator, completed) {
    //counter variable to track completed items
    var counter = 0;
    //loop through list and increment counter each time
    list.forEach(function forEach(item, i) {
        //call the (async?) function on each item
        iterator(item, function doneOnItem(err, result) { 
            //when that function completes, increment counter
            counter++;
            if (counter == list.length) {
                //call completed when all items are done
                completed(err, result);
            }
        });
    });
};



var names = ["Alice", "Bob", "Carla"];
asyncEach(names, 
          function iterator(name, doneOnItem){
            wait(name, 
                 function(err, data) {
                    console.log("Hello " + data);
                    doneOnItem(err, data);
                 }
            );
          }, 
          function completed(err, data){
            if(err) {
                throw err;
            }
            console.log("Goodbye!");
          }
);



/*
arr.forEach(callbackfn[, thisArg])

- callbackfn: function(value, index, array1) {...}

- thisArg: [optional] The array object that contains the element, to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
*/