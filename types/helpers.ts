export interface SessionResult {
  totalCorrect: number;
  resultDetails: {
    text: string;
    isCorrect: boolean;
  }[];
}
