"use client";

import { getConversationSession } from "@/services/quiz-session/conversation";
import { ConversationExerciseSession } from "@/types/api";
import React, { useEffect, useState } from "react";

export default function ConversationPage() {
  const [conversationSession, setConversationSession] =
    useState<ConversationExerciseSession | null>(null);

  useEffect(() => {
    (async () => {
      const convoSession = await getConversationSession({
        concepts: [
          "Understanding complex and specialized texts in professional and academic domains",
          "Analyzing and critiquing arguments and theories in written texts",
          "Negotiating and mediating in professional and academic contexts",
        ],
        englishLevel: "C1",
      });

      setConversationSession(convoSession);
    })();
  }, []);

  console.log(conversationSession);
  return (
    <div className="grow mx-auto container p-8">
      {conversationSession && (
        <div className="">
          <div>
            <h1 className="text-4xl font-bold text-primary text-center">
              Conversation Exercise
            </h1>
            <p className="text-center font-semibold text-xl">
              {conversationSession.concepts[0]}
            </p>
          </div>
          <div>test</div>
        </div>
      )}
    </div>
  );
}
