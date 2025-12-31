import { Chess } from "chess.js";
import { CandidateMove } from "../../types";

export function opponentCCA(chess: Chess): CandidateMove[] {
  const threats: CandidateMove[] = [];

  chess.moves({ verbose: true }).forEach(move => {
    if (move.flags.includes("c") || move.san.includes("+")) {
      threats.push({
        move: move.san,
        reason: "OPPONENT_CCA",
        safe: true,
        note: "Responding to opponent forcing line"
      });
    }
  });

  return threats.slice(0, 3);
}

