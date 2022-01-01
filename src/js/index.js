"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.show = exports.frame = exports.mode = void 0;
const GameAudio = require("./audio");
const game_1 = require("./game");
const start_btn = document.querySelector("#start_btn");
const SCP_173_btn = document.querySelector("#SCP-173_btn");
const tutor_btn = document.querySelector("#tutor_btn");
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
tutor_btn.addEventListener("click", () => {
    show("tutor");
});
restart_btn.addEventListener("click", () => {
    (0, game_1.openMap)(map);
});
menu_btn.addEventListener("click", () => {
    show("menu");
});
exports.mode = "default";
exports.frame = "menu";
let oldElem = "menu";
function show(elemId) {
    exports.frame = elemId;
    document.querySelectorAll("body > div").forEach(e => e.style.display = "none");
    document.querySelector(`body > div#${elemId}`).style.display = "flex";
    if (elemId == "game") {
        (0, game_1.openMap)(map);
        GameAudio.GameAudio["Music"].stop();
        GameAudio.GameAudio["Anxious-Humming"].play();
    }
    else if (elemId == "menu") {
        GameAudio.GameAudio["Anxious-Humming"].stop();
        GameAudio.GameAudio["Music"].play();
    }
    oldElem = elemId;
}
exports.show = show;
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
document.addEventListener("keydown", e => {
    if (e.code == "Escape")
        return (0, game_1.exit)();
});
