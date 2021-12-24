import { frame } from ".";

type GameAudioOp = {
    speed?: number,
    loop?: boolean,
    volume?: number,
}

class _GameAudio extends Audio {
    constructor(src: string, op?: GameAudioOp) {
        super(src);
        this.playbackRate = op?.speed ?? 1;
        this.loop = op?.loop ?? false;
        this.volume = op?.volume ?? 1;
    }
    play(): Promise<void> {
        this.stop()
        return super.play();
    }
    stop() {
        super.pause();
        this.currentTime = 0;
    }
}
class Music extends _GameAudio {
    public type = "music";
    public constructor(src: string, op?: Omit<GameAudioOp, "loop">) {
        super(src, op);
        this.loop = true;
        this.muted = true;
    }
}
class Sound extends _GameAudio {
    public type = "sound";
    public constructor(src: string, op?: Omit<GameAudioOp, "loop">) {
        super(src, op);
        this.loop = false;
    }
}

const path = "./src/mp3";
export const GameAudio = {
    "Scary-Piano-Glissando": new Sound(`${path}/Scary-Piano-Glissando.mp3`, {
        speed: 2
    }),
    "Anxious-Humming": new Music(`${path}/Anxious-Humming.mp3`),
    "Music": new Music(`${path}/Music.mp3`, {
        volume: .5
    }),
    "Scream": new Sound(`${path}/Scream.mp3`, { volume: .2 }),
    "Scream_p1": new Sound(`${path}/Scream_p1.mp3`, { volume: .2 }),
} as const;


export function MusicEnable() {
    frame == "menu" && GameAudio.Music.play();
    for (let name in GameAudio) {
        let m = GameAudio[name as keyof typeof GameAudio];
        m.type == "music" && (m.muted = false)
    }
}
export function MusicDisable() {
    for (let name in GameAudio) {
        let m = GameAudio[name as keyof typeof GameAudio];
        m.type == "music" && (m.muted = true)
    }
}


export function SoundEnable() {
    for (let name in GameAudio) {
        let m = GameAudio[name as keyof typeof GameAudio];
        m.type == "sound" && (m.muted = false)
    }
}
export function SoundDisable() {
    for (let name in GameAudio) {
        let m = GameAudio[name as keyof typeof GameAudio];
        m.type == "sound" && (m.muted = true)
    }
}


; (window as any).GameAudio = GameAudio;