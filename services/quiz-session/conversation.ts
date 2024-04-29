import {
  ConversationExerciseSession,
  QuizSessionRequestBody,
} from "@/types/api";
import axios from "axios";

import exampleJson from "@/constants/json/exampleConverastion.json";

export async function getConversationSession(
  sessionReq: QuizSessionRequestBody
): Promise<ConversationExerciseSession> {
  // return (await axios.post("/api/quiz-session", sessionReq)).data;
  return Promise.resolve(exampleJson);
}
