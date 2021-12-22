import { moveObject } from "./methods";

class PlayerMoveSet<T> extends Set<T> {
    last() { return Array.from(this)[this.size - 1]; }
}

export let playerLastMove = 0;
export let playerMove = new PlayerMoveSet<Direction>();
export let character: Character | null = null;


export function updatePlayerLastMove() { playerLastMove = Date.now(); }
export function setCharacter(m: Character) { character = m; }




export function PlayerMove() {
    if (!character) return;

    if (playerLastMove + 250 < Date.now() && playerMove.size !== 0) {
        character.pos = moveObject(character.pos, playerMove.last()) as number;
        updatePlayerLastMove()
    }
}


export function init() {
    playerLastMove = 0;
    playerMove.clear();
    character = null;
}