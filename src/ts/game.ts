import { GameAudio, musicEnable, soundEnable } from "./audio";
import * as Dekodor from "./Dekodor";
import * as Player from "./Player";
import { DirectionKeys } from "./global";
import * as Objects from "./objects";
import { getDirection, getObject, getRGBA, setRGBA } from "./methods";
import { mode } from ".";

let musicPlayed = false;
export async function openMap(map: number) {
    GameAudio["Music"].stop();
    alertElem.style.display = "none";
    init();

    let img = new Image();
    img.src = URL.createObjectURL(await (await fetch(`./src/maps/${map}.png`)).blob());
    img.onload = () => {
        let canvas = document.createElement("canvas");
        let ctx = (canvas.getContext("2d") as CanvasRenderingContext2D);
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        currentMapSize = [img.width, img.height];
        currentMap = ctx.getImageData(0, 0, img.width, img.height).data;

        c_map.width = img.width;
        c_map.height = img.height;
        ctx_map.imageSmoothingEnabled = false;


        if (!musicPlayed && musicEnable) GameAudio["Anxious-Humming"].play(), musicPlayed = true;


        document.onkeydown = e => {
            e.code == "ShiftLeft" && (shitKet = true);
            if (!Player.character) return;

            if (DirectionKeys.includes(e.code as any)) Player.move.add(getDirection(e.code));

        }
        document.onkeyup = e => {
            e.code == "ShiftLeft" && (shitKet = false);
            if (DirectionKeys.includes(e.code as any) && Player.move.has(getDirection(e.code))) Player.move.delete(getDirection(e.code));
        }
        loop();
    }
}
export let shitKet: boolean = false;

function init() {
    Player.init();
    Dekodor.init();

    SkullCountPick = 0;
    SkullCount = 1;
    SkullCountInit = false;
    _stop = false;
    shitKet = false;
}

export function exit() {
    _stop = true;
}

export let currentMapSize: [w: number, h: number];
export let currentMap: Uint8ClampedArray;


const c = document.querySelector("#canvas") as HTMLCanvasElement;
const c_s = document.querySelector("#mask") as HTMLCanvasElement;
const c_map = document.querySelector("#map") as HTMLCanvasElement;
const ctx = c.getContext("2d") as CanvasRenderingContext2D;
const ctx_s = c_s.getContext("2d") as CanvasRenderingContext2D;
const ctx_map = c_map.getContext("2d") as CanvasRenderingContext2D;


function canvasResize() {
    c.width = innerWidth;
    c.height = innerHeight;
    ctx.imageSmoothingEnabled = false;

    c_s.width = innerWidth;
    c_s.height = innerHeight;
    ctx_s.imageSmoothingEnabled = false;

    ctx_map.imageSmoothingEnabled = false;
}; canvasResize();
window.addEventListener("resize", canvasResize);


const SPRITE = new Image();
SPRITE.src = "./sprite.png";
let fpsInterval = 1000 / 60, then = Date.now();


let _fps = 0;
let _stop = false;
function loop() {
    if (_stop) return;
    let now = Date.now();
    let elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        Player.playerMove();
        Dekodor.AI();
        draw();
        !SkullCountInit && (SkullCountInit = true);
        updateCamera();
        _fps++;
    }
    requestAnimationFrame(loop);
}

export let SkullCountPick = 0;
export function addSkullCountPick() { return ++SkullCountPick; }

export let SkullCount = 1;
export let SkullCountInit = false;

export let conspicuous = false;
let DekodorV = false;
let scream = 0;


