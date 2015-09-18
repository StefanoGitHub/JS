/*********************
EXERCISE 2
Write a program that accepts one or more numbers as command-line arguments and prints the sum of those numbers to the console (stdout).
*********************/
var array = process.argv;
var sum = 0;
for (var i=2; i < array.length; i++) {
    sum += Number(array[i]);
}
console.log(sum);

