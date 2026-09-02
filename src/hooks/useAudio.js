import { useState, useEffect, useRef, useCallback } from 'react';

export function useAudio() {
  const [enabled, setEnabled] = useState(() => {
    return localStorage.getItem('sata_audio_enabled') === 'true';
  });
  const audioCtxRef = useRef(null);

  const initContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtxRef.current = new AudioContext();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  }, []);

  const toggleAudio = useCallback(() => {
    setEnabled(prev => {
      const next = !prev;
      localStorage.setItem('sata_audio_enabled', String(next));
      if (next) {
        initContext();
        // Play activation blip
        try {
          if (audioCtxRef.current) {
            const osc = audioCtxRef.current.createOscillator();
            const gain = audioCtxRef.current.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, audioCtxRef.current.currentTime);
            gain.gain.setValueAtTime(0.1, audioCtxRef.current.currentTime);
            gain.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.08);
            osc.connect(gain);
            gain.connect(audioCtxRef.current.destination);
            osc.start();
            osc.stop(audioCtxRef.current.currentTime + 0.08);
          }
        } catch (e) {}
      }
      return next;
    });
  }, [initContext]);

  const playClick = useCallback(() => {
    if (!enabled) return;
    initContext();
    if (!audioCtxRef.current) return;

    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {}
  }, [enabled, initContext]);

  const playSuccess = useCallback(() => {
    if (!enabled) return;
    initContext();
    if (!audioCtxRef.current) return;

    const playTone = (freq, delay, dur) => {
      setTimeout(() => {
        try {
          const ctx = audioCtxRef.current;
          if (!ctx) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + dur);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + dur);
        } catch (e) {}
      }, delay);
    };

    playTone(523.25, 0, 0.1); // C5
    playTone(659.25, 90, 0.1); // E5
    playTone(783.99, 180, 0.2); // G5
  }, [enabled, initContext]);

  return { enabled, toggleAudio, playClick, playSuccess };
}
