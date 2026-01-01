# CCA Engine (Human Thought Trainer)

> Human-style chess analysis engine based on CCA++ (Checks, Captures, Attacks).

⚠️ **Status: Work In Progress**
*The human thought trainer engine is still in active development. Contributions are highly expected and appreciated!*

## Installation

```bash
npm install cca-engine
```

## Usage

### CLI

You can run the engine directly from the command line:

```bash
# Start REPL mode
npx cca-engine

# Analyze a specific FEN
npx cca-engine --fen "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1"

# Analyze a PGN
npx cca-engine --pgn "1. e4 e5 2. Nf3 Nc6"
```

#### REPL Commands
- `e4`, `Nf3`, ... : Make a move
- `:pgn "<pgn>"` : Load a PGN game
- `:fen "<fen>"` : Load a FEN position
- `:reset` : Reset the board
- `:exit` : Exit the REPL

### Library

You can also use the engine in your own TypeScript/JavaScript projects:

```typescript
import { analyzeMoves } from "cca-engine";

// Example usage
const pgn = "1. e4 e5 2. Nf3 Nc6";
const analysis = analyzeMoves(pgn);

console.log(analysis);
```

## Features

- **CCA++ Analysis**:prioritizes checks, captures, and attacks to simulate human thought processes.
- **Blunder Detection**: Identifies and explains rejected moves.
- **Candidate Moves**: Suggests multiple candidate moves with reasoning.

## Contributing

This project is open for contributions! Whether it's bug fixes, new features, or documentation improvements, feel free to open a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
