import {
  ConversationExerciseSession,
  QuizSessionRequestBody,
} from "@/types/api";
import axios from "axios";

import exampleJson from "@/constants/json/exampleConverastion.json";

export async function getConversationSession(
  sessionReq: QuizSessionRequestBody
): Promise<ConversationExerciseSession> {
  try {
    return (await axios.post("/api/quiz-session/conversation", sessionReq))
      .data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
  return Promise.resolve(exampleJson);
}
