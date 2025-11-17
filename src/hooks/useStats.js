import { useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS } from '../utils/constants';

const DEFAULT_STATS = {
  gamesPlayed: 0,
  wins: 0,
  losses: 0,
  draws: 0,
  currentStreak: 0,
  bestStreak: 0,
};

export const useStats = () => {
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATS);
    return saved ? JSON.parse(saved) : DEFAULT_STATS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  }, [stats]);

  const recordWin = useCallback(() => {
    setStats(prev => {
      const newStreak = prev.currentStreak + 1;
      return {
        ...prev,
        gamesPlayed: prev.gamesPlayed + 1,
        wins: prev.wins + 1,
        currentStreak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak),
      };
    });
  }, []);

  const recordLoss = useCallback(() => {
    setStats(prev => ({
      ...prev,
      gamesPlayed: prev.gamesPlayed + 1,
      losses: prev.losses + 1,
      currentStreak: 0,
    }));
  }, []);

  const recordDraw = useCallback(() => {
    setStats(prev => ({
      ...prev,
      gamesPlayed: prev.gamesPlayed + 1,
      draws: prev.draws + 1,
      currentStreak: 0,
    }));
  }, []);

  const resetStats = useCallback(() => {
    setStats(DEFAULT_STATS);
  }, []);

  const winPercentage = stats.gamesPlayed > 0
    ? ((stats.wins / stats.gamesPlayed) * 100).toFixed(1)
    : 0;

  return {
    stats,
    recordWin,
    recordLoss,
    recordDraw,
    resetStats,
    winPercentage,
  };
};
