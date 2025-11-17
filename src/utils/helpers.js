import { PIECE_VALUES } from './constants';

/**
 * Calculate material advantage for the current player
 * @param {Chess} game - Chess.js game instance
 * @returns {number} Material advantage (positive = player ahead, negative = player behind)
 */
export const calculateMaterialAdvantage = (game) => {
  const board = game.board();
  let whiteMaterial = 0;
  let blackMaterial = 0;

  board.forEach(row => {
    row.forEach(square => {
      if (square) {
        const value = PIECE_VALUES[square.type];
        if (square.color === 'w') {
          whiteMaterial += value;
        } else {
          blackMaterial += value;
        }
      }
    });
  });

  return whiteMaterial - blackMaterial;
};

/**
 * Get captured pieces for display
 * @param {Array} history - Game history from chess.js
 * @returns {Object} Object with white and black captured pieces
 */
export const getCapturedPieces = (history) => {
  const captured = { white: [], black: [] };

  history.forEach(move => {
    if (move.captured) {
      if (move.color === 'w') {
        captured.black.push(move.captured);
      } else {
        captured.white.push(move.captured);
      }
    }
  });

  return captured;
};

/**
 * Format move history for display
 * @param {Array} history - Game history from chess.js
 * @returns {Array} Formatted move pairs
 */
export const formatMoveHistory = (history) => {
  const moves = [];
  for (let i = 0; i < history.length; i += 2) {
    moves.push({
      moveNumber: Math.floor(i / 2) + 1,
      white: history[i]?.san || '',
      black: history[i + 1]?.san || '',
    });
  }
  return moves;
};

/**
 * Download game as PGN file
 * @param {Chess} game - Chess.js game instance
 */
export const downloadPGN = (game) => {
  const pgn = game.pgn();
  const blob = new Blob([pgn], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `chess-game-${Date.now()}.pgn`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Copy FEN to clipboard
 * @param {string} fen - FEN string
 * @returns {Promise<boolean>} Success status
 */
export const copyFENToClipboard = async (fen) => {
  try {
    await navigator.clipboard.writeText(fen);
    return true;
  } catch (err) {
    console.error('Failed to copy FEN:', err);
    return false;
  }
};

/**
 * Get piece symbol for display
 * @param {string} piece - Piece type (p, n, b, r, q, k)
 * @returns {string} Unicode chess piece symbol
 */
export const getPieceSymbol = (piece, color = 'w') => {
  const symbols = {
    w: { k: '♔', q: '♕', r: '♖', b: '♗', n: '♘', p: '♙' },
    b: { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' },
  };
  return symbols[color][piece] || '';
};

/**
 * Get random AI delay
 * @param {number} min - Minimum delay
 * @param {number} max - Maximum delay
 * @returns {number} Random delay in ms
 */
export const getRandomDelay = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Convert move to UCI format
 * @param {Object} move - Move object
 * @returns {string} UCI format move
 */
export const moveToUCI = (move) => {
  if (typeof move === 'string') return move;
  return `${move.from}${move.to}${move.promotion || ''}`;
};
