import { useState } from 'react';
import { Button } from '../UI/Button';
import { DIFFICULTY_LEVELS, PLAYER_COLORS } from '../../utils/constants';

export const GameSetup = ({ onStartGame, stats }) => {
  const [selectedColor, setSelectedColor] = useState(PLAYER_COLORS.WHITE);
  const [selectedDifficulty, setSelectedDifficulty] = useState('MEDIUM');

  const handleStartGame = () => {
    let playerColor = selectedColor;
    if (selectedColor === PLAYER_COLORS.RANDOM) {
      playerColor = Math.random() < 0.5 ? PLAYER_COLORS.WHITE : PLAYER_COLORS.BLACK;
    }

    onStartGame({
      playerColor,
      difficulty: selectedDifficulty,
      depth: DIFFICULTY_LEVELS[selectedDifficulty].depth,
    });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
          New Chess Game
        </h2>

        {/* Statistics */}
        {stats.gamesPlayed > 0 && (
          <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Your Statistics
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Games: {stats.gamesPlayed}</div>
              <div>Wins: {stats.wins}</div>
              <div>Losses: {stats.losses}</div>
              <div>Draws: {stats.draws}</div>
              <div>Win Rate: {((stats.wins / stats.gamesPlayed) * 100).toFixed(1)}%</div>
              <div>Best Streak: {stats.bestStreak}</div>
            </div>
          </div>
        )}

        {/* Color Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            Choose Your Color
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setSelectedColor(PLAYER_COLORS.WHITE)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedColor === PLAYER_COLORS.WHITE
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
              }`}
            >
              <div className="text-3xl mb-1">♔</div>
              <div className="text-sm font-medium">White</div>
            </button>
            <button
              onClick={() => setSelectedColor(PLAYER_COLORS.BLACK)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedColor === PLAYER_COLORS.BLACK
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
              }`}
            >
              <div className="text-3xl mb-1">♚</div>
              <div className="text-sm font-medium">Black</div>
            </button>
            <button
              onClick={() => setSelectedColor(PLAYER_COLORS.RANDOM)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedColor === PLAYER_COLORS.RANDOM
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
              }`}
            >
              <div className="text-3xl mb-1">🎲</div>
              <div className="text-sm font-medium">Random</div>
            </button>
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            AI Difficulty
          </label>
          <div className="space-y-2">
            {Object.entries(DIFFICULTY_LEVELS).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setSelectedDifficulty(key)}
                className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                  selectedDifficulty === key
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{value.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Depth: {value.depth}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <Button
          onClick={handleStartGame}
          variant="primary"
          className="w-full py-3 text-lg font-semibold"
        >
          Start Game
        </Button>
      </div>
    </div>
  );
};
