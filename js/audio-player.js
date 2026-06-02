class VoiceNotePlayer {
    constructor() {
        this.playBtn = document.getElementById('voicePlayBtn');
        this.waveform = document.getElementById('waveform');
        this.durationEl = document.getElementById('voiceDuration');
        this.audio = new Audio('assets/audio/voice-note.mp3');
        this.isPlaying = false;
        this.bars = [];
        this.duration = 6; // seconds

        this.init();
    }

    init() {
        this.createWaveform();

        this.playBtn.addEventListener('click', () => this.toggle());

        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.onEnded());
        this.audio.addEventListener('loadedmetadata', () => {
            this.duration = this.audio.duration;
        });
    }

    createWaveform() {
        const barCount = 30;

        for (let i = 0; i < barCount; i++) {
            const bar = document.createElement('div');
            bar.className = 'bar';
            // Random height between 20% and 100%
            const height = 20 + Math.random() * 80;
            bar.style.height = `${height}%`;
            this.waveform.appendChild(bar);
            this.bars.push(bar);
        }
    }

    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        this.audio.play();
        this.isPlaying = true;
        this.playBtn.classList.add('playing');
        this.playBtn.querySelector('.play-icon').classList.add('hidden');
        this.playBtn.querySelector('.pause-icon').classList.remove('hidden');
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.playBtn.classList.remove('playing');
        this.playBtn.querySelector('.play-icon').classList.remove('hidden');
        this.playBtn.querySelector('.pause-icon').classList.add('hidden');
    }

    updateProgress() {
        const progress = this.audio.currentTime / this.duration;
        const activeBars = Math.floor(progress * this.bars.length);

        this.bars.forEach((bar, i) => {
            if (i < activeBars) {
                bar.classList.add('played');
                bar.classList.remove('active');
            } else if (i === activeBars) {
                bar.classList.add('active');
            } else {
                bar.classList.remove('played', 'active');
            }
        });

        // Update duration text
        const remaining = Math.ceil(this.duration - this.audio.currentTime);
        this.durationEl.textContent = `0:${remaining.toString().padStart(2, '0')}`;
    }

    onEnded() {
        this.pause();
        this.bars.forEach(bar => bar.classList.remove('played', 'active'));
        this.durationEl.textContent = `0:0${this.duration}`;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('voicePlayBtn')) {
        window.voicePlayer = new VoiceNotePlayer();
    }
});