function draw() {
    ctx.clearRect(0, 0, c.width, c.height);

    let currentMapCopy = currentMap.slice(0);

    for (let pos = 0; pos < currentMap.length; pos += 4) {
        const x = pos / 4 % currentMapSize[0], y = Math.floor(pos / 4 / currentMapSize[0]), c = Objects.SIZE / 2;

        let needDraw = true;

        if (Player.character) {
            (
                Math.abs(Player.character.x - x) > 3 ||
                Math.abs(Player.character.y - y) > 3
            ) && (needDraw = false);
        }

        ctx.save();
        ctx.translate(x * Objects.SIZE + c - camera.x, y * Objects.SIZE + c - camera.y);
        const RGBA: RGBA = getRGBA(pos);

        let obj = getObject(RGBA);

        needDraw && ctx.drawImage(
            SPRITE,
            1 * Objects.SPRITE_SIZE, 0, Objects.SPRITE_SIZE, Objects.SPRITE_SIZE,
            -c, -c, Objects.SIZE, Objects.SIZE
        );

        if (obj === null) {
            ctx.restore();
            continue;
        }

        if (Player.character?.pos == pos) { Player.character.x = x, Player.character.y = y; }
        if (Dekodor.character?.pos == pos) {
            Dekodor.setCharacter({ x, y, pos: Dekodor.character.pos });
            switch (Dekodor.move) {
                case "D": ctx.rotate(-180 * Math.PI / 180); break;
                case "L": ctx.rotate(-90 * Math.PI / 180); break;
                case "R": ctx.rotate(90 * Math.PI / 180); break;
            }
        }

        if (obj.name == "Tank-U" && Player.character == null) Player.setCharacter({ pos, x, y });
        if (obj.name == "Dekodor" && Dekodor.character == null) Dekodor.setCharacter({ pos, x, y });

        if (obj.name == "Skull") {
            if (!SkullCountInit) {
                if ((x + y) % 5 == 0) SkullCount++;
                else setRGBA(pos, [0, 0, 0, 1]);
            }
            ctx.scale(.4, .4);
        }

        needDraw && ctx.drawImage(
            SPRITE,
            obj.spritePos * Objects.SPRITE_SIZE, 0, Objects.SPRITE_SIZE, Objects.SPRITE_SIZE,
            -c, -c, Objects.SIZE, Objects.SIZE
        );
        ctx.restore();

        if (obj.name == "Dekodor") {
            setRGBA(pos, Dekodor.onSkull ? [255, 255, 0, 255] : [0, 0, 0, 0], currentMapCopy);
        } else if (RGBA.join(",") === "0,0,0,0") {
            setRGBA(pos, [255, 255, 0, 255], currentMapCopy);
        }
    }


    // Draw Map
    let imageData = new ImageData(currentMapCopy, currentMapSize[0], currentMapSize[1]);
    ctx_map.putImageData(imageData, 0, 0);


    if (!Player.character || 0) return;

    conspicuous = false;
    ctx_s.save();
    ctx_s.fillRect(0, 0, c_s.width, c_s.height);

    ctx_s.translate(-camera.x, -camera.y);
    ctx_s.globalCompositeOperation = "destination-out";
    ctx_s.fillRect(Player.character.x * Objects.SIZE, Player.character.y * Objects.SIZE, Objects.SIZE, Objects.SIZE);

    const radius = 2; // only 2
    const rect = (x: number = 0, y: number = 0) => {
        ctx_s.save();

        let p = Player.character as Character;

        ctx_s.translate(p.x * Objects.SIZE + x * Objects.SIZE, p.y * Objects.SIZE + y * Objects.SIZE);
        ctx_s.fillRect(0, 0, Objects.SIZE, Objects.SIZE);
        if (!conspicuous && getObject(p.x + x, p.y + y)?.name == "Dekodor") conspicuous = true;

        ctx_s.restore();
    }

    function drawRect(d: ("H" | "V")[], dd1: 1 | -1, dd2?: 1 | -1) {
        let { x, y } = Player.character as Character;

        for (let _ = 1; _ <= radius; _++) {
            let _x = d.includes("H") ? _ * dd1 : 0,
                _y = d.includes("V") ? _ * (dd2 ?? dd1) : 0;

            if (getObject(x + _x, y + _y)?.name === "Wall") { rect(_x, _y); break; }
            else rect(_x, _y);
        }
    }

    function isW(x: number, y: number) { return getObject((Player.character as Character).x + x, (Player.character as Character).y + y)?.name === "Wall"; }

    if (mode == "default") {
        drawRect(["V"], -1); // Top //
        drawRect(["V"], 1); // Bottom //
        drawRect(["H"], -1); // Left //
        drawRect(["H"], 1); // Right //

        drawRect(["H", "V"], -1, -1); // Left + Top //
        drawRect(["H", "V"], 1, -1); // Right + Top //
        drawRect(["H", "V"], -1, 1); // Left + Bottom //
        drawRect(["H", "V"], 1, 1); // Right + Bottom //

        // Left + Top / 2
        if (!isW(-1, -1)) rect(-1, -2), rect(-2, -1);
        // Right + Top / 2
        if (!isW(+1, -1)) rect(1, -2), rect(2, -1);
        // Right + Button / 2
        if (!isW(+1, +1)) rect(1, 2), rect(2, 1);
        // Left + Button / 2
        if (!isW(-1, +1)) rect(-1, 2), rect(-2, 1);
    } else if (mode == "SCP-173") {
        ["U"].includes(Player.direction) && (drawRect(["V"], -1), rect(-1, 0), rect(1, 0), (!isW(-1, -1) && rect(-1, -2), !isW(1, -1) && rect(1, -2))); // Top //
        ["D"].includes(Player.direction) && (drawRect(["V"], 1), rect(-1, 0), rect(1, 0), (!isW(-1, 1) && rect(-1, 2), !isW(1, 1) && rect(1, 2))); // Bottom //
        ["L"].includes(Player.direction) && (drawRect(["H"], -1), rect(0, -1), rect(0, 1), (!isW(-1, -1) && rect(-2, -1), !isW(-1, 1) && rect(-2, 1))); // Left //
        ["R"].includes(Player.direction) && (drawRect(["H"], 1), rect(0, -1), rect(0, 1), (!isW(1, -1) && rect(2, -1), !isW(1, 1) && rect(2, 1))); // Right //

        ["L", "U"].includes(Player.direction) && drawRect(["H", "V"], -1, -1); // Left + Top //
        ["R", "U"].includes(Player.direction) && drawRect(["H", "V"], 1, -1); // Right + Top //
        ["L", "D"].includes(Player.direction) && drawRect(["H", "V"], -1, 1); // Left + Bottom //
        ["R", "D"].includes(Player.direction) && drawRect(["H", "V"], 1, 1); // Right + Bottom //
    }

    if (scream + 16000 / 2 < Date.now()) {
        if (!DekodorV && conspicuous) {
            DekodorV = true;
            if (soundEnable) GameAudio["Scary-Piano-Glissando"].play();
            scream = Date.now();
        }
        if (!conspicuous) DekodorV = false;
    }

    ctx_s.restore();
}



