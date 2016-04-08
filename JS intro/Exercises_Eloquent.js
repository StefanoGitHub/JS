/********************************************************************************
Chapter 2.1
Write a loop that makes seven calls to console.log to output the following triangle:
#
##
###
####
#####
######
#######

    SOLUTION:
    for (var line = "#"; line.length < 8; line += "#")
      console.log(line);
********************************************************************************/
var pounds = "";
for (var count=1; count<=7; count++){
    pounds += "#";
    console.log(pounds);
}


/********************************************************************************
Chapter 2.2
Write a program that uses console.log to print all the numbers from 1 to 100, with two 
exceptions. For numbers divisible by 3, print "Fizz" instead of the number, and for numbers 
divisible by 5 (and not 3), print "Buzz" instead.

When you have that working, modify your program to print "FizzBuzz", for numbers that are 
divisible by both 3 and 5 (and still print "Fizz" or "Buzz" for numbers divisible by only 
one of those).

    SOLUTION:
    for (var n = 1; n <= 100; n++) {
      var output = "";
      if (n % 3 == 0)
        output += "Fizz";
      if (n % 5 == 0)
        output += "Buzz";
      console.log(output || n);
    }
********************************************************************************/
for (var count=1; count<=100; count++){
    var output = "";
    if (count % 3 == 0) {
        output += "Fizz"; 
    }
    if (count % 5 == 0) {
        output += "Buzz";
    }
    if (output == "") {
        console.log(count);
    } else {
        console.log(output);
    }
}


/********************************************************************************
Chapter 2.3
Write a program that creates a string that represents an 8×8 grid, using newline characters
to separate lines. At each position of the grid there is either a space or a “#” character.
The characters should form a chess board.
Passing this string to console.log should show something like this:
 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #
When you have a program that generates this pattern, define a variable size = 8 and change
the program so that it works for any size, outputting a grid of the given width and height.

    SOLUTION:
    var size = 8;
    var board = "";
    for (var y = 0; y < size; y++) {
      for (var x = 0; x < size; x++) {
        if ((x + y) % 2 == 0)
          board += " ";
        else
          board += "#";
      }
      board += "\n";
    }
    console.log(board);
********************************************************************************/
var size = 16;
var grid = "";
for (var l=0; l<size; l++){
    //build line l
    for (var c=0; c<size; c++){
        //build column c
        if (l % 2 == 0) {
            //start with #
            if (c % 2 == 0) {
                grid += "#";
            } else {
                grid += "_";
            }
        } else {
            //start with _
            if (c % 2 == 0) {
                grid += "_";
            } else {
                grid += "#";
            }
        }
    }
    grid += "\n";
}

console.log(grid);



/********************************************************************************
Chapter 3.1
Write a function min that takes two arguments and returns their minimum.
********************************************************************************/
function min(a, b) {
    if (a >= b) { return b;}
    else { return a; }
}


/********************************************************************************
Chapter 3.2
Here’s another way to define whether a positive whole number is even or odd:
 Zero is even.
 One is odd.
 For any other number N, its evenness is the same as N - 2.
Define a recursive function isEven corresponding to this description. The function should 
accept a number parameter and return a Boolean.

    SOLUTION:
    function isEven(n) {
      if (n == 0)
        return true;
      else if (n == 1)
        return false;
      else if (n < 0)
        return isEven(-n);
      else
        return isEven(n - 2);
    }
********************************************************************************/
function isEven(n) {
    if (n < 0) { n *= -1; }
    if (n == 1) { return false; }
    if (n == 0) { return true; }
    return isEven(n-2); 
}

console.log(isEven(50));
// → true
//console.log(isEven(75));
// → false
//console.log(isEven(-1));
// → ??



/********************************************************************************
Chapter 3.3
Write a function countBs that takes a string as its only argument and returns a number that
indicates how many uppercase “B” characters are in the string.
Next, write a function called countChar that behaves like countBs, except it takes a second
argument that indicates the character that is to be counted (rather than counting only uppercase
“B” characters). Rewrite countBs to make use of this new function.

    SOLUTION:
    function countChar(string, ch) {
      var counted = 0;
      for (var i = 0; i < string.length; i++)
        if (string.charAt(i) == ch)
          counted += 1;
      return counted;
    }

    function countBs(string) {
      return countChar(string, "B");
    }
********************************************************************************/
function countBs(string) {
    var count = 0;
    for (var p=0; p<string.length; p++) {
        if (string.charAt(p) == "B") {
            count++;
        }
    }
    return count;  
}

