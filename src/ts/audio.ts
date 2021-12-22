class _GameAudio extends Audio {
    constructor(src: string, op: {
        speed?: number,
        loop?: boolean,
        autoplay?: boolean
    }) {
        super(src);
        this.playbackRate = op.speed ?? 1;
        this.loop = op.loop ?? false;
        this.autoplay = op.autoplay ?? false;
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

const path = "./src/mp3";
export const GameAudio = {
    "Scary-Piano-Glissando": new _GameAudio(`${path}/Scary-Piano-Glissando.mp3`, {
        speed: 2
    }),
    "Anxious-Humming": new _GameAudio(`${path}/Anxious-Humming.mp3`, {
        loop: true
    })
} as const;


(window as any).GameAudio = GameAudio;