//index.jsonp

//function declaration
var f = function(y) {
    var x = y;
    x += 10;
    return x;
};

var x = f(1); // x == 13

//function that takes a function in
var g = function(fn) {
    var result = fn(1); //calling fn
    console.log(result); // log: 11
};

//pass f to g, not calling f
g(f);





//currying
//function that returns a function
var adder = function(first) {
    return function(second) { // closure
        return first + second;
    }
};

var add5 = adder(5);
add5(10); //returns 15
add5(3); //returns 8

var add2 = adder(2);
add2(2); //returns 4

adder(3)(5); //returns 8


