"use client";

import { ConversationExerciseSession } from "@/types/api";
import React, { useState } from "react";

export default function ConversationPage() {
  const [conversationSession, setConversationSession] =
    useState<ConversationExerciseSession | null>(null);
  return <div>page</div>;
}
