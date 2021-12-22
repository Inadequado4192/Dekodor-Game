export { };


export const DirectionKeys = ["KeyW", "KeyD", "KeyA", "KeyS"] as const;
export const Direction = ["U", "R", "L", "D"] as const;

declare global {
    type RGBA = [R: number, G: number, B: number, A: number];
    type PositionInUint8ClampedArray = number;

    type Direction = typeof Direction[number];
    type DirectionKeys = typeof DirectionKeys[number];

    type Object2D = {
        name: string,
        RGBA: RGBA,
        spritePos: number;
    }


    type Character = {
        pos: PositionInUint8ClampedArray,
        x: number,
        y: number
    }
}