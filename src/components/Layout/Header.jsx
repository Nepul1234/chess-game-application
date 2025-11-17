import { FiVolume2, FiVolumeX } from 'react-icons/fi';
import { ThemeToggle } from './ThemeToggle';

export const Header = ({ soundEnabled, onToggleSound }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl">♔</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Chess Game
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSound}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle sound"
          >
            {soundEnabled ? (
              <FiVolume2 className="w-5 h-5" />
            ) : (
              <FiVolumeX className="w-5 h-5" />
            )}
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
