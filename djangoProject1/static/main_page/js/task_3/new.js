"use strict";
 
let obj = { id: 1, data: { name: "bob", surname : "brown"}}

let new_obj = JSON.parse(JSON.stringify(obj));

console.log(obj);
console.log(new_obj); 

function copy(obj){
    let obj1 = {};
    for(let key in obj){
        if (typeof obj[key] === 'object') {
            obj1[key] = copy(obj[key]);
        } else {
            obj1[key] = obj[key];
        }
    }
    return obj1;
}

let new_obj2 = copy(obj);
console.log(new_obj2);
obj.data.name = "katya";
console.log(obj);


