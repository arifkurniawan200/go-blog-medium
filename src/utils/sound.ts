/**
 * Procedural Retro-Modern Web Audio SFX Synthesizer.
 * Default is MUTED (enabled = false) until user explicitly clicks the sound button.
 */
class GameSoundEngine {
  private ctx: AudioContext | null = null;
  public enabled = false;

  private ensureContext(): AudioContext | null {
    if (!this.enabled) return null;
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'square',
    volume = 0.06,
    delay = 0,
    endFreq?: number
  ) {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const startTime = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);
    if (endFreq) {
      osc.frequency.exponentialRampToValueAtTime(endFreq, startTime + duration);
    }

    gain.gain.setValueAtTime(volume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  /** Classic bright 2-note coin pickup chime */
  playCoin() {
    this.playTone(987.77, 0.08, 'square', 0.05, 0); // B5
    this.playTone(1318.51, 0.24, 'square', 0.05, 0.075); // E6
  }

  /** Playful toon jump boing */
  playJump() {
    this.playTone(260, 0.16, 'triangle', 0.09, 0, 620);
  }

  /** Question block bump + power-up pop */
  playBlockHit() {
    this.playTone(320, 0.06, 'square', 0.06, 0, 480);
    this.playTone(523.25, 0.07, 'square', 0.05, 0.06);
    this.playTone(659.25, 0.07, 'square', 0.05, 0.12);
    this.playTone(783.99, 0.14, 'square', 0.05, 0.18);
  }

  /** Warp pipe swoop transition */
  playPipeWarp() {
    this.playTone(420, 0.09, 'sawtooth', 0.045, 0, 140);
    this.playTone(360, 0.09, 'sawtooth', 0.045, 0.09, 110);
    this.playTone(300, 0.12, 'sawtooth', 0.045, 0.18, 90);
  }

  /** Flagpole / Press Start cheerful fanfare */
  playStartFanfare() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, idx) => {
      this.playTone(n, idx === 3 ? 0.26 : 0.08, 'triangle', 0.075, idx * 0.075);
    });
  }

  /** Konami Star Power celebratory arpeggio */
  playStarPower() {
    const notes = [587.33, 659.25, 783.99, 987.77, 1174.66, 987.77, 1318.51];
    notes.forEach((n, idx) => {
      this.playTone(n, 0.09, 'square', 0.05, idx * 0.065);
    });
  }
}

export const soundFX = new GameSoundEngine();
