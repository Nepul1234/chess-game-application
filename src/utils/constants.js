// AI Difficulty Levels
export const DIFFICULTY_LEVELS = {
  BEGINNER: { name: 'Beginner', depth: 2 },
  EASY: { name: 'Easy', depth: 5 },
  MEDIUM: { name: 'Medium', depth: 10 },
  HARD: { name: 'Hard', depth: 15 },
  EXPERT: { name: 'Expert', depth: 20 },
};

// Player Colors
export const PLAYER_COLORS = {
  WHITE: 'w',
  BLACK: 'b',
  RANDOM: 'random',
};

// Game Status
export const GAME_STATUS = {
  SETUP: 'setup',
  PLAYING: 'playing',
  CHECK: 'check',
  CHECKMATE: 'checkmate',
  STALEMATE: 'stalemate',
  DRAW: 'draw',
  RESIGNED: 'resigned',
};

// Piece Values for Material Calculation
export const PIECE_VALUES = {
  p: 1,  // Pawn
  n: 3,  // Knight
  b: 3,  // Bishop
  r: 5,  // Rook
  q: 9,  // Queen
  k: 0,  // King (not counted in material)
};

// Promotion Pieces
export const PROMOTION_PIECES = ['q', 'r', 'b', 'n'];

// Storage Keys
export const STORAGE_KEYS = {
  THEME: 'chess-theme',
  SOUND: 'chess-sound-enabled',
  STATS: 'chess-stats',
};

// AI Thinking Delay (ms)
export const AI_DELAY = {
  MIN: 800,
  MAX: 1500,
};
