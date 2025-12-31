import { Chess } from "chess.js";
import { CandidateMove } from "../../types";

export function myCCA(chess: Chess): CandidateMove[] {
  const moves: CandidateMove[] = [];

  chess.moves({ verbose: true }).forEach(move => {
    if (move.san.includes("+") || move.flags.includes("c")) {
      moves.push({
        move: move.san,
        reason: "MY_CCA",
        safe: true,
        note: "Forcing move"
      });
    }
  });

  return moves.slice(0, 5);
}

