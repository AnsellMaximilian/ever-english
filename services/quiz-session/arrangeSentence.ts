import {
  ArrangeSentenceExerciseSession,
  QuizSessionRequestBody,
} from "@/types/api";
import axios from "axios";

import exampleJson from "@/constants/json/exampleArrangeSentence.json";

export async function getArrangeSentenceSession(
  sessionReq: QuizSessionRequestBody
): Promise<ArrangeSentenceExerciseSession> {
  return (await axios.post("/api/quiz-session/arrange-sentence", sessionReq))
    .data;
  // return Promise.resolve(exampleJson);
}
