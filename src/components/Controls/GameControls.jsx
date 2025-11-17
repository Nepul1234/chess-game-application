import { useState } from 'react';
import { FiRotateCw, FiDownload, FiCopy, FiRefreshCw, FiFlag } from 'react-icons/fi';
import { Button } from '../UI/Button';
import { Modal } from '../UI/Modal';
import { downloadPGN, copyFENToClipboard } from '../../utils/helpers';

export const GameControls = ({
  onNewGame,
  onUndoMove,
  onResign,
  onFlipBoard,
  game,
  canUndo,
  isGameOver,
}) => {
  const [showResignModal, setShowResignModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleDownloadPGN = () => {
    downloadPGN(game);
  };

  const handleCopyFEN = async () => {
    const success = await copyFENToClipboard(game.fen());
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleResignClick = () => {
    setShowResignModal(true);
  };

  const handleConfirmResign = () => {
    setShowResignModal(false);
    onResign();
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Game Controls
        </h3>

        <div className="space-y-2">
          <Button
            onClick={onNewGame}
            variant="primary"
            className="w-full flex items-center justify-center gap-2"
          >
            <FiRefreshCw className="w-4 h-4" />
            New Game
          </Button>

          <Button
            onClick={onUndoMove}
            variant="secondary"
            disabled={!canUndo || isGameOver}
            className="w-full flex items-center justify-center gap-2"
          >
            <FiRotateCw className="w-4 h-4" />
            Undo Move
          </Button>

          <Button
            onClick={handleResignClick}
            variant="danger"
            disabled={isGameOver}
            className="w-full flex items-center justify-center gap-2"
          >
            <FiFlag className="w-4 h-4" />
            Resign
          </Button>

          <Button
            onClick={onFlipBoard}
            variant="secondary"
            className="w-full flex items-center justify-center gap-2"
          >
            <FiRotateCw className="w-4 h-4" />
            Flip Board
          </Button>

          <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <Button
              onClick={handleDownloadPGN}
              variant="secondary"
              className="w-full flex items-center justify-center gap-2 text-sm"
            >
              <FiDownload className="w-4 h-4" />
              Download PGN
            </Button>

            <Button
              onClick={handleCopyFEN}
              variant="secondary"
              className="w-full flex items-center justify-center gap-2 text-sm"
            >
              <FiCopy className="w-4 h-4" />
              {copySuccess ? 'Copied!' : 'Copy FEN'}
            </Button>
          </div>
        </div>
      </div>

      {/* Resign Confirmation Modal */}
      <Modal
        isOpen={showResignModal}
        onClose={() => setShowResignModal(false)}
        title="Resign Game"
      >
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to resign? This will end the game and count as a loss.
        </p>

        <div className="flex gap-3">
          <Button
            onClick={() => setShowResignModal(false)}
            variant="secondary"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmResign}
            variant="danger"
            className="flex-1"
          >
            Resign
          </Button>
        </div>
      </Modal>
    </>
  );
};
