"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AI = exports.init = exports.setCharacter = exports.setMove = exports.move = exports.OnSkull = exports.onSkull = exports.character = void 0;
const game_1 = require("./game");
const Player = require("./Player");
const global_1 = require("./global");
const methods_1 = require("./methods");
exports.character = null;
exports.onSkull = true;
function OnSkull(bool) { exports.onSkull = bool; }
exports.OnSkull = OnSkull;
exports.move = "U";
let lastMove = 0;
function setMove(m) { exports.move = m; }
exports.setMove = setMove;
function setCharacter(m) { exports.character = m; }
exports.setCharacter = setCharacter;
function init() {
    exports.onSkull = true;
    exports.move = "U";
    lastMove = 0;
    exports.character = null;
    runReload = 0;
    conspicuousLocal = false;
}
exports.init = init;
let runReload = 0, conspicuousLocal = false;
function AI() {
    if (!exports.character || !Player.character)
        return;
    let now = Date.now();
    if (game_1.conspicuous) {
        conspicuousLocal = game_1.conspicuous;
    }
    else if (conspicuousLocal) {
        conspicuousLocal = false;
        runReload = now;
    }
    if (!exports.character || lastMove + ((runReload + 1000 < now && !game_1.conspicuous) ? 0 : 400) >= now)
        return;
    let { x, y } = exports.character;
    let targetMove;
    if (game_1.conspicuous) {
        let tx = Player.character.x - exports.character.x, ty = Player.character.y - exports.character.y;
        const gD = (n) => n > 0 ? 1 : n == 0 ? 0 : -1;
        let pp = [];
        if (gD(tx) == -1)
            pp.push("L");
        else if (gD(tx) == 1)
            pp.push("R");
        if (gD(ty) == -1)
            pp.push("U");
        else if (gD(ty) == 1)
            pp.push("D");
        targetMove = pp[Math.floor(Math.random() * pp.length)];
        let targetObject = null;
        switch (targetMove) {
            case "D":
                targetObject = methods_1.getObject(x, y + 1);
                break;
            case "L":
                targetObject = methods_1.getObject(x - 1, y);
                break;
            case "R":
                targetObject = methods_1.getObject(x + 1, y);
                break;
            case "U":
                targetObject = methods_1.getObject(x, y - 1);
                break;
        }
        if (!targetMove)
            return;
        if (targetObject?.name == "Wall")
            return AI();
    }
    else {
        let rD = methods_1.getReverseDirection(exports.move);
        let v = global_1.Direction.filter(d => {
            if (d == rD)
                return false;
            switch (d) {
                case "D": return methods_1.getObject(x, y + 1)?.name != "Wall";
                case "L": return methods_1.getObject(x - 1, y)?.name != "Wall";
                case "R": return methods_1.getObject(x + 1, y)?.name != "Wall";
                case "U": return methods_1.getObject(x, y - 1)?.name != "Wall";
            }
        });
        targetMove = v[Math.floor(Math.random() * v.length)];
        if (v.length == 0)
            targetMove = rD;
    }
    exports.move = targetMove;
    exports.character.pos = methods_1.moveObject(exports.character.pos, exports.move);
    lastMove = now;
}
exports.AI = AI;
