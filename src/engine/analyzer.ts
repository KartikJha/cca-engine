import { Chess } from "chess.js";
import { generateCandidateMoves } from "./moveGenerator";
import { blunderCheck } from "./blunderCheck";
import { AnalysisResult, CandidateMove } from "../../types";

export function analyzePosition(chess: Chess): AnalysisResult {
  const candidates = generateCandidateMoves(chess);
  const accepted: CandidateMove[] = [];
  const rejected: CandidateMove[] = [];

  for (const c of candidates) {
    const safe = blunderCheck(chess, c.move);
    const entry = { ...c, safe };

    safe ? accepted.push(entry) : rejected.push(entry);
  }

  return {
    bestMove: accepted[0]?.move ?? null,
    candidates: accepted,
    rejected
  };
}

