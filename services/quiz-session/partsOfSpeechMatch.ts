import {
  PartsOfSpeechMatchExerciseSession,
  QuizSessionRequestBody,
} from "@/types/api";
import axios from "axios";

import exampleJson from "@/constants/json/examplePartsOfSpeechMatch.json";

export async function getPartsOfSpeechMatchSession(
  sessionReq: QuizSessionRequestBody
): Promise<PartsOfSpeechMatchExerciseSession> {
  // return (await axios.post("/api/quiz-session", sessionReq)).data;
  return Promise.resolve(exampleJson);
}
