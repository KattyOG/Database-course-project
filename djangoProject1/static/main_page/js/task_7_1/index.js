"use strict";

const express = require("express");
const request = require("request");
const app = express();
const port = 5000;
app.listen(port);
console.log("Server on port " + port);
const way = __dirname + "/static";
app.use(express.static(way));

app.use(function(res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

function sendPost(url, body, callback) {
    const headers = {};
    headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    headers["Connection"] = "close";
    request.post({
        url: url,
        body: body,
        headers: headers,
    }, function (error, body) {
        if(error) {
            callback(null);
        } else {
            callback(body);
        }
    });
}

app.get("/addCar", function(request, response) {
    const c = request.query.car;
    const p = request.query.price;
    
    sendPost("http://localhost:5002/insert/record", JSON.stringify({
        "car": c,
        "price": p
    }), function(answerString) {
        const answerObject = JSON.parse(answerString);
        const answer = answerObject.answer;
        response.end(answer);
    });
});

app.get("/getCar", function(request, response) {
    const c = request.query.car;
    
    sendPost("http://localhost:5002/select/record", JSON.stringify({
        "car": c
    }), function(answerString) {
        const answerObject = JSON.parse(answerString);
        const answer = answerObject.answer;
        response.end(answer);
    });
});

app.get("/addStore", function(request, response) {
    const n = request.query.store;
    const c = request.query.cars;
    console.log(n, c)
    sendPost("http://localhost:5004/insert/record", JSON.stringify({
        "car": n,
        "price": c
    }), function(answerString) {
        const answerObject = JSON.parse(answerString);
        const answer = answerObject.answer;
        response.end(answer);
    });
});

app.get("/getStore", function(request, response) {
    const w = request.query.a;
    sendPost("http://localhost:5004/select/record", JSON.stringify({
        store: w
    }), function(answerString) {
        const answerObject = JSON.parse(answerString);
        const answer = answerObject.answer;
        const out = []
        const arr = answer.split(" ")
        let count = 0;
        for (const elem of arr) {
            sendPost("http://localhost:5002/select/record", JSON.stringify({
                "car": elem
            }), function(answerString) {
                const answerObject = JSON.parse(answerString);
                const answer = answerObject.answer;
                console.log("!!!",answer)
                console.log(answer == "404, the car is unknown")
                if (answer === "404, the car is unknown") {
                    out.push(`{"car" : ${elem}, "price": "unknown"}`)
                }
                else
                    out.push(answer)
                if (++count === arr.length) {
                    console.log("<><>", out)
                    response.end(JSON.stringify(out));
                }
            });
        }
    });
});