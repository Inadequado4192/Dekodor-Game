"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frame = exports.mode = void 0;
const GameAudio = require("./audio");
const game_1 = require("./game");
const start_btn = document.querySelector("#start_btn");
const SCP_173_btn = document.querySelector("#SCP-173_btn");
const restart_btn = document.querySelector("#restart_btn");
const menu_btn = document.querySelector("#menu_btn");
const mapsElem = document.querySelector("#maps");
const mapPreviewElem = document.querySelector("#mapPreview");
const versionElem = document.querySelector("#version");
const musicElem = document.querySelector("#music");
const soundElem = document.querySelector("#sound");
start_btn.addEventListener("click", () => {
    exports.mode = "default";
    show("game");
});
SCP_173_btn.addEventListener("click", () => {
    exports.mode = "SCP-173";
    show("game");
});
restart_btn.addEventListener("click", () => {
    game_1.openMap(map);
});
menu_btn.addEventListener("click", () => {
    show("menu");
});
exports.mode = "default";
exports.frame = "menu";
function show(elemId) {
    exports.frame = elemId;
    document.querySelectorAll("body > div").forEach(e => e.style.display = "none");
    document.querySelector(`body > div#${elemId}`).style.display = "flex";
    if (elemId == "game") {
        game_1.openMap(map);
    }
    else if (elemId == "menu") {
        game_1.exit();
    }
}
for (let i = 0; i < 4; i++) {
    mapsElem.insertAdjacentHTML("beforeend", `<span${i == 0 ? ` class="active"` : ""}>${i + 1}<span>`);
}
let map = 0;
(() => {
    document.querySelectorAll("#maps > span").forEach((span, i) => {
        span.onclick = () => {
            document.querySelector("#maps > span.active")?.classList.remove("active");
            span.classList.add("active");
            map = i;
        };
        span.onmouseover = () => {
            mapPreviewElem.src = `./src/maps/${i}.png`;
            mapPreviewElem.style.left = `${span.offsetLeft + span.offsetWidth / 2}px`;
            mapPreviewElem.style.top = `${span.offsetTop + span.offsetHeight + 10}px`;
        };
        span.onmouseout = () => {
            mapPreviewElem.src = "";
        };
    });
})();
fetch("./package.json").then(d => d.json().then(p => {
    versionElem.innerHTML = p.version;
}));
musicElem.onclick = () => {
    if (musicElem.classList.contains("a")) {
        musicElem.classList.remove("a");
        GameAudio.MusicDisable();
    }
    else {
        musicElem.classList.add("a");
        GameAudio.MusicEnable();
    }
};
soundElem.onclick = () => {
    if (soundElem.classList.contains("a")) {
        soundElem.classList.remove("a");
        GameAudio.SoundDisable();
    }
    else {
        soundElem.classList.add("a");
        GameAudio.SoundEnable();
    }
};
GameAudio.SoundEnable();
