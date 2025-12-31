import { Chess } from "chess.js";
import { analyzePosition } from "./engine/analyzer";
import { AnalysisResult } from "../types";

export function analyzePGN(pgn: string): AnalysisResult {
  const chess = new Chess();
  chess.loadPgn(pgn);
  return analyzePosition(chess);
}

export function analyzeMoves(moves: string[]): AnalysisResult {
  const chess = new Chess();
  moves.forEach(m => chess.move(m));
  return analyzePosition(chess);
}

