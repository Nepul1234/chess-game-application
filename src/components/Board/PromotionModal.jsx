import { Modal } from '../UI/Modal';
import { PROMOTION_PIECES } from '../../utils/constants';
import { getPieceSymbol } from '../../utils/helpers';

export const PromotionModal = ({ isOpen, color, onSelect }) => {
  const pieceNames = {
    q: 'Queen',
    r: 'Rook',
    b: 'Bishop',
    n: 'Knight',
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}} title="Promote Pawn" showCloseButton={false}>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Choose a piece to promote your pawn to:
      </p>

      <div className="grid grid-cols-2 gap-4">
        {PROMOTION_PIECES.map(piece => (
          <button
            key={piece}
            onClick={() => onSelect(piece)}
            className="p-6 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 transition-all"
          >
            <div className="text-5xl mb-2">{getPieceSymbol(piece, color)}</div>
            <div className="text-sm font-medium">{pieceNames[piece]}</div>
          </button>
        ))}
      </div>
    </Modal>
  );
};
