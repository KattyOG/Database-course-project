"use strict";

const express = require("express");
const fs = require("fs");
const app = express();
const port = 5000;
app.listen(port);
const way = __dirname + "/static";
app.use(express.static(way));

app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

app.post("/save/info", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        let mail = obj["mail"];
        let surname = obj["surname"];
        let phone = obj["phone"];
        let contentString = `mail:${mail},surname:${surname},phone:${phone}`;
        if (!mails.includes(mail) && !phones.includes(phone)) {
            fs.appendFileSync(way + "/file.txt", contentString + "\n");
            mails.push(mail);
            phones.push(phone);
            response.end(JSON.stringify({
                result: "save"
            }));
        }
        else {
            response.end(JSON.stringify({
                result: "save error"
            }));
        }
    });
});

let content = fs.readFileSync(way + "/file.txt", "utf8").split(/[,\n]/);
let mails = [];
let phones = [];
for(let i = 0; i < content.length; i += 3){
    mails.push(content[i].slice(5,));
    if (i + 2 < content.length)
        phones.push(content[i + 2].slice(6,));
}


app.get("/get_info", function(request, response) {
    const mail = request.query.mail;
    const mailIndex = content.indexOf("mail:" + mail);
    if (mailIndex === -1) {
        response.end(JSON.stringify({
            result: "failure"
        }))
    }
    else {
        response.end(JSON.stringify({
            result: "success",
            mail: mail,
            name: content[mailIndex + 1].slice(8,),
            phone: content[mailIndex + 2].slice(6,),
        }));
    }
});