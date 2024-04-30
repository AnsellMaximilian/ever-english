import {
  ComprehensionExerciseSession,
  ConversationExerciseSession,
  QuizSessionRequestBody,
} from "@/types/api";
import axios from "axios";

import exampleJson from "@/constants/json/exampleComprehension.json";

export async function getComprehensionSession(
  sessionReq: QuizSessionRequestBody
): Promise<ComprehensionExerciseSession> {
  // return (await axios.post("/api/quiz-session", sessionReq)).data;
  return Promise.resolve(exampleJson);
}
