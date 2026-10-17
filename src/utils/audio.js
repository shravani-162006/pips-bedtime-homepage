// Web Audio API Synthesizer for Pip's Bedtime Homepage
// Zero external audio files required — synthesizes dreamy chimes, giggles, clicks, and music box tones.

class AudioManager {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // strictly muted by default to comply with "audio must never autoplay"
    this.masterGain = null;
    this.noteFrequencies = {
      'C4': 261.63,
      'D4': 293.66,
      'E4': 329.63,
      'G4': 392.00,
      'A4': 440.00,
      'C5': 523.25,
      'D5': 587.33,
      'E5': 659.25,
      'G5': 783.99,
      'A5': 880.00,
      'C6': 1046.50
    };
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = this.isMuted ? 0 : 0.35;
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (!this.ctx && !muted) {
      this.init();
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.35, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  toggleMute() {
    return this.setMuted(!this.isMuted);
  }

  // Play a dreamy music-box bell note
  playChime(note = 'C5', type = 'musicBox', duration = 1.2) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const freq = typeof note === 'number' ? note : (this.noteFrequencies[note] || 523.25);
    const now = this.ctx.currentTime;

    // Primary bell tone
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();

    // Warm harmonic overtone (gives authentic music box sparkle)
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();

    if (type === 'musicBox') {
      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, now);
      osc2.frequency.setValueAtTime(freq * 2.76, now); // slightly metallic bell overtone

      gain1.gain.setValueAtTime(0.4, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + duration);

      gain2.gain.setValueAtTime(0.12, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.4);
    } else if (type === 'glass') {
      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);
      osc2.frequency.setValueAtTime(freq * 3.0, now);

      gain1.gain.setValueAtTime(0.35, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + duration * 1.5);

      gain2.gain.setValueAtTime(0.08, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.8);
    } else { // harp
      osc1.type = 'triangle';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);
      osc2.frequency.setValueAtTime(freq * 1.5, now);

      gain1.gain.setValueAtTime(0.3, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.8);

      gain2.gain.setValueAtTime(0.05, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.3);
    }

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(this.masterGain);
    gain2.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.1);
    osc2.stop(now + duration + 0.1);
  }

  // Pip's cute baby giggle sound
  playGiggle() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Pip chuckles with 3 rapid rising chirps
    const chirps = [
      { time: 0.00, freq: 580, endFreq: 750, dur: 0.10 },
      { time: 0.11, freq: 650, endFreq: 880, dur: 0.12 },
      { time: 0.24, freq: 720, endFreq: 960, dur: 0.14 }
    ];

    chirps.forEach(({ time, freq, endFreq, dur }) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + time);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + time + dur * 0.7);
      osc.frequency.exponentialRampToValueAtTime(freq, now + time + dur);

      gain.gain.setValueAtTime(0.2, now + time);
      gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + time);
      osc.stop(now + time + dur + 0.05);
    });
  }

  // UI button click sound (subtle soft wooden click)
  playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Mechanical odometer tick
  playOdometerTick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.setValueAtTime(220, now + 0.02);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  // Easter egg fanfare / secret melody
  playSecretFanfare() {
    if (this.isMuted) return;
    const notes = ['C5', 'E5', 'G5', 'A5', 'C6'];
    notes.forEach((note, index) => {
      setTimeout(() => {
        this.playChime(note, 'musicBox', 1.5);
      }, index * 120);
    });
  }
}

export const soundFx = new AudioManager();
