"use strict";

const express = require("express");
const fs = require("fs");
const app = express();
const port = 5002;
app.listen(port);
console.log("Server on port " + port);

app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

function loadBody(request) {
    return new Promise( (resolve, reject) => {
        let body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            resolve(body);
        });
    })
}

app.post("/insert/record", function(request, response) {
    loadBody(request).then( (body) => {
        const obj = JSON.parse(body);

        const car = obj.car;
        const price = obj.price;

        let fObj = JSON.parse(fs.readFileSync("./file.txt", "utf-8"))
        if (fObj.some((elem) => {
            return elem.car === car
        })) {
            response.end(JSON.stringify({
                answer: "Car already exists"
            }));
        } else {
            fObj.push({"car": car, "price": price})
            
            fs.writeFileSync("./file.txt", JSON.stringify(fObj));
            response.end(JSON.stringify({
                answer: "The car was added"
            }));
        }
    });
});

app.post("/select/record", function(request, response) {
    loadBody(request).then( (body) => {
        const obj = JSON.parse(body);

        const car = obj.car;
        let ind = 0
        console.log(car)

        let fObj = JSON.parse(fs.readFileSync("./file.txt", "utf-8"))
        if (fObj.some((elem, index) => {
            ind = index
            return elem.car === car
        })) {
            response.end(JSON.stringify(
                {answer: JSON.stringify(fObj[ind])}));
        } else {
            response.end(JSON.stringify({
                answer: "404, the car is unknown"
            }));
        }
    });
});
