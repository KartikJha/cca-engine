#!/usr/bin/env node

import * as readline from "readline";
import { Chess } from "chess.js";
import { analyzePGN, analyzeMoves } from "./api";
import { analyzePosition } from "./engine/analyzer";

/* =========================
   PUBLIC LIBRARY EXPORTS
   ========================= */

export { analyzePGN, analyzeMoves };

/* =========================
   CLI ARG PARSER
   ========================= */

function parseArgs(): Record<string, string | boolean> {
  const args = process.argv.slice(2);
  const result: Record<string, string | boolean> = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      const key = args[i].replace(/^--/, "");
      const value =
        args[i + 1] && !args[i + 1].startsWith("--")
          ? args[++i]
          : true;
      result[key] = value;
    }
  }
  return result;
}

/* =========================
   OUTPUT
   ========================= */

function printResult(result: ReturnType<typeof analyzePosition>): void {
  console.log("\n=== CCA++ ANALYSIS ===\n");

  if (!result.bestMove) {
    console.log("No safe move found.");
    return;
  }

  console.log(`Best Move: ${result.bestMove}\n`);

  console.log("Candidate Moves:");
  result.candidates.forEach(c => {
    console.log(
      `  - ${c.move} [${c.reason}]${c.note ? " → " + c.note : ""}`
    );
  });

  if (result.rejected.length > 0) {
    console.log("\nRejected (Blunders):");
    result.rejected.forEach(r => {
      console.log(`  - ${r.move}`);
    });
  }
}

/* =========================
   REPL MODE
   ========================= */

function startRepl(chess: Chess): void {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "cca> "
  });

  console.log("CCA++ Engine REPL");
  console.log(
    'Commands:\n' +
    '  move        e4, Nf3, Qxd5\n' +
    '  :pgn "<pgn>"\n' +
    '  :fen "<fen>"\n' +
    '  :reset\n' +
    '  :exit\n'
  );

  rl.prompt();

  rl.on("line", (line: string) => {
    const input = line.trim();

    if (!input) {
      rl.prompt();
      return;
    }

    /* ---- Commands ---- */

    if (input === ":exit") {
      rl.close();
      return;
    }

    if (input === ":reset") {
      chess.reset();
      console.log("Game reset.");
      printResult(analyzePosition(chess));
      rl.prompt();
      return;
    }

    if (input.startsWith(":pgn ")) {
      const pgn = input.slice(5).replace(/^"|"$/g, "");
      chess.reset();
      chess.loadPgn(pgn);
      printResult(analyzePosition(chess));
      rl.prompt();
      return;
    }

    if (input.startsWith(":fen ")) {
      const fen = input.slice(5);
      chess.load(fen);
      printResult(analyzePosition(chess));
      rl.prompt();
      return;
    }

    /* ---- Assume move ---- */

    let move = chess.move(input);

    // fallback for loose notation (still type-safe)
    if (!move) {
      move = chess.move(input, { strict: false });
    }

    if (!move) {
      console.log("Invalid move.");
    } else {
      printResult(analyzePosition(chess));
    }

    rl.prompt();
  });

  rl.on("close", () => {
    console.log("\nGoodbye.");
    process.exit(0);
  });
}

/* =========================
   ENTRY POINT
   ========================= */

function runCLI(): void {
  const args = parseArgs();
  const chess = new Chess();

  /* ---- One-shot modes ---- */

  if (typeof args.pgn === "string") {
    chess.loadPgn(args.pgn);
    printResult(analyzePosition(chess));
    return;
  }

  if (typeof args.fen === "string") {
    chess.load(args.fen);
    printResult(analyzePosition(chess));
    return;
  }

  /* ---- Default: REPL ---- */

  startRepl(chess);
}

if (require.main === module) {
  runCLI();
}