function countChar(string, char) {
    var count = 0;
    for (var p=0; p<string.length; p++) {
        if (string.charAt(p) == char) {
            count++;
        }
    }
    return count;  
}

console.log(countBs("BBC"));
// → 2
console.log(countChar("kakkerlak", "k"));
// → 4



/********************************************************************************
Chapter 4.1
Write a range function that takes two arguments, start and end, and returns an array containing
all the numbers from start up to (and including) end.
Next, write a sum function that takes an array of numbers and returns the sum of these numbers.
Run the previous program and see whether it does indeed return 55.
As a bonus assignment, modify your range function to take an optional third argument that 
indicates the “step” value used to build up the array. If no step is given, the array elements
go up by increments of one, corresponding to the old behavior. The function call range(1, 10, 2)
should return [1, 3, 5, 7, 9]. Make sure it also works with negative step values so that 
range(5, 2, -1) produces [5, 4, 3, 2].

    SOLUTION:
    function range(start, end, step) {
      if (step == null) step = 1;
      var array = [];

      if (step > 0) {
        for (var i = start; i <= end; i += step)
          array.push(i);
      } else {
        for (var i = start; i >= end; i += step)
          array.push(i);
      }
      return array;
    }

    function sum(array) {
      var total = 0;
      for (var i = 0; i < array.length; i++)
        total += array[i];
      return total;
    }
********************************************************************************/
function range(start, end, step) {
    var array = [];
    var s = step ? step : 1
    if (s > 0) {
        var index = 0;
        for (var i = start; i <= end; i+=s) {
            array[index] = i;
            index++;
        }
    }
    else {
        var index = 0;
        for (var i = start; i >= end; i+=s) {
            array[index] = i;
            index++;
        }
    }
    return array;
}

function sum(array) {
    var s = 0;
    for (var i = 0; i < array.length; i++) {
        s += array[i];
    }
    return s;
}
console.log(sum(range(1, 10)));
// → 55
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]



/********************************************************************************
Chapter 4.2
Write two functions, reverseArray and reverseArrayInPlace. The first, reverseArray, takes 
an array as argument and produces a new array that has the same elements in the inverse order.
The second, reverseArrayInPlace, does what the reverse method does: it modifies the array given
as argument in order to reverse its elements. Neither may use the standard reverse method.

    SOLUTION:
    function reverseArray(array) {
      var output = [];
      for (var i = array.length - 1; i >= 0; i--)
        output.push(array[i]);
      return output;
    }

    function reverseArrayInPlace(array) {
      for (var i = 0; i < Math.floor(array.length / 2); i++) {
        var old = array[i];
        array[i] = array[array.length - 1 - i];
        array[array.length - 1 - i] = old;
      }
      return array;
    }
********************************************************************************/
function reverseArray(array){
    var revArr = [];
    for (var i = array.length-1; i >= 0 ; i--) {
        revArr[array.length-1 - i] = array[i];
    }
    return revArr;
}

function reverseArrayInPlace(array){
    var box;
    for (var i = 0; i < array.length/2 ; i++) {
        box = array[i];
        array[i] = array[array.length-1 - i];
        array[array.length-1 - i] = box;
    }
    return array;
}

console.log(reverseArray(["A", "B", "C", "d", 1, 2]));
// → ["C", "B", "A"];
var arrayValue = [1, 2, 3, 4, 5, 6, 7];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]



