"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.playerMove = exports.setCharacter = exports.updatePlayerLastMove = exports.character = exports.move = exports.lastMove = exports.direction = void 0;
const game_1 = require("./game");
const methods_1 = require("./methods");
class PlayerMoveSet extends Set {
    last() { return Array.from(this)[this.size - 1]; }
}
exports.direction = "U";
exports.lastMove = 0;
exports.move = new PlayerMoveSet();
exports.character = null;
function updatePlayerLastMove() { exports.lastMove = Date.now(); }
exports.updatePlayerLastMove = updatePlayerLastMove;
function setCharacter(m) { exports.character = m; }
exports.setCharacter = setCharacter;
function playerMove() {
    if (!exports.character)
        return;
    if (exports.lastMove + 250 < Date.now() && exports.move.size !== 0) {
        let l = exports.move.last();
        if (!game_1.shitKet)
            exports.direction = l;
        exports.character.pos = methods_1.moveObject(exports.character.pos, l);
        updatePlayerLastMove();
    }
}
exports.playerMove = playerMove;
function init() {
    exports.direction = "U";
    exports.lastMove = 0;
    exports.move.clear();
    exports.character = null;
}
exports.init = init;
