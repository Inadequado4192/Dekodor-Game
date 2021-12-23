export const SPRITE_SIZE = 32;
export const SIZE = SPRITE_SIZE * 2;


export const list: Object2D[] = [
    // Wall
    {
        name: "Wall",
        RGBA: [0, 0, 0, 255],
        spritePos: 6
    },

    // Tank
    {
        name: "Tank-U",
        RGBA: [0, 0, 255, 255],
        spritePos: 2
    },
    {
        name: "Tank-R",
        RGBA: [0, 0, 254, 255],
        spritePos: 3
    },
    {
        name: "Tank-L",
        RGBA: [0, 0, 253, 255],
        spritePos: 4
    },
    {
        name: "Tank-D",
        RGBA: [0, 0, 252, 255],
        spritePos: 5
    },


    // Dekodor
    {
        name: "Dekodor",
        RGBA: [255, 0, 0, 255],
        spritePos: 0
    },


    // Skull
    {
        name: "Skull",
        RGBA: [0, 0, 0, 0],
        spritePos: 7
    },
]