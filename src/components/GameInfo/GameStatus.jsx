import { Spinner } from '../UI/Spinner';
import { GAME_STATUS } from '../../utils/constants';

export const GameStatus = ({ status, turn, playerColor, isAIThinking }) => {
  const isPlayerTurn = turn === playerColor;

  const getStatusDisplay = () => {
    if (isAIThinking) {
      return {
        text: 'AI Thinking...',
        color: 'text-yellow-600 dark:text-yellow-400',
        bg: 'bg-yellow-50 dark:bg-yellow-900/30',
        showSpinner: true,
      };
    }

    switch (status) {
      case GAME_STATUS.CHECKMATE:
        return {
          text: isPlayerTurn ? 'Checkmate - You Lose!' : 'Checkmate - You Win!',
          color: isPlayerTurn ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400',
          bg: isPlayerTurn ? 'bg-red-50 dark:bg-red-900/30' : 'bg-green-50 dark:bg-green-900/30',
          showSpinner: false,
        };

      case GAME_STATUS.STALEMATE:
        return {
          text: 'Stalemate - Draw',
          color: 'text-gray-600 dark:text-gray-400',
          bg: 'bg-gray-50 dark:bg-gray-800/30',
          showSpinner: false,
        };

      case GAME_STATUS.DRAW:
        return {
          text: 'Draw - Game Over',
          color: 'text-gray-600 dark:text-gray-400',
          bg: 'bg-gray-50 dark:bg-gray-800/30',
          showSpinner: false,
        };

      case GAME_STATUS.RESIGNED:
        return {
          text: 'You Resigned',
          color: 'text-red-600 dark:text-red-400',
          bg: 'bg-red-50 dark:bg-red-900/30',
          showSpinner: false,
        };

      case GAME_STATUS.CHECK:
        return {
          text: isPlayerTurn ? 'You are in Check!' : 'AI is in Check!',
          color: 'text-orange-600 dark:text-orange-400',
          bg: 'bg-orange-50 dark:bg-orange-900/30',
          showSpinner: false,
        };

      default:
        return {
          text: isPlayerTurn ? 'Your Turn' : "AI's Turn",
          color: isPlayerTurn ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400',
          bg: isPlayerTurn ? 'bg-green-50 dark:bg-green-900/30' : 'bg-blue-50 dark:bg-blue-900/30',
          showSpinner: false,
        };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className={`p-4 rounded-lg ${statusDisplay.bg}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Game Status</div>
          <div className={`text-lg font-bold ${statusDisplay.color}`}>
            {statusDisplay.text}
          </div>
        </div>

        {statusDisplay.showSpinner && <Spinner size="medium" />}

        {!statusDisplay.showSpinner && (
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">Turn:</div>
            <div className="text-2xl">{turn === 'w' ? '♔' : '♚'}</div>
          </div>
        )}
      </div>
    </div>
  );
};
