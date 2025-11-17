import { useEffect, useRef } from 'react';
import { formatMoveHistory } from '../../utils/helpers';

export const MoveHistory = ({ gameHistory }) => {
  const scrollRef = useRef(null);
  const formattedMoves = formatMoveHistory(gameHistory);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [gameHistory]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
        Move History
      </h3>

      <div
        ref={scrollRef}
        className="max-h-64 overflow-y-auto space-y-1 border border-gray-200 dark:border-gray-700 rounded p-2"
      >
        {formattedMoves.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-4">
            No moves yet
          </div>
        ) : (
          formattedMoves.map((move) => (
            <div
              key={move.moveNumber}
              className="grid grid-cols-3 gap-2 px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm"
            >
              <div className="text-gray-500 dark:text-gray-400 font-medium">
                {move.moveNumber}.
              </div>
              <div className="font-mono text-gray-900 dark:text-gray-100">
                {move.white}
              </div>
              <div className="font-mono text-gray-900 dark:text-gray-100">
                {move.black}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
