import { Chess } from "chess.js";
import { CandidateMove } from "../../types";

export function improveStructure(chess: Chess): CandidateMove[] {
  return chess.moves().slice(0, 3).map(m => ({
    move: m,
    reason: "STRUCTURE",
    safe: true,
    note: "General improvement"
  }));
}

