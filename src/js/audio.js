"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoundDisable = exports.SoundEnable = exports.MusicDisable = exports.MusicEnable = exports.GameAudio = void 0;
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
    type = "music";
    constructor(src, op) {
        super(src, op);
        this.loop = true;
        this.muted = true;
    }
}
class Sound extends _GameAudio {
    type = "sound";
    constructor(src, op) {
        super(src, op);
        this.loop = false;
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
    "Scream": new Sound(`${path}/Scream.mp3`, { volume: .2 }),
    "Scream_p1": new Sound(`${path}/Scream_p1.mp3`, { volume: .2 }),
};
function MusicEnable() {
    _1.frame == "menu" && exports.GameAudio.Music.play();
    for (let name in exports.GameAudio) {
        let m = exports.GameAudio[name];
        m.type == "music" && (m.muted = false);
    }
}
exports.MusicEnable = MusicEnable;
function MusicDisable() {
    for (let name in exports.GameAudio) {
        let m = exports.GameAudio[name];
        m.type == "music" && (m.muted = true);
    }
}
exports.MusicDisable = MusicDisable;
function SoundEnable() {
    for (let name in exports.GameAudio) {
        let m = exports.GameAudio[name];
        m.type == "sound" && (m.muted = false);
    }
}
exports.SoundEnable = SoundEnable;
function SoundDisable() {
    for (let name in exports.GameAudio) {
        let m = exports.GameAudio[name];
        m.type == "sound" && (m.muted = true);
    }
}
exports.SoundDisable = SoundDisable;
;
window.GameAudio = exports.GameAudio;
