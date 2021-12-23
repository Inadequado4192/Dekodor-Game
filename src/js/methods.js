"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObject = exports.setRGBA = exports.getRGBA = exports.moveObject = exports.getDirection = exports.getReverseDirection = void 0;
const game_1 = require("./game");
const Objects = require("./objects");
const Dekodor = require("./Dekodor");
const Player = require("./Player");
function getReverseDirection(d) {
    switch (d) {
        case "D": return "U";
        case "L": return "R";
        case "R": return "L";
        case "U": return "D";
    }
}
exports.getReverseDirection = getReverseDirection;
function getDirection(code) {
    switch (code) {
        case "KeyW": return "U";
        case "KeyD": return "R";
        case "KeyA": return "L";
        case "KeyS": return "D";
    }
    throw Error();
}
exports.getDirection = getDirection;
function moveObject(pos, direction) {
    let _player = pos == Player.character?.pos;
    let _Dekodor = pos == Dekodor.character?.pos;
    let mainRGBA = getRGBA(pos);
    let removeTarget = false;
    let DekodorOnSkull = Dekodor.onSkull;
    let moveTo;
    switch (direction) {
        case "U":
            moveTo = -game_1.currentMapSize[0] * 4;
            if (_player && !game_1.shitKet)
                mainRGBA[2] = 255;
            break;
        case "R":
            moveTo = 4;
            if (_player && !game_1.shitKet)
                mainRGBA[2] = 254;
            break;
        case "L":
            moveTo = -4;
            if (_player && !game_1.shitKet)
                mainRGBA[2] = 253;
            break;
        case "D":
            moveTo = game_1.currentMapSize[0] * 4;
            if (_player && !game_1.shitKet)
                mainRGBA[2] = 252;
            break;
    }
    let targetRGBA = getRGBA(pos + moveTo);
    switch (getObject(targetRGBA)?.name) {
        case "Wall":
            setRGBA(pos, mainRGBA);
            return pos;
        case "Tank-U":
        case "Tank-R":
        case "Tank-L":
        case "Tank-D":
            if (_Dekodor) {
                game_1.lose();
                return pos;
            }
        case "Dekodor":
            if (_player) {
                game_1.lose();
                return pos;
            }
        case "Skull":
            if (_player) {
                if (game_1.addSkullCountPick() == game_1.SkullCount)
                    game_1.win();
                removeTarget = true;
            }
            if (_Dekodor && !DekodorOnSkull) {
                Dekodor.OnSkull(true);
                removeTarget = true;
            }
    }
    if (_Dekodor && DekodorOnSkull && targetRGBA.join(",") == "0,0,0,1") {
        Dekodor.OnSkull(false);
        setRGBA(pos, [0, 0, 0, 0]);
    }
    else if (removeTarget)
        setRGBA(pos, [0, 0, 0, 1]);
    else
        setRGBA(pos, targetRGBA);
    setRGBA(pos + moveTo, mainRGBA);
    return pos + moveTo;
}
exports.moveObject = moveObject;
function getRGBA(pos) {
    return [game_1.currentMap[pos + 0], game_1.currentMap[pos + 1], game_1.currentMap[pos + 2], game_1.currentMap[pos + 3]];
}
exports.getRGBA = getRGBA;
function setRGBA(pos, RGBA, map = game_1.currentMap) {
    map[pos + 0] = RGBA[0];
    map[pos + 1] = RGBA[1];
    map[pos + 2] = RGBA[2];
    map[pos + 3] = RGBA[3];
}
exports.setRGBA = setRGBA;
function getObject(a, b) {
    if (Array.isArray(a))
        return Objects.list.find(c => c.RGBA.join(",") == a.join(",")) ?? null;
    else {
        if (!game_1.currentMapSize)
            return null;
        return getObject(getRGBA(a * 4 + b * 4 * game_1.currentMapSize[0]));
    }
}
exports.getObject = getObject;
