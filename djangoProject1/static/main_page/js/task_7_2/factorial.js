"use strict";

let num = process.argv[2];
let i = 1;
let res = 1;
while(i <= num){
    res *= i;
    i++;
}
console.log(res);