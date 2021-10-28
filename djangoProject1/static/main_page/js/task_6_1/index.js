"use strict";

const express = require("express");
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);
app.set("view engine", "hbs");

app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/page/games", function(request, response){
    const age = (request.query['age']);
    let need_games = [];
    for (const game of games_list){
        if (parseInt(game.age) < parseInt(age))
            need_games.push(game);
    }
    const infoObject = {
        need_games
    };
    response.render("page_games.hbs", infoObject);
});

let games_list = [
    {
        name: "Half-Life", 
        desc: "It is a first-person shooter video game. The core gameplay consists of fighting alien and human enemies with a variety of weapons and solving puzzles.", 
        age: "18"
    },
    {
        name: "Minecraft",
        desc:"It is a sandbox video game.",
        age: "14"
    },
    {
        name: "Factorio",
        desc:"It is a construction and management simulation game focused on resource-gathering with real-time strategy and survival elements and influences. The player survives by locating and harvesting resources to craft various tools and mac.",
        age: "12"
    },
    {
        name: "Plants vs. Zombies",
        desc:"It is a tower defense and strategy video game.The player protects his house from zombie attacks by placing various plants on the lawn next to the house.",
        age: "8"
    }
];