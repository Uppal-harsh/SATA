/**
 * SATA AUDIO SYNTHESIZER (WEB AUDIO API)
 * Subtle, procedural futuristic sound design for clicks, activations, and telemetry.
 * Safe, zero external audio dependencies.
 */

class SataAudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem('sata_audio_enabled') === 'true';
    this.toggleBtn = document.getElementById('audio-toggle-btn');
    this.initHUD();
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  initHUD() {
    if (!this.toggleBtn) return;
    this.updateHUDState();
    this.toggleBtn.addEventListener('click', () => {
      this.enabled = !this.enabled;
      localStorage.setItem('sata_audio_enabled', this.enabled ? 'true' : 'false');
      this.updateHUDState();
      if (this.enabled) {
        this.initContext();
        this.playBeep(880, 0.08, 'sine', 0.12);
      }
    });
  }

  updateHUDState() {
    if (!this.toggleBtn) return;
    if (this.enabled) {
      this.toggleBtn.classList.add('active');
      this.toggleBtn.setAttribute('title', 'Audio Feedback: Active (Click to mute)');
      this.toggleBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      `;
    } else {
      this.toggleBtn.classList.remove('active');
      this.toggleBtn.setAttribute('title', 'Audio Feedback: Muted (Click to enable)');
      this.toggleBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      `;
    }
  }

  playClick() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  }

  playBeep(freq = 640, duration = 0.06, type = 'sine', volume = 0.08) {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playSuccessChime() {
    if (!this.enabled) return;
    this.playBeep(523.25, 0.1, 'sine', 0.1); // C5
    setTimeout(() => this.playBeep(659.25, 0.1, 'sine', 0.1), 80); // E5
    setTimeout(() => this.playBeep(783.99, 0.2, 'sine', 0.12), 160); // G5
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.sataAudio = new SataAudioEngine();
});
