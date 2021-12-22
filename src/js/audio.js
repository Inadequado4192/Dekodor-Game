"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameAudio = void 0;
class _GameAudio extends Audio {
    constructor(src, op) {
        super(src);
        this.playbackRate = op.speed ?? 1;
        this.loop = op.loop ?? false;
        this.autoplay = op.autoplay ?? false;
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
const path = "./src/mp3";
exports.GameAudio = {
    "Scary-Piano-Glissando": new _GameAudio(`${path}/Scary-Piano-Glissando.mp3`, {
        speed: 2
    }),
    "Anxious-Humming": new _GameAudio(`${path}/Anxious-Humming.mp3`, {
        loop: true
    })
};
window.GameAudio = exports.GameAudio;
