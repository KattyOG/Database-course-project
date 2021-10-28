"use strict";

class kid{
    constructor(second_name, age){
        this.second_name = second_name;
        this.age = age;
    }
}

function kid_create(second_name, age){
    for (let i = 0; i < kids.length; i++){
        if (kids[i].second_name === second_name){
            console.log("This second_name already exists");
            return;
        }
    }
    kids.push(new kid(second_name, age));
}

function kid_read(){
    for (let i = 0; i < kids.length; i++)
        console.log("second name - " + kids[i].second_name + "\nage - " + kids[i].age + "\n")
}

function kid_update(second_name, new_name, new_age){
    for (let i = 0; i < kids.length; i++){
        if (kids[i].second_name === second_name){
            kids[i].second_name = new_name;
            kids[i].age = new_age;
        }
    }
}

function kid_delete(second_name){
    for (let i = 0; i < kids.length; i++){
        if (kids[i].second_name === second_name)
            kids.splice(i, 1);
    }
}

function avg_age(){
    let avg_age = 0;
    for (let i = 0; i < kids.length; i++)
        avg_age += kids[i].age;
    return avg_age / kids.length;
}

function kid_older(){
    let old = kids[0];
    for (let i = 1; i < kids.length; i++){
        if (kids[i].age > old.age)
            old = kids[i];
    }
    console.log(old.second_name, old.age);
}

function range(bottom, upper){
    for (let i = 0; i < kids.length; i++){
        if (bottom <= kids[i].age && kids[i].age <= upper)
            console.log(kids[i].second_name, kids[i].age);
    }
}

function first_letter(letter){
    for (let i = 0; i < kids.length; i++){
        if (kids[i].second_name[0] === letter)
            console.log(kids[i].second_name, kids[i].age);
    }
}

function bigger_name(letter){
    for (let i = 0; i < kids.length; i++){
        if (kids[i].second_name.length > letter)
            console.log(kids[i].second_name, kids[i].age);
    }
}

function vowel_name(){
    let vowels = "aeiouyAEIOUY";
    for (let i = 0; i < kids.length; i++){
        if (vowels.indexOf(kids[i].second_name[0]) != -1)
            console.log(kids[i].second_name, kids[i].age);
    }
}

let kids = [];

kid_create("Osborne", 6);
kid_create("Glass", 13);
kid_create("Higgins", 2);
kid_create("Floyd", 10);
kid_create("Hickman", 4);
kid_create("Baker", 16);
kid_create("Gibson", 9);
kid_read();
console.log("-----------------------------");

kid_update("Glass", "Moore", 7);
kid_read();
console.log("-----------------------------");

kid_delete("Floyd");
kid_read();
console.log("-----------------------------");

console.log("Average age - " + avg_age());
console.log("-----------------------------");

kid_older();
console.log("-----------------------------");

range(3, 6);
console.log("-----------------------------");

first_letter("G");
console.log("-----------------------------");

bigger_name(6);
console.log("-----------------------------");

vowel_name();
console.log("-----------------------------");

