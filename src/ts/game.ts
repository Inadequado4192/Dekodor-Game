import { GameAudio, musicEnable, soundEnable } from "./audio";
import * as Dekodor from "./Dekodor";
import * as Player from "./Player";
import { DirectionKeys } from "./global";
import * as Objects from "./objects";
import { getDirection, getObject, getRGBA, setRGBA } from "./methods";

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
            if (!Player.character) return;

            if (DirectionKeys.includes(e.code as any)) Player.playerMove.add(getDirection(e.code));
        }
        document.onkeyup = e => {
            if (DirectionKeys.includes(e.code as any) && Player.playerMove.has(getDirection(e.code))) Player.playerMove.delete(getDirection(e.code));
        }

        console.log(currentMapSize);
        loop();
    }
}

function init() {
    Player.init();
    Dekodor.init();

    SkullCountPick = 0;
    SkullCount = 1;
    SkullCountInit = false;
    _stop = false;
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

        Player.PlayerMove();
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

        // if (Player.character) {
        //     (
        //         Math.abs(Player.character.x - x) > 3 ||
        //         Math.abs(Player.character.y - y) > 3
        //     ) && (needDraw = false);
        // }

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

    for (let y = -1; y >= -radius; y--) {
        // Top
        if (getObject(Player.character.x, Player.character.y + y)?.name === "Wall") { rect(0, y); break; }
        else rect(0, y);
    }

    for (let x = 1; x <= radius; x++) {
        // Right
        if (getObject(Player.character.x + x, Player.character.y)?.name === "Wall") { rect(x); break; }
        else rect(x);
    }

    for (let y = 1; y <= radius; y++) {
        // Bottom
        if (getObject(Player.character.x, Player.character.y + y)?.name === "Wall") { rect(0, y); break; }
        else rect(0, y);
    }

    for (let x = -1; x >= -radius; x--) {
        // Left
        if (getObject(Player.character.x + x, Player.character.y)?.name === "Wall") { rect(x); break; }
        else rect(x);
    }

    for (let xy = -1; xy >= -radius; xy--) {
        // Left + Top 
        if (getObject(Player.character.x + xy, Player.character.y + xy)?.name === "Wall") { rect(xy, xy); break; }
        else rect(xy, xy);
    }

    for (let xy = 1; xy <= radius; xy++) {
        // Right + Top 
        if (getObject(Player.character.x + xy, Player.character.y - xy)?.name === "Wall") { rect(xy, -xy); break; }
        else rect(xy, -xy);
    }

    for (let xy = 1; xy <= radius; xy++) {
        // Right + Button 
        if (getObject(Player.character.x + xy, Player.character.y + xy)?.name === "Wall") { rect(xy, xy); break; }
        else rect(xy, xy);
    }
    for (let xy = -1; xy >= -radius; xy--) {
        // Left + Bottom 
        if (getObject(Player.character.x + xy, Player.character.y - xy)?.name === "Wall") { rect(xy, -xy); break; }
        else rect(xy, -xy);
    }


    // Left + Top / 2
    if (getObject(Player.character.x - 1, Player.character.y - 1)?.name !== "Wall") rect(-1, -2), rect(-2, -1);
    // Right + Top / 2
    if (getObject(Player.character.x + 1, Player.character.y - 1)?.name !== "Wall") rect(1, -2), rect(2, -1);
    // Right + Button / 2
    if (getObject(Player.character.x + 1, Player.character.y + 1)?.name !== "Wall") rect(1, 2), rect(2, 1);
    // Left + Button / 2
    if (getObject(Player.character.x - 1, Player.character.y + 1)?.name !== "Wall") rect(-1, 2), rect(-2, 1);

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

export function lose() {
    console.log("lose");
    alertH2.innerHTML = "You lose";
    alertElem.style.display = "flex";
    _stop = true;
}
export function win() {
    console.log("win");
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