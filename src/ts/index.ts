import { exit, openMap } from "./game";

const start_btn = document.querySelector("#start_btn") as HTMLButtonElement;
const restart_btn = document.querySelector("#restart_btn") as HTMLButtonElement;
const menu_btn = document.querySelector("#menu_btn") as HTMLButtonElement;


start_btn.addEventListener("click", () => {
    show("game");
});

restart_btn.addEventListener("click", () => {
    openMap(1);
});

menu_btn.addEventListener("click", () => {
    show("menu");
});

function show(elemId: "menu" | "game") {
    document.querySelectorAll<HTMLElement>("body > div").forEach(e => e.style.display = "none");
    (document.querySelector(`body > div#${elemId}`) as HTMLDivElement).style.display = "block";

    if (elemId == "game") {
        openMap(0);
    } else if (elemId == "menu") {
        exit();
    }
}