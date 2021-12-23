"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.win = exports.lose = exports.conspicuous = exports.SkullCountInit = exports.SkullCount = exports.addSkullCountPick = exports.SkullCountPick = exports.currentMap = exports.currentMapSize = exports.exit = exports.shitKet = exports.openMap = void 0;
const audio_1 = require("./audio");
const Dekodor = require("./Dekodor");
const Player = require("./Player");
const global_1 = require("./global");
const Objects = require("./objects");
const methods_1 = require("./methods");
const _1 = require(".");
let musicPlayed = false;
async function openMap(map) {
    audio_1.GameAudio["Music"].stop();
    alertElem.style.display = "none";
    init();
    let img = new Image();
    img.src = URL.createObjectURL(await (await fetch(`./src/maps/${map}.png`)).blob());
    img.onload = () => {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        exports.currentMapSize = [img.width, img.height];
        exports.currentMap = ctx.getImageData(0, 0, img.width, img.height).data;
        c_map.width = img.width;
        c_map.height = img.height;
        ctx_map.imageSmoothingEnabled = false;
        if (!musicPlayed && audio_1.musicEnable)
            audio_1.GameAudio["Anxious-Humming"].play(), musicPlayed = true;
        document.onkeydown = e => {
            e.code == "ShiftLeft" && (exports.shitKet = true);
            if (!Player.character)
                return;
            if (global_1.DirectionKeys.includes(e.code))
                Player.move.add(methods_1.getDirection(e.code));
        };
        document.onkeyup = e => {
            e.code == "ShiftLeft" && (exports.shitKet = false);
            if (global_1.DirectionKeys.includes(e.code) && Player.move.has(methods_1.getDirection(e.code)))
                Player.move.delete(methods_1.getDirection(e.code));
        };
        loop();
    };
}
exports.openMap = openMap;
exports.shitKet = false;
function init() {
    Player.init();
    Dekodor.init();
    exports.SkullCountPick = 0;
    exports.SkullCount = 1;
    exports.SkullCountInit = false;
    _stop = false;
    exports.shitKet = false;
}
function exit() {
    _stop = true;
}
exports.exit = exit;
const c = document.querySelector("#canvas");
const c_s = document.querySelector("#mask");
const c_map = document.querySelector("#map");
const ctx = c.getContext("2d");
const ctx_s = c_s.getContext("2d");
const ctx_map = c_map.getContext("2d");
function canvasResize() {
    c.width = innerWidth;
    c.height = innerHeight;
    ctx.imageSmoothingEnabled = false;
    c_s.width = innerWidth;
    c_s.height = innerHeight;
    ctx_s.imageSmoothingEnabled = false;
    ctx_map.imageSmoothingEnabled = false;
}
;
canvasResize();
window.addEventListener("resize", canvasResize);
const SPRITE = new Image();
SPRITE.src = "./sprite.png";
let fpsInterval = 1000 / 60, then = Date.now();
let _fps = 0;
let _stop = false;
function loop() {
    if (_stop)
        return;
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        Player.playerMove();
        Dekodor.AI();
        draw();
        !exports.SkullCountInit && (exports.SkullCountInit = true);
        updateCamera();
        _fps++;
    }
    requestAnimationFrame(loop);
}
exports.SkullCountPick = 0;
function addSkullCountPick() { return ++exports.SkullCountPick; }
exports.addSkullCountPick = addSkullCountPick;
exports.SkullCount = 1;
exports.SkullCountInit = false;
exports.conspicuous = false;
let DekodorV = false;
let scream = 0;
function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    let currentMapCopy = exports.currentMap.slice(0);
    for (let pos = 0; pos < exports.currentMap.length; pos += 4) {
        const x = pos / 4 % exports.currentMapSize[0], y = Math.floor(pos / 4 / exports.currentMapSize[0]), c = Objects.SIZE / 2;
        let needDraw = true;
        if (Player.character) {
            (Math.abs(Player.character.x - x) > 3 ||
                Math.abs(Player.character.y - y) > 3) && (needDraw = false);
        }
        ctx.save();
        ctx.translate(x * Objects.SIZE + c - camera.x, y * Objects.SIZE + c - camera.y);
        const RGBA = methods_1.getRGBA(pos);
        let obj = methods_1.getObject(RGBA);
        needDraw && ctx.drawImage(SPRITE, 1 * Objects.SPRITE_SIZE, 0, Objects.SPRITE_SIZE, Objects.SPRITE_SIZE, -c, -c, Objects.SIZE, Objects.SIZE);
        if (obj === null) {
            ctx.restore();
            continue;
        }
        if (Player.character?.pos == pos) {
            Player.character.x = x, Player.character.y = y;
        }
        if (Dekodor.character?.pos == pos) {
            Dekodor.setCharacter({ x, y, pos: Dekodor.character.pos });
            switch (Dekodor.move) {
                case "D":
                    ctx.rotate(-180 * Math.PI / 180);
                    break;
                case "L":
                    ctx.rotate(-90 * Math.PI / 180);
                    break;
                case "R":
                    ctx.rotate(90 * Math.PI / 180);
                    break;
            }
        }
        if (obj.name == "Tank-U" && Player.character == null)
            Player.setCharacter({ pos, x, y });
        if (obj.name == "Dekodor" && Dekodor.character == null)
            Dekodor.setCharacter({ pos, x, y });
        if (obj.name == "Skull") {
            if (!exports.SkullCountInit) {
                if ((x + y) % 5 == 0)
                    exports.SkullCount++;
                else
                    methods_1.setRGBA(pos, [0, 0, 0, 1]);
            }
            ctx.scale(.4, .4);
        }
        needDraw && ctx.drawImage(SPRITE, obj.spritePos * Objects.SPRITE_SIZE, 0, Objects.SPRITE_SIZE, Objects.SPRITE_SIZE, -c, -c, Objects.SIZE, Objects.SIZE);
        ctx.restore();
        if (obj.name == "Dekodor") {
            methods_1.setRGBA(pos, Dekodor.onSkull ? [255, 255, 0, 255] : [0, 0, 0, 0], currentMapCopy);
        }
        else if (RGBA.join(",") === "0,0,0,0") {
            methods_1.setRGBA(pos, [255, 255, 0, 255], currentMapCopy);
        }
    }
    let imageData = new ImageData(currentMapCopy, exports.currentMapSize[0], exports.currentMapSize[1]);
    ctx_map.putImageData(imageData, 0, 0);
    if (!Player.character || 0)
        return;
    exports.conspicuous = false;
    ctx_s.save();
    ctx_s.fillRect(0, 0, c_s.width, c_s.height);
    ctx_s.translate(-camera.x, -camera.y);
    ctx_s.globalCompositeOperation = "destination-out";
    ctx_s.fillRect(Player.character.x * Objects.SIZE, Player.character.y * Objects.SIZE, Objects.SIZE, Objects.SIZE);
    const radius = 2;
    const rect = (x = 0, y = 0) => {
        ctx_s.save();
        let p = Player.character;
        ctx_s.translate(p.x * Objects.SIZE + x * Objects.SIZE, p.y * Objects.SIZE + y * Objects.SIZE);
        ctx_s.fillRect(0, 0, Objects.SIZE, Objects.SIZE);
        if (!exports.conspicuous && methods_1.getObject(p.x + x, p.y + y)?.name == "Dekodor")
            exports.conspicuous = true;
        ctx_s.restore();
    };
    function drawRect(d, dd1, dd2) {
        let { x, y } = Player.character;
        for (let _ = 1; _ <= radius; _++) {
            let _x = d.includes("H") ? _ * dd1 : 0, _y = d.includes("V") ? _ * (dd2 ?? dd1) : 0;
            if (methods_1.getObject(x + _x, y + _y)?.name === "Wall") {
                rect(_x, _y);
                break;
            }
            else
                rect(_x, _y);
        }
    }
    function isW(x, y) { return methods_1.getObject(Player.character.x + x, Player.character.y + y)?.name === "Wall"; }
    if (_1.mode == "default") {
        drawRect(["V"], -1);
        drawRect(["V"], 1);
        drawRect(["H"], -1);
        drawRect(["H"], 1);
        drawRect(["H", "V"], -1, -1);
        drawRect(["H", "V"], 1, -1);
        drawRect(["H", "V"], -1, 1);
        drawRect(["H", "V"], 1, 1);
        if (!isW(-1, -1))
            rect(-1, -2), rect(-2, -1);
        if (!isW(+1, -1))
            rect(1, -2), rect(2, -1);
        if (!isW(+1, +1))
            rect(1, 2), rect(2, 1);
        if (!isW(-1, +1))
            rect(-1, 2), rect(-2, 1);
    }
    else if (_1.mode == "SCP-173") {
        ["U"].includes(Player.direction) && (drawRect(["V"], -1), rect(-1, 0), rect(1, 0), (!isW(-1, -1) && rect(-1, -2), !isW(1, -1) && rect(1, -2)));
        ["D"].includes(Player.direction) && (drawRect(["V"], 1), rect(-1, 0), rect(1, 0), (!isW(-1, 1) && rect(-1, 2), !isW(1, 1) && rect(1, 2)));
        ["L"].includes(Player.direction) && (drawRect(["H"], -1), rect(0, -1), rect(0, 1), (!isW(-1, -1) && rect(-2, -1), !isW(-1, 1) && rect(-2, 1)));
        ["R"].includes(Player.direction) && (drawRect(["H"], 1), rect(0, -1), rect(0, 1), (!isW(1, -1) && rect(2, -1), !isW(1, 1) && rect(2, 1)));
        ["L", "U"].includes(Player.direction) && drawRect(["H", "V"], -1, -1);
        ["R", "U"].includes(Player.direction) && drawRect(["H", "V"], 1, -1);
        ["L", "D"].includes(Player.direction) && drawRect(["H", "V"], -1, 1);
        ["R", "D"].includes(Player.direction) && drawRect(["H", "V"], 1, 1);
    }
    if (scream + 16000 / 2 < Date.now()) {
        if (!DekodorV && exports.conspicuous) {
            DekodorV = true;
            if (audio_1.soundEnable)
                audio_1.GameAudio["Scary-Piano-Glissando"].play();
            scream = Date.now();
        }
        if (!exports.conspicuous)
            DekodorV = false;
    }
    ctx_s.restore();
}
let camera = { x: 0, y: 0 };
function updateCamera() {
    if (!Player.character)
        return;
    let cameraTarget = { x: 0, y: 0 };
    cameraTarget.x = Player.character.x * Objects.SIZE - innerWidth / 2 + Objects.SIZE / 2;
    cameraTarget.y = Player.character.y * Objects.SIZE - innerHeight / 2 + Objects.SIZE / 2;
    camera.x += (cameraTarget.x - camera.x) / 20;
    camera.y += (cameraTarget.y - camera.y) / 20;
}
const alertElem = document.querySelector("#alert");
const alertH2 = document.querySelector("#alert > h2");
function lose() {
    alertH2.innerHTML = "You lose";
    alertElem.style.display = "flex";
    _stop = true;
}
exports.lose = lose;
function win() {
    alertH2.innerHTML = "You win";
    alertElem.style.display = "flex";
    _stop = true;
}
exports.win = win;
window.getObject = methods_1.getObject;
window.lose = lose;
window.win = win;
const FPS_Elem = document.querySelector("#fps");
setInterval(() => {
    FPS_Elem.innerHTML = `${_fps} FPS`;
    _fps = 0;
}, 1000);
