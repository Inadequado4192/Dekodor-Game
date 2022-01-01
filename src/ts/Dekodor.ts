import { conspicuous } from "./game";
import * as Player from "./Player";
import { Direction } from "./global";
import { getObject, getReverseDirection, moveObject } from "./methods";
import { mode } from ".";

export let character: Character | null = null;

export let onSkull = true;
export function OnSkull(bool: boolean) { onSkull = bool }

export let move: Direction = "U";
let lastMove = 0;

export function setMove(m: Direction) { move = m; }
export function setCharacter(m: Character) { character = m; }


export function init() {
    onSkull = true;
    move = "U";
    lastMove = 0;
    character = null;

    runReload = 0;
    conspicuousLocal = false;
}


let runReload = 0, conspicuousLocal = false;
export function AI(): void {
    if (!character || !Player.character) return;
    let now = Date.now()

    // let speedDelay = {
    //     run: 0,
    //     conspicuous: 400
    // }
    // if (mode == "SCP-173") {
    //     speedDelay = {
    //         run: 20,
    //         conspicuous: Infinity
    //     }
    // }

    if (conspicuous) {
        conspicuousLocal = conspicuous;
    } else if (conspicuousLocal) {
        conspicuousLocal = false;
        runReload = now;
    }

    if (!character || lastMove + ((runReload + 1000 < now && !conspicuous) ? 0 : 800) >= now) return;

    let { x, y } = character;

    let targetMove: Direction | undefined;

    if (conspicuous) {
        let tx = Player.character.x - character.x,
            ty = Player.character.y - character.y;

        const gD = (n: number) => n > 0 ? 1 : n == 0 ? 0 : -1;

        let pp: [Direction?, Direction?] = [];

        if (gD(tx) == -1) pp.push("L");
        else if (gD(tx) == 1) pp.push("R");
        if (gD(ty) == -1) pp.push("U");
        else if (gD(ty) == 1) pp.push("D");

        targetMove = pp[Math.floor(Math.random() * pp.length)];
        let targetObject: Object2D | null = null;

        switch (targetMove) {
            case "D": targetObject = getObject(x, y + 1); break;
            case "L": targetObject = getObject(x - 1, y); break;
            case "R": targetObject = getObject(x + 1, y); break;
            case "U": targetObject = getObject(x, y - 1); break;
        }


        if (!targetMove) return;

        if (targetObject?.name == "Wall") return AI();
    } else {
        let rD = getReverseDirection(move);

        let v: Direction[] = Direction.filter(d => {
            if (d == rD) return false;
            switch (d) {
                case "D": return getObject(x, y + 1)?.name != "Wall";
                case "L": return getObject(x - 1, y)?.name != "Wall";
                case "R": return getObject(x + 1, y)?.name != "Wall";
                case "U": return getObject(x, y - 1)?.name != "Wall";
            }
        });

        targetMove = v[Math.floor(Math.random() * v.length)];
        if (v.length == 0) targetMove = rD;
    }



    move = targetMove;
    character.pos = moveObject(character.pos, move) as number;
    lastMove = now;
}