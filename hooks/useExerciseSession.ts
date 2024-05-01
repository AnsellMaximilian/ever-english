import { useState } from "react";
import type { SessionResult } from "@/types/helpers";

export default function useExerciseSession() {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  const [isCurrentResultCorrect, setIsCurrentResultCorrect] = useState<
    null | boolean
  >(null);

  const [sessionResult, setSessionResult] = useState<SessionResult>({
    totalCorrect: 0,
    resultDetails: [],
  });

  return {
    currentExerciseIndex,
    setCurrentExerciseIndex,
    isCurrentResultCorrect,
    setIsCurrentResultCorrect,
    sessionResult,
    setSessionResult,
  };
}
