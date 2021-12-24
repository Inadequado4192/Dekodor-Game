"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoundDisable = exports.SoundEnable = exports.MusicDisable = exports.MusicEnable = exports.soundEnable = exports.musicEnable = exports.GameAudio = void 0;
const _1 = require(".");
class _GameAudio extends Audio {
    constructor(src, op) {
        super(src);
        this.playbackRate = op?.speed ?? 1;
        this.loop = op?.loop ?? false;
        this.volume = op?.volume ?? 1;
    }
    play() {
        this.stop();
        return super.play();
    }
    stop() {
        super.pause();
        this.currentTime = 0;
    }
}
class Music extends _GameAudio {
    constructor(src, op) {
        super(src, op && Object.assign(op, { loop: true }));
        this.type = "music";
    }
}
class Sound extends _GameAudio {
    constructor(src, op) {
        super(src, op && Object.assign(op, { loop: false }));
        this.type = "sound";
    }
}
const path = "./src/mp3";
exports.GameAudio = {
    "Scary-Piano-Glissando": new Sound(`${path}/Scary-Piano-Glissando.mp3`, {
        speed: 2
    }),
    "Anxious-Humming": new Music(`${path}/Anxious-Humming.mp3`),
    "Music": new Music(`${path}/Music.mp3`, {
        volume: .5
    }),
    "Scream": new Sound(`${path}/Scream.mp3`, { volume: .5 }),
    "Scream_p1": new Sound(`${path}/Scream_p1.mp3`, { volume: .5 }),
};
exports.musicEnable = false;
exports.soundEnable = false;
function MusicEnable() {
    exports.musicEnable = true;
    _1.frame == "menu" && exports.GameAudio.Music.play();
}
exports.MusicEnable = MusicEnable;
function MusicDisable() {
    exports.musicEnable = false;
    for (let name in exports.GameAudio) {
        let m = exports.GameAudio[name];
        m.type == "music" && m.stop();
    }
}
exports.MusicDisable = MusicDisable;
function SoundEnable() { exports.soundEnable = true; }
exports.SoundEnable = SoundEnable;
function SoundDisable() {
    exports.soundEnable = false;
    for (let name in exports.GameAudio) {
        let m = exports.GameAudio[name];
        m.type == "sound" && m.stop();
    }
}
exports.SoundDisable = SoundDisable;
;
window.GameAudio = exports.GameAudio;