let camera = { x: 0, y: 0 }
function updateCamera() {
    if (!Player.character) return;

    let cameraTarget = { x: 0, y: 0 }
    cameraTarget.x = Player.character.x * Objects.SIZE - innerWidth / 2 + Objects.SIZE / 2;
    cameraTarget.y = Player.character.y * Objects.SIZE - innerHeight / 2 + Objects.SIZE / 2;

    camera.x += (cameraTarget.x - camera.x) / 20;
    camera.y += (cameraTarget.y - camera.y) / 20;
    // console.log(Player.character.x, Player.character.x * Objects.SIZE - innerWidth / 2)
}


const alertElem = document.querySelector("#alert") as HTMLElement;
const alertH2 = document.querySelector("#alert > h2") as HTMLElement;


const screamElem = document.querySelector("#scream") as HTMLImageElement;
function showScream() {
    GameAudio.Scream.play();
    GameAudio.Scream_p1.play();

    screamElem.classList.add("a");
    setTimeout(() => screamElem.classList.remove("a"), 500);
}

export function lose() {
    showScream();
    alertH2.innerHTML = "You lose";
    alertElem.style.display = "flex";
    _stop = true;
}
export function win() {
    alertH2.innerHTML = "You win";
    alertElem.style.display = "flex";
    _stop = true;
}

(window as any).getObject = getObject;
(window as any).lose = lose;
(window as any).win = win;


const FPS_Elem = document.querySelector("#fps") as HTMLElement;
setInterval(() => {
    FPS_Elem.innerHTML = `${_fps} FPS`;
    _fps = 0;
}, 1000);