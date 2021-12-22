"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("./game");
const start_btn = document.querySelector("#start_btn");
const restart_btn = document.querySelector("#restart_btn");
const menu_btn = document.querySelector("#menu_btn");
start_btn.addEventListener("click", () => {
    show("game");
});
restart_btn.addEventListener("click", () => {
    game_1.openMap(1);
});
menu_btn.addEventListener("click", () => {
    show("menu");
});
function show(elemId) {
    document.querySelectorAll("body > div").forEach(e => e.style.display = "none");
    document.querySelector(`body > div#${elemId}`).style.display = "block";
    if (elemId == "game") {
        game_1.openMap(0);
    }
    else if (elemId == "menu") {
        game_1.exit();
    }
}
