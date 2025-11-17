import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { useTheme } from '../../context/ThemeContext';

export const ChessBoard = ({
  position,
  onPieceDrop,
  onSquareClick,
  boardOrientation = 'white',
  selectedSquare = null,
  legalMoves = [],
  lastMove = null,
  isCheck = false,
  kingSquare = null,
  disabled = false,
}) => {
  const { isDark } = useTheme();
  const [rightClickedSquares, setRightClickedSquares] = useState({});

  const customSquareStyles = () => {
    const styles = {};

    // Highlight selected square
    if (selectedSquare) {
      styles[selectedSquare] = {
        backgroundColor: 'rgba(255, 255, 0, 0.4)',
      };
    }

    // Highlight legal moves
    legalMoves.forEach(square => {
      styles[square] = {
        background: 'radial-gradient(circle, rgba(0, 255, 0, 0.5) 25%, transparent 25%)',
        borderRadius: '50%',
      };
    });

    // Highlight last move
    if (lastMove) {
      styles[lastMove.from] = {
        backgroundColor: 'rgba(255, 255, 0, 0.3)',
      };
      styles[lastMove.to] = {
        backgroundColor: 'rgba(255, 255, 0, 0.3)',
      };
    }

    // Highlight king in check
    if (isCheck && kingSquare) {
      styles[kingSquare] = {
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        boxShadow: 'inset 0 0 0 4px rgba(239, 68, 68, 0.7)',
      };
    }

    // Right-clicked squares
    Object.keys(rightClickedSquares).forEach(square => {
      styles[square] = {
        backgroundColor: rightClickedSquares[square],
      };
    });

    return styles;
  };

  const onSquareRightClick = (square) => {
    const color = 'rgba(255, 0, 0, 0.4)';
    setRightClickedSquares(prev => ({
      ...prev,
      [square]: prev[square] ? undefined : color,
    }));
  };

  return (
    <div className="w-full max-w-[600px] mx-auto">
      <Chessboard
        position={position}
        onPieceDrop={onPieceDrop}
        onSquareClick={onSquareClick}
        onSquareRightClick={onSquareRightClick}
        boardOrientation={boardOrientation}
        customSquareStyles={customSquareStyles()}
        customDarkSquareStyle={{
          backgroundColor: isDark ? '#4b5563' : '#b45309',
        }}
        customLightSquareStyle={{
          backgroundColor: isDark ? '#d1d5db' : '#fef3c7',
        }}
        arePiecesDraggable={!disabled}
        customBoardStyle={{
          borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
        }}
      />
    </div>
  );
};
