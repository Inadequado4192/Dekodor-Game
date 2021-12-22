"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.PlayerMove = exports.setCharacter = exports.updatePlayerLastMove = exports.character = exports.playerMove = exports.playerLastMove = void 0;
const methods_1 = require("./methods");
class PlayerMoveSet extends Set {
    last() { return Array.from(this)[this.size - 1]; }
}
exports.playerLastMove = 0;
exports.playerMove = new PlayerMoveSet();
exports.character = null;
function updatePlayerLastMove() { exports.playerLastMove = Date.now(); }
exports.updatePlayerLastMove = updatePlayerLastMove;
function setCharacter(m) { exports.character = m; }
exports.setCharacter = setCharacter;
function PlayerMove() {
    if (!exports.character)
        return;
    if (exports.playerLastMove + 250 < Date.now() && exports.playerMove.size !== 0) {
        exports.character.pos = methods_1.moveObject(exports.character.pos, exports.playerMove.last());
        updatePlayerLastMove();
    }
}
exports.PlayerMove = PlayerMove;
function init() {
    exports.playerLastMove = 0;
    exports.playerMove.clear();
    exports.character = null;
}
exports.init = init;
