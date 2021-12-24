import * as GameAudio from "./audio";
import { exit, openMap } from "./game";

const start_btn = document.querySelector("#start_btn") as HTMLButtonElement;
const SCP_173_btn = document.querySelector("#SCP-173_btn") as HTMLButtonElement;
const tutor_btn = document.querySelector("#tutor_btn") as HTMLButtonElement;

const restart_btn = document.querySelector("#restart_btn") as HTMLButtonElement;
const menu_btn = document.querySelector("#menu_btn") as HTMLButtonElement;

const mapsElem = document.querySelector("#maps") as HTMLElement;
const mapPreviewElem = document.querySelector("#mapPreview") as HTMLImageElement;
const versionElem = document.querySelector("#version") as HTMLButtonElement;

const musicElem = document.querySelector("#music") as HTMLElement;
const soundElem = document.querySelector("#sound") as HTMLElement;


start_btn.addEventListener("click", () => {
    mode = "default";
    show("game");
});
SCP_173_btn.addEventListener("click", () => {
    mode = "SCP-173";
    show("game");
});
tutor_btn.addEventListener("click", () => {
    show("tutor");
});

restart_btn.addEventListener("click", () => {
    openMap(map);
});

menu_btn.addEventListener("click", () => {
    show("menu");
});

export let mode: "default" | "SCP-173" = "default";
export let frame: MainElements = "menu";

type MainElements = "menu" | "game" | "tutor";

let oldElem: MainElements = "menu";
export function show(elemId: MainElements) {
    frame = elemId;
    document.querySelectorAll<HTMLElement>("body > div").forEach(e => e.style.display = "none");
    (document.querySelector(`body > div#${elemId}`) as HTMLDivElement).style.display = "flex";

    if (elemId == "game") {
        openMap(map);
        GameAudio.GameAudio["Music"].stop();
        GameAudio.GameAudio["Anxious-Humming"].play();
    } else if (elemId == "menu") {
        GameAudio.GameAudio["Anxious-Humming"].stop();
        GameAudio.GameAudio["Music"].play();
    }

    oldElem = elemId;
}


for (let i = 0; i < 4; i++) {
    mapsElem.insertAdjacentHTML("beforeend", `<span${i == 0 ? ` class="active"` : ""}>${i + 1}<span>`);
}

let map = 0;
(() => {
    document.querySelectorAll<HTMLSpanElement>("#maps > span").forEach((span, i) => {
        span.onclick = () => {
            document.querySelector("#maps > span.active")?.classList.remove("active");
            span.classList.add("active");
            map = i;
        }
        span.onmouseover = () => {
            mapPreviewElem.src = `./src/maps/${i}.png`;
            mapPreviewElem.style.left = `${span.offsetLeft + span.offsetWidth / 2}px`;
            mapPreviewElem.style.top = `${span.offsetTop + span.offsetHeight + 10}px`;
        }
        span.onmouseout = () => {
            mapPreviewElem.src = "";
        }
    });
})();

fetch("./package.json").then(d => d.json().then(p => {
    versionElem.innerHTML = p.version;
}));

musicElem.onclick = () => {
    if (musicElem.classList.contains("a")) {
        musicElem.classList.remove("a");
        GameAudio.MusicDisable();
    } else {
        musicElem.classList.add("a");
        GameAudio.MusicEnable();
    }
}
soundElem.onclick = () => {
    if (soundElem.classList.contains("a")) {
        soundElem.classList.remove("a");
        GameAudio.SoundDisable();
    } else {
        soundElem.classList.add("a");
        GameAudio.SoundEnable();
    }
}
GameAudio.SoundEnable();




document.addEventListener("keydown", e => {
    if (e.code == "Escape") return exit();
});