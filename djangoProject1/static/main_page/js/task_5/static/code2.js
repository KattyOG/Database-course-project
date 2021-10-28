"use strict";

window.onload = function() {
    const f1 = document.getElementById("fmail");
    const btn = document.getElementById("fbtn");
    const label = document.getElementById("result");
    const mailLabel = document.getElementById("mail");
    const nameLabel = document.getElementById("surname");
    const phoneLabel = document.getElementById("phone");

    function ajaxGet(urlString, callback) {
        let r = new XMLHttpRequest();
        r.open("GET", urlString, true);
        r.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        r.send(null);
        r.onload = function() {
            callback(r.response);
        };
    };

    btn.onclick = function() {
        const mail = f1.value;
        const url = `/get_info?mail=${mail}`;
        ajaxGet(url, function(stringAnswer) {
            const objectAnswer = JSON.parse(stringAnswer);
            const result = objectAnswer.result;
            if (result === "failure") {
                label.innerHTML = `Not found`;
            }
            else  {
                label.innerHTML = `Personal data:`
                mailLabel.innerHTML = `Mail - ${objectAnswer.mail}`
                nameLabel.innerHTML = `Surname - ${objectAnswer.name}`
                phoneLabel.innerHTML = `Number - ${objectAnswer.phone}`;
            }
        });
    };
};