/********************************************************************************
Chapter 4.3
Write a function arrayToList that builds up a data structure like the previous one when 
given [1, 2, 3] as argument, and write a listToArray function that produces an array from 
a list. Also write the helper functions prepend, which takes an element and a list and 
creates a new list that adds the element to the front of the input list, and nth, which 
takes a list and a number and returns the element at the given position in the list, or 
undefined when there is no such element.
If you haven’t already, also write a recursive version of nth.

SOLUTION:
function arrayToList(array) {
  var list = null;
  for (var i = array.length - 1; i >= 0; i--)
    list = {value: array[i], rest: list};
  return list;
}

function listToArray(list) {
  var array = [];
  for (var node = list; node; node = node.rest)
    array.push(node.value);
  return array;
}

function prepend(value, list) {
  return {value: value, rest: list};
}

function nth(list, n) {
  if (!list)
    return undefined;
  else if (n == 0)
    return list.value;
  else
    return nth(list.rest, n - 1);
}
********************************************************************************/
function arrayToList(array) {
    var list = {}; 
    for (var i = 0; i < array.length; i++) {
        list.value = array[i];
        array.shift();
        if (array.length != 0) {
            list.rest = arrayToList(array);
        } else {
            list.rest = null;
        }
    }
    return list;
}

function listToArray(list) {
    var array = [];  
    function getFromNest(list) {
        if (list.value != null) {
            array.push(list.value);
        }
        if (list.rest != null) {
            getFromNest(list.rest);
        }
        return;
    }
    getFromNest(list);
    return array; 
}

function prepend(v, list) {
    var newList = {};
    newList.value = v;
    newList.list = list;
    list = newList;
    return list;
}

function nth(list, pos) {
    var value = undefined;
    if (pos == 0) {
        value = list.value;
    } else if (list.rest) {
        value = nth(list.rest, pos-1);
    } 
    return value;
}

