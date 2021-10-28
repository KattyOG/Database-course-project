"use strict";

const express = require("express");
const fs = require("fs");
const app = express();
const port = 5004;
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
            return elem.store === car
        })) {
            response.end(JSON.stringify({
                answer: "Store already exists"
            }));
        } else {
            fObj.push({"store": car, "cars": price})
            
            fs.writeFileSync("./file.txt", JSON.stringify(fObj));
            response.end(JSON.stringify({
                answer: "The store was added"
            }));
        }
    });
});

app.post("/select/record", function(request, response) {
    loadBody(request).then( (body) => {
        const obj = JSON.parse(body);
        const warehouse = obj.store;
        let contentString = fs.readFileSync("./file.txt", "utf-8");
        let answerString = '404, this store is unknown';

        if (contentString != '') {
            let obj1 = JSON.parse(contentString);
            for (let i = 0; i < obj1.length; i++) {
                if (obj1[i].store === warehouse) {
                    answerString = ``;
                    const temp = obj1[i].cars.split(",")
                    for (let j = 0; j < temp.length; j++) {
                        answerString += `${temp[j]}`;
                    }
                    break;
                }
            }
        }
        response.end(JSON.stringify({
            answer: answerString
        }));
    });
});