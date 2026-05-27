import { useState, useCallback } from 'react';
import { Chess } from 'chess.js';
import { GAME_STATUS } from '../utils/constants';

export const useChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [gameHistory, setGameHistory] = useState([]);
  const [status, setStatus] = useState(GAME_STATUS.PLAYING);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);

  const updateStatus = useCallback((currentGame) => {
    if (currentGame.isCheckmate()) {
      setStatus(GAME_STATUS.CHECKMATE);
    } else if (currentGame.isStalemate()) {
      setStatus(GAME_STATUS.STALEMATE);
    } else if (currentGame.isDraw()) {
      setStatus(GAME_STATUS.DRAW);
    } else if (currentGame.isCheck()) {
      setStatus(GAME_STATUS.CHECK);
    } else {
      setStatus(GAME_STATUS.PLAYING);
    }
  }, []);

  const makeMove = useCallback((move) => {
    try {
      const gameCopy = new Chess(game.fen());
      const result = gameCopy.move(move);

      if (result) {
        setGame(gameCopy);
        setGameHistory(prev => [...prev, result]);
        updateStatus(gameCopy);
        setSelectedSquare(null);
        setLegalMoves([]);
        return result;
      }
      return null;
    } catch (error) {
      console.error('Invalid move:', error);
      return null;
    }
  }, [game, updateStatus]);

  const resetGame = useCallback(() => {
    const newGame = new Chess();
    setGame(newGame);
    setGameHistory([]);
    setStatus(GAME_STATUS.PLAYING);
    setSelectedSquare(null);
    setLegalMoves([]);
  }, []);

  const undoMove = useCallback(() => {
    if (gameHistory.length < 2) return;
    const remainingMoves = gameHistory.slice(0, -2);
    const newGame = new Chess();
    remainingMoves.forEach(m => newGame.move(m.san));
    setGame(newGame);
    setGameHistory(remainingMoves);
    updateStatus(newGame);
    setSelectedSquare(null);
    setLegalMoves([]);
  }, [gameHistory, updateStatus]);

  const resign = useCallback(() => {
    setStatus(GAME_STATUS.RESIGNED);
  }, []);

  const getLegalMovesForSquare = useCallback((square) => {
    const moves = game.moves({ square, verbose: true });
    return moves.map(move => move.to);
  }, [game]);

  const selectSquare = useCallback((square) => {
    const piece = game.get(square);

    if (piece && piece.color === game.turn()) {
      setSelectedSquare(square);
      setLegalMoves(getLegalMovesForSquare(square));
    } else {
      setSelectedSquare(null);
      setLegalMoves([]);
    }
  }, [game, getLegalMovesForSquare]);

  const getKingSquare = useCallback((color) => {
    const board = game.board();
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.type === 'k' && piece.color === color) {
          const files = 'abcdefgh';
          return files[col] + (8 - row);
        }
      }
    }
    return null;
  }, [game]);

  return {
    game,
    gameHistory,
    status,
    selectedSquare,
    legalMoves,
    makeMove,
    resetGame,
    undoMove,
    resign,
    selectSquare,
    getKingSquare,
    fen: game.fen(),
    turn: game.turn(),
    isGameOver: game.isGameOver() || status === GAME_STATUS.RESIGNED,
    pgn: game.pgn(),
  };
};
