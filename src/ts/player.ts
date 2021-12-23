import { shitKet } from "./game";
import { moveObject } from "./methods";

class PlayerMoveSet<T> extends Set<T> {
    last() { return Array.from(this)[this.size - 1]; }
}

export let direction: Direction = "U";
export let lastMove = 0;
export let move = new PlayerMoveSet<Direction>();
export let character: Character | null = null;


export function updatePlayerLastMove() { lastMove = Date.now(); }
export function setCharacter(m: Character) { character = m; }




export function playerMove() {
    if (!character) return;

    if (lastMove + 250 < Date.now() && move.size !== 0) {
        let l = move.last();
        if (!shitKet) direction = l;
        character.pos = moveObject(character.pos, l) as number;

        updatePlayerLastMove();
    }
}


export function init() {
    direction = "U";
    lastMove = 0;
    move.clear();
    character = null;
}