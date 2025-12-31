export type Reason =
  | "OPPONENT_CCA"
  | "MY_CCA"
  | "STRUCTURE";

export interface CandidateMove {
  move: string;
  reason: Reason;
  safe: boolean;
  note?: string;
}

export interface AnalysisResult {
  bestMove: string | null;
  candidates: CandidateMove[];
  rejected: CandidateMove[];
}

