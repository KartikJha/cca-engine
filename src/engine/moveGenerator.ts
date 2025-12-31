import { Chess } from "chess.js";
import { CandidateMove } from "../../types";
import { opponentCCA } from "../cca/opponentCCA";
import { myCCA } from "../cca/myCCA";
import { improveStructure } from "../structure/improveStructure";

export function generateCandidateMoves(chess: Chess): CandidateMove[] {
  const opp = opponentCCA(chess);
  if (opp.length > 0) return opp;

  const mine = myCCA(chess);
  if (mine.length > 0) return mine;

  return improveStructure(chess);
}

