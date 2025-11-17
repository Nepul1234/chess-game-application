import { useState, useEffect, useCallback, useRef } from 'react';
import { STORAGE_KEYS } from '../utils/constants';

export const useGameSound = () => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SOUND);
    return saved === null ? true : saved === 'true';
  });

  const audioCache = useRef({});

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SOUND, soundEnabled.toString());
  }, [soundEnabled]);

  const playSound = useCallback((soundType) => {
    if (!soundEnabled) return;

    // For this implementation, we'll use simple beep sounds
    // In a production app, you would load actual sound files
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Different frequencies for different sounds
    const frequencies = {
      move: 440,
      capture: 550,
      check: 660,
      castle: 380,
      gameEnd: 330,
    };

    oscillator.frequency.value = frequencies[soundType] || 440;
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  }, [soundEnabled]);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  return {
    soundEnabled,
    toggleSound,
    playSound,
  };
};
