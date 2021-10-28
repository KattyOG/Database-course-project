"use strict";

class dot{
    constructor(name, x, y){
        this.name = name;
        this.x = x;
        this.y = y;
    }
}

function dot_create(name, x, y){
    for (let i = 0; i < dots.length; i++)
        if (dots[i].name === name){
            console.log("This name already exists\n");
            return;
        } 
    dots.push(new dot(name, x, y));
}

function dots_read(){
    for (let i = 0;  i < dots.length; i++)
        console.log("\nname - " + dots[i].name, "\nx - " + dots[i].x, "\ny - " + dots[i].y) + "\n";
}

function dot_update(name, new_x, new_y){
    for (let i = 0; i < dots.length; i++)
        if (dots[i].name === name){
            dots[i].x = new_x;
            dots[i].y = new_y;
        }
}

function dot_delete(name){
    for (let i = 0; i < dots.length; i++)
        if (dots[i].name  === name)
            dots.splice(i, 1);
}

function maximum_distance(){
    let dot1 = dots[0];
    let dot2 = dots[1];
    let max = Math.sqrt((dots[1].x - dots[0].x) * (dots[1].x - dots[0].x) +
                            (dots[1].y - dots[0].y) * (dots[1].y - dots[0].y))
    for (let i = 0; i < dots.length; i++){
        for (let j = 1; j < dots.length; j++){
             let dist = Math.sqrt((dots[j].x - dots[i].x) * (dots[j].x - dots[i].x) +
                                    (dots[j].y - dots[i].y) * (dots[j].y - dots[i].y))
            if (dist > max){
                max = dist
                dot1 = dots[i];
                dot2 = dots[j];
            }
        }
    }
    console.log("dot - " + dot1.name, "\nx - " + dot1.x, "\ny - " + dot1.y);
    console.log("\ndot - " + dot2.name, "\nx - " + dot2.x, "\ny - " + dot2.y);
    console.log("\nMaximum distance - " + max);
}

function near_dots(x, y, near_dist){
    for (let i = 0; i < dots.length; i++){
        let dist = Math.sqrt((x - dots[i].x) * (x - dots[i].x) +(y - dots[i].y) * (y - dots[i].y))
        if (dist <= near_dist)
            console.log("dot - " + dots[i].name, "\nx - " + dots[i].x, "\ny - " + dots[i].y);
    }
}

function location_axes(axis){
    switch (axis){
        case "OX" :
            for (let i = 0; i < dots.length; i++){
                if (dots[i].y > 0)
                    console.log("dot " + dots[i].name + " above OX");
                else if (dots[i].y < 0)
                    console.log("dot " + dots[i].name + " under OX");
                else
                    console.log("dot " + dots[i].name + " on the OX");
            }
            break;

        case "OY" :
            for (let i = 0; i < dots.length; i++){
                if (dots[i].x > 0)
                    console.log("dot " + dots[i].name + " right OY");
                else if (dots[i].x < 0)
                    console.log("dot " + dots[i].name + " left OY");
                else
                    console.log("dot " + dots[i].name + " on the OY");
            }
            break;
    }
}

function internal_points(x, y, dist_1, dist_2){
    for (let i = 0; i < dots.length; i++)
        if ((dots[i].x > x) && (dots[i].x < x + dist_1) && (dots[i].y < y) && (dots[i].y > y - dist_2))
            console.log("dot - " + dots[i].name, "\nx - " + dots[i].x, "\ny - " + dots[i].y) + "\n";
}

let dots = [];

dot_create("first", 10 , 10);
dot_create("second", 10, 20);
dot_create("third", 20, 20);
dot_create("fourth", 0, 0);
dot_create("fifth", -20, -20);
dot_create("sixth", -10, -20);
dot_create("seventh", -10, 10);
dots_read();
console.log("-----------------------------");

dot_update("fourth", 1, 1);
dots_read();
console.log("-----------------------------");

dot_delete("fourth");
dots_read();
console.log("-----------------------------");

maximum_distance();
console.log("-----------------------------");

near_dots(9, 9, 5);    
console.log("-----------------------------");

location_axes("OX"); 
location_axes("OY"); 
console.log("-----------------------------");

internal_points(0, 20, 20, 20);
console.log("-----------------------------");