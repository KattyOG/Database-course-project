"use strict";

const express = require("express");
const fs = require("fs");
const cookieSession = require("cookie-session");
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cookieSession({
    name: 'session',
    keys: ['hhh', 'qqq', 'vvv'],
    maxAge: 24 * 60 * 60 * 1000 * 365
}));

app.get("/api/save", function(request, response) {
    const login = request.query.login;
    const password = request.query.password;
    if(!login) return response.end("Login not set");
    if(!password) return response.end("Password not set");
    request.session.login = login;
    request.session.password = password;
    response.end("Set cookie ok");
});

app.get("/api/get", function(request, response){
    const login = request.query.login;
    const password = request.query.password;
    if (login !== request.session.login) { return response.end("Uknown login") }
    if (password !== request.session.password) { return response.end("Uknown password") }
    const fd = fs.readFileSync("users.json", "utf8")
    let user = JSON.parse(fd);
    for (let i in user){
        if (login === user[i].login && password === user[i].password){
            let hobby = user[i].hobby;
            let age = user[i].age;
            response.end(JSON.stringify({login, hobby, age}));
        }
    }
});

app.get("/api/delete", function(request, response) {
    request.session = null;
    response.end("Delete cookie ok");
});