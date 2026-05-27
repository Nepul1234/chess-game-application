# Chess Game

A fully-featured chess application built with React 18 and Vite, with an AI opponent powered by the Stockfish engine running in a Web Worker.

## Features

- **AI opponent** — five difficulty levels (Beginner → Expert) via Stockfish.js (WebAssembly)
- **Full chess rules** — castling, en passant, pawn promotion, check/checkmate/stalemate/draw detection
- **Move input** — drag-and-drop or click-to-move, with legal move highlights
- **Game tools** — undo last round, resign, flip board, export PGN, copy FEN
- **Game info panel** — move history (algebraic notation), captured pieces, material advantage
- **Statistics** — wins, losses, draws, and current win streak saved to local storage
- **Sounds** — distinct audio cues for moves, captures, check, castling, and game end
- **Themes** — dark / light mode with system preference detection
- **Responsive layout** — works on desktop, tablet, and mobile

## Tech Stack

| Layer | Library |
|---|---|
| UI framework | React 18 + Vite |
| Styling | Tailwind CSS |
| Chess logic | chess.js |
| Board component | react-chessboard |
| AI engine | Stockfish.js (WASM, Web Worker) |
| Icons | react-icons |

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
# Production build
npm run build

# Preview the production build
npm run preview
```

## How to Play

1. On the setup screen, pick your color (White / Black / Random) and an AI difficulty.
2. Click **Start Game**.
3. Move pieces by dragging or by clicking a piece then clicking a destination square. Green dots show legal moves.
4. Pawn promotions open a modal — pick Queen, Rook, Bishop, or Knight.
5. Use the controls panel on the right to undo, resign, flip the board, or start a new game.

### AI Difficulty Levels

| Level | Engine depth | Character |
|---|---|---|
| Beginner | 2 | Makes occasional blunders |
| Easy | 5 | Casual play |
| Medium | 10 | Moderate challenge |
| Hard | 15 | Strong, consistent play |
| Expert | 20 | Near-maximum strength |

## Project Structure

```
chess-game-application/
├── public/
│   └── stockfish/          # Stockfish WASM engine files
└── src/
    ├── components/
    │   ├── Board/           # ChessBoard, PromotionModal
    │   ├── Controls/        # GameSetup, GameControls
    │   ├── GameInfo/        # GameStatus, MoveHistory, CapturedPieces
    │   ├── Layout/          # Header, ThemeToggle
    │   └── UI/              # Button, Modal, Spinner
    ├── context/
    │   └── ThemeContext.jsx
    ├── hooks/
    │   ├── useChessGame.js  # Core game state and move logic
    │   ├── useStockfish.js  # Stockfish Web Worker bridge
    │   ├── useGameSound.js  # Audio cues
    │   └── useStats.js      # Persistent statistics
    ├── utils/
    │   ├── constants.js
    │   └── helpers.js
    └── App.jsx
```

## Credits

- [Stockfish.js](https://github.com/nmrugg/stockfish.js) — chess engine
- [chess.js](https://github.com/jhlywa/chess.js) — move generation and validation
- [react-chessboard](https://github.com/Clariity/react-chessboard) — board rendering

## License

MIT
