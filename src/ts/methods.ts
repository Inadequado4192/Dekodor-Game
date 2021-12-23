import { addSkullCountPick, currentMap, currentMapSize, lose, shitKet, SkullCount, win } from "./game";
import * as Objects from "./objects";
import * as Dekodor from "./Dekodor";
import * as Player from "./Player";

export function getReverseDirection(d: Direction): Direction {
    switch (d) {
        case "D": return "U";
        case "L": return "R";
        case "R": return "L";
        case "U": return "D";
    }
}

export function getDirection(code: string): Direction {
    switch (code) {
        case "KeyW": return "U";
        case "KeyD": return "R";
        case "KeyA": return "L";
        case "KeyS": return "D";
    }
    throw Error();
}


export function moveObject(pos: PositionInUint8ClampedArray, direction: Direction): number {
    let _player = pos == Player.character?.pos;
    let _Dekodor = pos == Dekodor.character?.pos;
    let mainRGBA = getRGBA(pos) as RGBA;
    let removeTarget = false;
    let DekodorOnSkull = Dekodor.onSkull;

    let moveTo: number;
    switch (direction) {
        case "U":
            moveTo = -currentMapSize[0] * 4;
            if (_player && !shitKet) mainRGBA[2] = 255;
            break;
        case "R":
            moveTo = 4;
            if (_player && !shitKet) mainRGBA[2] = 254;
            break;
        case "L":
            moveTo = -4;
            if (_player && !shitKet) mainRGBA[2] = 253;
            break;
        case "D":
            moveTo = currentMapSize[0] * 4;
            if (_player && !shitKet) mainRGBA[2] = 252;
            break;
    }
    let targetRGBA = getRGBA(pos + moveTo) as RGBA;


    switch (getObject(targetRGBA)?.name) {
        case "Wall":
            setRGBA(pos, mainRGBA);
            return pos;
        case "Tank-U": case "Tank-R": case "Tank-L": case "Tank-D":
            if (_Dekodor) {
                lose();
                return pos;
            }
        case "Dekodor":
            if (_player) {
                lose();
                return pos;
            }
        case "Skull":
            if (_player) {
                if (addSkullCountPick() == SkullCount) win();
                removeTarget = true;
            }
            if (_Dekodor && !DekodorOnSkull) {
                Dekodor.OnSkull(true);
                removeTarget = true;
            }
    }

    if (_Dekodor && DekodorOnSkull && targetRGBA.join(",") == "0,0,0,1") {
        Dekodor.OnSkull(false);
        setRGBA(pos, [0, 0, 0, 0] as RGBA);
    } else if (removeTarget) setRGBA(pos, [0, 0, 0, 1] as RGBA);
    else setRGBA(pos, targetRGBA);

    setRGBA(pos + moveTo, mainRGBA);
    return pos + moveTo;
}


export function getRGBA(pos: PositionInUint8ClampedArray) {
    return [currentMap[pos + 0], currentMap[pos + 1], currentMap[pos + 2], currentMap[pos + 3]] as RGBA;
}
export function setRGBA(pos: PositionInUint8ClampedArray, RGBA: RGBA, map: Uint8ClampedArray = currentMap) {
    map[pos + 0] = RGBA[0];
    map[pos + 1] = RGBA[1];
    map[pos + 2] = RGBA[2];
    map[pos + 3] = RGBA[3];
}
export function getObject(x: number, y: number): Object2D | null;
export function getObject(RGBA: RGBA): Object2D | null;
export function getObject(a: number | RGBA, b?: number): Object2D | null {
    if (Array.isArray(a)) return Objects.list.find(c => c.RGBA.join(",") == a.join(",")) ?? null;
    else {
        if (!currentMapSize) return null;
        return getObject(getRGBA(a * 4 + (b as number) * 4 * currentMapSize[0]) as RGBA);
    }
}

