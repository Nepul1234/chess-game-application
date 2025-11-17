# Chess Game Application

A fully-featured chess game built with React 18, Vite, and Tailwind CSS. Play against an AI opponent powered by Stockfish.js with multiple difficulty levels.

## Features

### Core Gameplay
- **Full Chess Rules Implementation** - All standard chess rules including castling, en passant, and pawn promotion
- **AI Opponent** - Play against Stockfish.js engine with 5 difficulty levels
- **Move Validation** - Only legal moves are allowed
- **Move Highlighting** - See legal moves when a piece is selected
- **Check Detection** - Visual indication when king is in check
- **Game End Detection** - Checkmate, stalemate, and draw detection

### Game Modes & Difficulty
- **Beginner** (Depth 2) - Perfect for learning
- **Easy** (Depth 5) - Casual play
- **Medium** (Depth 10) - Moderate challenge
- **Hard** (Depth 15) - Strong opponent
- **Expert** (Depth 20) - Maximum difficulty

### User Interface
- **Dark/Light Mode** - Toggle between themes with system preference detection
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Clean Material Design** - Modern, polished interface
- **Game Statistics** - Track wins, losses, draws, and win streaks
- **Move History** - View all moves in algebraic notation
- **Captured Pieces** - See captured pieces and material advantage

### Game Controls
- **New Game** - Start a fresh game
- **Undo Move** - Take back your last move (and AI response)
- **Resign** - Forfeit the current game
- **Flip Board** - Rotate the board 180 degrees
- **Download PGN** - Export game in standard PGN format
- **Copy FEN** - Copy current position to clipboard
- **Sound Toggle** - Enable/disable game sounds

### Additional Features
- **Sound Effects** - Audio feedback for moves, captures, check, and game end
- **Pawn Promotion** - Choose promotion piece (Queen, Rook, Bishop, Knight)
- **Drag & Drop** - Intuitive piece movement
- **Click-to-Move** - Alternative input method
- **AI Thinking Indicator** - Visual feedback when AI is calculating

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Chess Logic**: chess.js
- **Chess Board**: react-chessboard
- **AI Engine**: Stockfish.js (WebAssembly)
- **Icons**: react-icons (Feather icons)
- **State Management**: React Hooks

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chess-game-application
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
chess-game/
├── public/
│   └── stockfish/          # Stockfish.js engine files
├── src/
│   ├── components/
│   │   ├── Board/          # Chess board and promotion modal
│   │   ├── GameInfo/       # Game status, history, captured pieces
│   │   ├── Controls/       # Game setup and controls
│   │   ├── Layout/         # Header and theme toggle
│   │   └── UI/             # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── context/            # Theme context
│   ├── utils/              # Helper functions and constants
│   └── App.jsx             # Main application component
└── package.json
```

## Usage

### Starting a Game

1. Select your color (White, Black, or Random)
2. Choose AI difficulty level
3. Click "Start Game"

### Making Moves

- **Drag & Drop**: Click and drag a piece to move it
- **Click-to-Move**: Click a piece, then click the destination square
- Legal moves are highlighted with green dots

### Game Controls

- **Undo Move**: Takes back both your move and the AI's response
- **Resign**: Forfeit the game (counts as a loss)
- **Flip Board**: Changes board orientation
- **New Game**: Returns to setup screen

### Exporting Games

- **Download PGN**: Saves the game in standard PGN format
- **Copy FEN**: Copies the current position in FEN notation

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Performance

- Stockfish.js runs in a Web Worker to keep the UI responsive
- AI thinking time varies by difficulty (800ms - 1500ms delay added for natural feel)
- Smooth animations and transitions

## License

MIT

## Credits

- Chess engine: [Stockfish.js](https://github.com/nmrugg/stockfish.js)
- Chess logic: [chess.js](https://github.com/jhlywa/chess.js)
- Chess board: [react-chessboard](https://github.com/Clariity/react-chessboard)
