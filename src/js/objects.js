"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = exports.SIZE = exports.SPRITE_SIZE = void 0;
exports.SPRITE_SIZE = 32;
exports.SIZE = exports.SPRITE_SIZE * 3;
exports.list = [
    {
        name: "Wall",
        RGBA: [0, 0, 0, 255],
        spritePos: 6
    },
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
    {
        name: "Dekodor",
        RGBA: [255, 0, 0, 255],
        spritePos: 0
    },
    {
        name: "Skull",
        RGBA: [0, 0, 0, 0],
        spritePos: 7
    },
];
