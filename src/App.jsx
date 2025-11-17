import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Layout/Header';
import { GameSetup } from './components/Controls/GameSetup';
import { ChessBoard } from './components/Board/ChessBoard';
import { PromotionModal } from './components/Board/PromotionModal';
import { GameStatus } from './components/GameInfo/GameStatus';
import { MoveHistory } from './components/GameInfo/MoveHistory';
import { CapturedPieces } from './components/GameInfo/CapturedPieces';
import { GameControls } from './components/Controls/GameControls';
import { useChessGame } from './hooks/useChessGame';
import { useStockfish } from './hooks/useStockfish';
import { useGameSound } from './hooks/useGameSound';
import { useStats } from './hooks/useStats';
import { GAME_STATUS } from './utils/constants';

function App() {
  const [gameConfig, setGameConfig] = useState(null);
  const [boardOrientation, setBoardOrientation] = useState('white');
  const [lastMove, setLastMove] = useState(null);
  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const [pendingMove, setPendingMove] = useState(null);

  const {
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
    fen,
    turn,
    isGameOver,
  } = useChessGame();

  const { getBestMove, isThinking } = useStockfish();
  const { soundEnabled, toggleSound, playSound } = useGameSound();
  const { stats, recordWin, recordLoss, recordDraw } = useStats();

  // Handle AI move
  const handleAIMove = useCallback(async () => {
    if (!gameConfig || turn === gameConfig.playerColor || isGameOver || isThinking) {
      return;
    }

    const aiMove = await getBestMove(fen, gameConfig.depth);

    if (aiMove) {
      const moveResult = makeMove({
        from: aiMove.substring(0, 2),
        to: aiMove.substring(2, 4),
        promotion: aiMove[4] || 'q',
      });

      if (moveResult) {
        setLastMove({ from: aiMove.substring(0, 2), to: aiMove.substring(2, 4) });

        if (moveResult.captured) {
          playSound('capture');
        } else if (moveResult.flags.includes('k') || moveResult.flags.includes('q')) {
          playSound('castle');
        } else {
          playSound('move');
        }
      }
    }
  }, [gameConfig, turn, isGameOver, isThinking, fen, getBestMove, makeMove, playSound]);

  // Trigger AI move when it's AI's turn
  useEffect(() => {
    if (gameConfig && !isGameOver && turn !== gameConfig.playerColor && !isThinking) {
      handleAIMove();
    }
  }, [turn, gameConfig, isGameOver, isThinking, handleAIMove]);

  // Handle game end
  useEffect(() => {
    if (isGameOver) {
      if (status === GAME_STATUS.CHECKMATE) {
        if (turn !== gameConfig?.playerColor) {
          recordWin();
          playSound('gameEnd');
        } else {
          recordLoss();
          playSound('gameEnd');
        }
      } else if (status === GAME_STATUS.STALEMATE || status === GAME_STATUS.DRAW) {
        recordDraw();
        playSound('gameEnd');
      } else if (status === GAME_STATUS.RESIGNED) {
        recordLoss();
        playSound('gameEnd');
      }
    }
  }, [isGameOver, status, turn, gameConfig, recordWin, recordLoss, recordDraw, playSound]);

  // Check for check status
  useEffect(() => {
    if (status === GAME_STATUS.CHECK) {
      playSound('check');
    }
  }, [status, playSound]);

  const handlePieceDrop = (sourceSquare, targetSquare) => {
    if (turn !== gameConfig?.playerColor || isThinking) {
      return false;
    }

    // Check if it's a pawn promotion
    const piece = game.get(sourceSquare);
    const isPromotion =
      piece?.type === 'p' &&
      ((piece.color === 'w' && targetSquare[1] === '8') ||
        (piece.color === 'b' && targetSquare[1] === '1'));

    if (isPromotion) {
      setPendingMove({ from: sourceSquare, to: targetSquare });
      setShowPromotionModal(true);
      return false;
    }

    const moveResult = makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if (moveResult) {
      setLastMove({ from: sourceSquare, to: targetSquare });

      if (moveResult.captured) {
        playSound('capture');
      } else if (moveResult.flags.includes('k') || moveResult.flags.includes('q')) {
        playSound('castle');
      } else {
        playSound('move');
      }

      return true;
    }

    return false;
  };

  const handleSquareClick = (square) => {
    if (turn !== gameConfig?.playerColor || isThinking) {
      return;
    }

    // If a square is already selected and the clicked square is a legal move
    if (selectedSquare && legalMoves.includes(square)) {
      handlePieceDrop(selectedSquare, square);
    } else {
      selectSquare(square);
    }
  };

  const handlePromotion = (promotionPiece) => {
    if (pendingMove) {
      const moveResult = makeMove({
        from: pendingMove.from,
        to: pendingMove.to,
        promotion: promotionPiece,
      });

      if (moveResult) {
        setLastMove({ from: pendingMove.from, to: pendingMove.to });
        playSound('move');
      }
    }

    setShowPromotionModal(false);
    setPendingMove(null);
  };

  const handleStartGame = (config) => {
    setGameConfig(config);
    setBoardOrientation(config.playerColor === 'w' ? 'white' : 'black');
    resetGame();
    setLastMove(null);

    // If AI plays white, make AI move
    if (config.playerColor === 'b') {
      setTimeout(() => {
        handleAIMove();
      }, 500);
    }
  };

  const handleNewGame = () => {
    setGameConfig(null);
    resetGame();
    setLastMove(null);
  };

  const handleUndoMove = () => {
    undoMove();
    setLastMove(null);
  };

  const handleResign = () => {
    resign();
    recordLoss();
  };

  const handleFlipBoard = () => {
    setBoardOrientation(prev => (prev === 'white' ? 'black' : 'white'));
  };

  const kingSquare = status === GAME_STATUS.CHECK ? getKingSquare(turn) : null;

  return (
    <div className="min-h-screen">
      <Header soundEnabled={soundEnabled} onToggleSound={toggleSound} />

      {!gameConfig ? (
        <GameSetup onStartGame={handleStartGame} stats={stats} />
      ) : (
        <div className="max-w-7xl mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chess Board */}
            <div className="lg:col-span-2">
              <ChessBoard
                position={fen}
                onPieceDrop={handlePieceDrop}
                onSquareClick={handleSquareClick}
                boardOrientation={boardOrientation}
                selectedSquare={selectedSquare}
                legalMoves={legalMoves}
                lastMove={lastMove}
                isCheck={status === GAME_STATUS.CHECK}
                kingSquare={kingSquare}
                disabled={isThinking || isGameOver}
              />
            </div>

            {/* Game Info Panel */}
            <div className="space-y-4">
              <GameStatus
                status={status}
                turn={turn}
                playerColor={gameConfig.playerColor}
                isAIThinking={isThinking}
              />

              <CapturedPieces gameHistory={gameHistory} game={game} />

              <MoveHistory gameHistory={gameHistory} />

              <GameControls
                onNewGame={handleNewGame}
                onUndoMove={handleUndoMove}
                onResign={handleResign}
                onFlipBoard={handleFlipBoard}
                game={game}
                canUndo={gameHistory.length >= 2}
                isGameOver={isGameOver}
              />
            </div>
          </div>
        </div>
      )}

      {/* Promotion Modal */}
      <PromotionModal
        isOpen={showPromotionModal}
        color={turn}
        onSelect={handlePromotion}
      />
    </div>
  );
}

export default App;
