import {
  ConversationExerciseSession,
  QuizSessionRequestBody,
} from "@/types/api";
import axios from "axios";

export async function getConversationSession(
  sessionReq: QuizSessionRequestBody
): Promise<ConversationExerciseSession> {
  return (await axios.post("/api/quiz-session", sessionReq)).data;
}
