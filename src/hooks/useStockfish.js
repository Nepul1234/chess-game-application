import { useState, useRef, useEffect, useCallback } from 'react';
import { AI_DELAY } from '../utils/constants';
import { getRandomDelay } from '../utils/helpers';

export const useStockfish = () => {
  const [isThinking, setIsThinking] = useState(false);
  const engineRef = useRef(null);
  const resolveRef = useRef(null);

  useEffect(() => {
    // Initialize Stockfish engine as a Web Worker
    try {
      engineRef.current = new Worker('/stockfish/stockfish.js');
      engineRef.current.postMessage('uci');

      engineRef.current.onmessage = (event) => {
        const message = event.data;

        if (message.startsWith('bestmove')) {
          const moveMatch = message.match(/bestmove ([a-h][1-8][a-h][1-8][qrbn]?)/);
          if (moveMatch && resolveRef.current) {
            const move = moveMatch[1];
            // Add natural delay before returning the move
            const delay = getRandomDelay(AI_DELAY.MIN, AI_DELAY.MAX);
            setTimeout(() => {
              setIsThinking(false);
              if (resolveRef.current) {
                resolveRef.current(move);
                resolveRef.current = null;
              }
            }, delay);
          }
        }
      };
    } catch (error) {
      console.error('Failed to initialize Stockfish:', error);
    }

    return () => {
      if (engineRef.current) {
        engineRef.current.terminate();
      }
    };
  }, []);

  const getBestMove = useCallback((fen, depth = 10) => {
    return new Promise((resolve) => {
      if (!engineRef.current) {
        console.error('Stockfish engine not initialized');
        resolve(null);
        return;
      }

      setIsThinking(true);
      resolveRef.current = resolve;

      // Send position and search command to Stockfish
      engineRef.current.postMessage(`position fen ${fen}`);
      engineRef.current.postMessage(`go depth ${depth}`);
    });
  }, []);

  return {
    getBestMove,
    isThinking,
  };
};