console.log(arrayToList([10, 20, 30, 40]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20


/********************************************************************************
Chapter 4.4
Write a function, deepEqual, that takes two values and returns true only if they are the 
same value or are objects with the same properties whose values are also equal when 
compared with a recursive call to deepEqual.
To find out whether to compare two things by identity (use the === operator for that) or 
by looking at their properties, you can use the typeof operator. If it produces "object" 
for both values, you should do a deep comparison. But you have to take one silly 
exception into account: by a historical accident, typeof null also produces "object".

    SOLUTION:
    function deepEqual(a, b) {
      if (a === b) return true;

      if (a == null || typeof a != "object" ||
          b == null || typeof b != "object")
        return false;

      var propsInA = 0, propsInB = 0;

      for (var prop in a)
        propsInA += 1;

      for (var prop in b) {
        propsInB += 1;
        if (!(prop in a) || !deepEqual(a[prop], b[prop]))
          return false;
      }

      return propsInA == propsInB;
    }
********************************************************************************/
var obj = {here: {is: "an"}, object: 2};

function deepEqual(V1, V2) {
    if (typeof V1 == typeof V2) {
        if (typeof V1 == "object") {
            if (V1 == null || V2 == null) {
                if (V2 == V1) {return true; } //both null
                else { return false; } //different value 
            } else {
                //object, not null
                var check = false;
                for (var key in V1) {
                    if (typeof V2[key] != "undefined") {
                        check = deepEqual(V1[key], V2[key])
                        if (!check) { return false; }
                    } else { return false; } //not such an element
                }
                return check;
            }
        } else {
            //not object
            if (V1 === V2) { return true; } //EQUALS!
            else { return false; } //different values
        }
    } else { return false; } //different type
}

console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true

/********************************************************************************
Chapter 5.1
Use the reduce method in combination with the concat method to “flatten” an array of 
arrays into a single array that has all the elements of the input arrays.

    SOLUTION:
    var arrays = [[1, 2, 3], [4, 5], [6]];
    console.log(arrays.reduce(function(flat, current) {
      return flat.concat(current);
    }, []));
********************************************************************************/
var arrays = [[1, 2, 3], [4, 5], [6]];
var reducedArr = arrays.reduce(function(reduced, nextValue) {
    return reduced.concat(nextValue);
});

console.log(reducedArr); //reduce() generates a new array
// → [1, 2, 3, 4, 5, 6]


/********************************************************************************
Chapter 5.2
Using the example data set from this chapter, compute the average age difference between 
mothers and children (the age of the mother when the child is born). You can use the 
average function defined earlier in this chapter.
Note that not all the mothers mentioned in the data are themselves present in the array.
The byName object, which makes it easy to find a person’s object from their name, might 
e useful here.

    SOLUTION:
    var differences = ancestry.filter(function(person) {
      return byName[person.mother] != null;
    }).map(function(person) {
      return person.born - byName[person.mother].born;
    });
********************************************************************************/
var ancestry = JSON.parse("[\n  " + [
    '{"name": "Carolus Haverbeke", "sex": "m", "born": 1832, "died": 1905, "father": "Carel Haverbeke", "mother": "Maria van Brussel"}',
    '{"name": "Emma de Milliano", "sex": "f", "born": 1876, "died": 1956, "father": "Petrus de Milliano", "mother": "Sophia van Damme"}',
    '{"name": "Maria de Rycke", "sex": "f", "born": 1683, "died": 1724, "father": "Frederik de Rycke", "mother": "Laurentia van Vlaenderen"}',
    '{"name": "Jan van Brussel", "sex": "m", "born": 1714, "died": 1748, "father": "Jacobus van Brussel", "mother": "Joanna van Rooten"}',
    '{"name": "Philibert Haverbeke", "sex": "m", "born": 1907, "died": 1997, "father": "Emile Haverbeke", "mother": "Emma de Milliano"}',
    '{"name": "Jan Frans van Brussel", "sex": "m", "born": 1761, "died": 1833, "father": "Jacobus Bernardus van Brussel", "mother":null}',
    '{"name": "Pauwels van Haverbeke", "sex": "m", "born": 1535, "died": 1582, "father": "N. van Haverbeke", "mother":null}',
    '{"name": "Clara Aernoudts", "sex": "f", "born": 1918, "died": 2012, "father": "Henry Aernoudts", "mother": "Sidonie Coene"}',
    '{"name": "Emile Haverbeke", "sex": "m", "born": 1877, "died": 1968, "father": "Carolus Haverbeke", "mother": "Maria Sturm"}',
    '{"name": "Lieven de Causmaecker", "sex": "m", "born": 1696, "died": 1724, "father": "Carel de Causmaecker", "mother": "Joanna Claes"}',
    '{"name": "Pieter Haverbeke", "sex": "m", "born": 1602, "died": 1642, "father": "Lieven van Haverbeke", "mother":null}',
    '{"name": "Livina Haverbeke", "sex": "f", "born": 1692, "died": 1743, "father": "Daniel Haverbeke", "mother": "Joanna de Pape"}',
    '{"name": "Pieter Bernard Haverbeke", "sex": "m", "born": 1695, "died": 1762, "father": "Willem Haverbeke", "mother": "Petronella Wauters"}',
    '{"name": "Lieven van Haverbeke", "sex": "m", "born": 1570, "died": 1636, "father": "Pauwels van Haverbeke", "mother": "Lievijne Jans"}',
    '{"name": "Joanna de Causmaecker", "sex": "f", "born": 1762, "died": 1807, "father": "Bernardus de Causmaecker", "mother":null}',
    '{"name": "Willem Haverbeke", "sex": "m", "born": 1668, "died": 1731, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke"}',
    '{"name": "Pieter Antone Haverbeke", "sex": "m", "born": 1753, "died": 1798, "father": "Jan Francies Haverbeke", "mother": "Petronella de Decker"}',
    '{"name": "Maria van Brussel", "sex": "f", "born": 1801, "died": 1834, "father": "Jan Frans van Brussel", "mother": "Joanna de Causmaecker"}',
    '{"name": "Angela Haverbeke", "sex": "f", "born": 1728, "died": 1734, "father": "Pieter Bernard Haverbeke", "mother": "Livina de Vrieze"}',
    '{"name": "Elisabeth Haverbeke", "sex": "f", "born": 1711, "died": 1754, "father": "Jan Haverbeke", "mother": "Maria de Rycke"}',
    '{"name": "Lievijne Jans", "sex": "f", "born": 1542, "died": 1582, "father":null, "mother":null}',
    '{"name": "Bernardus de Causmaecker", "sex": "m", "born": 1721, "died": 1789, "father": "Lieven de Causmaecker", "mother": "Livina Haverbeke"}',
    '{"name": "Jacoba Lammens", "sex": "f", "born": 1699, "died": 1740, "father": "Lieven Lammens", "mother": "Livina de Vrieze"}',
    '{"name": "Pieter de Decker", "sex": "m", "born": 1705, "died": 1780, "father": "Joos de Decker", "mother": "Petronella van de Steene"}',
    '{"name": "Joanna de Pape", "sex": "f", "born": 1654, "died": 1723, "father": "Vincent de Pape", "mother": "Petronella Wauters"}',
    '{"name": "Daniel Haverbeke", "sex": "m", "born": 1652, "died": 1723, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke"}',
    '{"name": "Lieven Haverbeke", "sex": "m", "born": 1631, "died": 1676, "father": "Pieter Haverbeke", "mother": "Anna van Hecke"}',
    '{"name": "Martina de Pape", "sex": "f", "born": 1666, "died": 1727, "father": "Vincent de Pape", "mother": "Petronella Wauters"}',
    '{"name": "Jan Francies Haverbeke", "sex": "m", "born": 1725, "died": 1779, "father": "Pieter Bernard Haverbeke", "mother": "Livina de Vrieze"}',
    '{"name": "Maria Haverbeke", "sex": "m", "born": 1905, "died": 1997, "father": "Emile Haverbeke", "mother": "Emma de Milliano"}',
    '{"name": "Petronella de Decker", "sex": "f", "born": 1731, "died": 1781, "father": "Pieter de Decker", "mother": "Livina Haverbeke"}',
    '{"name": "Livina Sierens", "sex": "f", "born": 1761, "died": 1826, "father": "Jan Sierens", "mother": "Maria van Waes"}',
    '{"name": "Laurentia Haverbeke", "sex": "f", "born": 1710, "died": 1786, "father": "Jan Haverbeke", "mother": "Maria de Rycke"}',
    '{"name": "Carel Haverbeke", "sex": "m", "born": 1796, "died": 1837, "father": "Pieter Antone Haverbeke", "mother": "Livina Sierens"}',
    '{"name": "Elisabeth Hercke", "sex": "f", "born": 1632, "died": 1674, "father": "Willem Hercke", "mother": "Margriet de Brabander"}',
    '{"name": "Jan Haverbeke", "sex": "m", "born": 1671, "died": 1731, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke"}',
    '{"name": "Anna van Hecke", "sex": "f", "born": 1607, "died": 1670, "father": "Paschasius van Hecke", "mother": "Martijntken Beelaert"}',
    '{"name": "Maria Sturm", "sex": "f", "born": 1835, "died": 1917, "father": "Charles Sturm", "mother": "Seraphina Spelier"}',
    '{"name": "Jacobus Bernardus van Brussel", "sex": "m", "born": 1736, "died": 1809, "father": "Jan van Brussel", "mother": "Elisabeth Haverbeke"}'
].join(",\n  ") + "\n]");


var byName = {};
ancestry.forEach(function(person) {
    byName[person.name] = person;
});
function average(array) {
    function plus(a, b) { return a + b; }
    return array.reduce(plus) / array.length;
}

var ageDifference = [];
ancestry.forEach(function(person) {
    if (person.mother && byName[person.mother]) {
        ageDifference.push(person.born - byName[person.mother].born);
    }
});

console.log(average(ageDifference));
// → 31.2

/********************************************************************************
Chapter 5.3
Compute and output the average age of the people in the ancestry data set per century. 
A person is assigned to a century by taking their year of death, dividing it by 100, 
and rounding it up, as in Math.ceil(person.died / 100).

    SOLUTION:
    function groupBy(array, groupOf) {
      var groups = {};
      array.forEach(function(element) {
        var groupName = groupOf(element);
        if (groupName in groups)
          groups[groupName].push(element);
        else
          groups[groupName] = [element];
      });
      return groups;
    }

    var byCentury = groupBy(ancestry, function(person) {
      return Math.ceil(person.died / 100);
    });

    for (var century in byCentury) {
      var ages = byCentury[century].map(function(person) {
        return person.died - person.born;
      });
      console.log(century + ": " + average(ages));
    }
********************************************************************************/
var avgAges = {};
ancestry.forEach(function(person) {
    var century = Math.ceil(person.died / 100);
    var age = person.died - person.born;
    if (avgAges[century]) {
        avgAges[century] = (avgAges[century] + age) / 2;
    } else {
        avgAges[century] = age;
    }
});
console.log(avgAges);

/********* ALTERNATIVE *********************************************************/
var peoplePerCentury = {};
ancestry.forEach(function(person) {
    var century = Math.ceil(person.died / 100);
    if (!peoplePerCentury[century]) {
        peoplePerCentury[century] = []
        peoplePerCentury[century].push(person);
    } else {
        peoplePerCentury[century].push(person);
    }
});

var avgAges = {};
for (var century in peoplePerCentury) {
    var avgAge = 0;
    var ages = [];
    peoplePerCentury[century].forEach(function(person) {
        var age = person.died - person.born;
        ages.push(age);
    });
    avgAges[century] = ages.reduce(function(a, b){
        return (a+b)/2;
    });
};
console.log(avgAges);

// → 16: 43.5
//   17: 51.2
//   18: 52.8
//   19: 54.8
//   20: 84.7
//   21: 94
/////////////////
//   16 : 43.5
//   17 : 54.25
//   18 : 62.65426254272461
//   19 : 60.59375
//   20 : 85.78125
//   21 : 94


/********************************************************************************
Chapter 5.4
Write two functions, every and some, that behave like these methods, except that they 
take the array as their first argument rather than being a method.

    SOLUTION:
    function every(array, predicate) {
      for (var i = 0; i < array.length; i++) {
        if (!predicate(array[i]))
          return false;
      }
      return true;
    }

    function some(array, predicate) {
      for (var i = 0; i < array.length; i++) {
        if (predicate(array[i]))
          return true;
      }
      return false;
    }
********************************************************************************/
function every(array, f) {
    for (var i = 0; i < array.length; i++) {
        if (!f(array[i])) {
            return false; 
        }
    }
    return true;
}

function some(array, f) {
    for (var i = 0; i < array.length; i++) {
        if (f(array[i])) {
            return true; 
        }
    }
    return false;
}

console.log(every([NaN, NaN, NaN], isNaN));
// → true
console.log(every([NaN, NaN, 4], isNaN));
// → false
console.log(some([NaN, 3, 4], isNaN));
// → true
console.log(some([2, 3, 4], isNaN));
// → false

/********************************************************************************
Chapter 6.1
Write a constructor Vector that represents a vector in two-dimensional space. It takes 
x and y parameters (numbers), which it should save to properties of the same name.
Give the Vector prototype two methods, plus and minus, that take another vector as a 
parameter and return a new vector that has the sum or difference of the two vectors’ 
(the one in this and the parameter) x and y values.
Add a getter property length to the prototype that computes the length of the vector—that
is, the distance of the point (x, y) from the origin (0, 0).

    SOLUTION:
    function Vector(x, y) {
      this.x = x;
      this.y = y;
    }

    Vector.prototype.plus = function(other) {
      return new Vector(this.x + other.x, this.y + other.y);
    };

    Vector.prototype.minus = function(other) {
      return new Vector(this.x - other.x, this.y - other.y);
    };

    Object.defineProperty(Vector.prototype, "length", {
      get: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      }
    });
********************************************************************************/
//constructor
function Vector(X, Y) {
    this.x = X;
    this.y = Y;
    this.plus =  function(vector) {
        var newVector = new Vector;
        newVector.x = this.x + vector.x;
        newVector.y = this.y + vector.y;
        return newVector;
    };
    this.minus = function(vector) {
        var newVector = new Vector;
        newVector.x = this.x - vector.x;
        newVector.y = this.y - vector.y;
        return newVector;
    };
}
//getter definition
Object.defineProperty(Vector.prototype, "length", {
    get: function() { 
            return  Math.sqrt( Math.pow(this.x, 2) + 
                           Math.pow(this.y, 2)
                        );
        }
});

console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// → Vector{x: 3, y: 5}
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// → Vector{x: -1, y: -1}
console.log(new Vector(3, 4).length);
// → 5

/********************************************************************************
Chapter 6

********************************************************************************/



/********************************************************************************
Chapter 6

********************************************************************************/



/********************************************************************************
Chapter 6

********************************************************************************/