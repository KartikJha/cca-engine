import { Chess } from "chess.js";

export function blunderCheck(chess: Chess, move: string): boolean {
  const clone = new Chess(chess.fen());
  clone.move(move);

  const replies = clone.moves({ verbose: true });
  return !replies.some(m => m.san.includes("#"));
}

