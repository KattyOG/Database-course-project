"use strict";

function ajaxPost(urlString, bodyString, callback) {
    let r = new XMLHttpRequest();
    r.open("POST", urlString, true);
    r.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    r.send(bodyString);
    r.onload = function() {
        callback(r.response);
    }
}

function makeAction() {
    let mail = document.getElementById("mail").value;
    let surname = document.getElementById("surname").value;
    let phone = document.getElementById("phone").value;

    if(!mail || !surname || !phone) 
        return;

    ajaxPost("/save/info", JSON.stringify({mail, surname, phone}), function(answerString){
        const answerObject = JSON.parse(answerString);
        const result = answerObject.result;
        alert(result);
    });
}