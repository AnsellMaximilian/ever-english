"use client";
import exerciseTypes from "@/constants/exerciseTypes";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import ExerciseTypeWheel from "./ExerciseTypeWheel";
import useExerciseWheel from "@/hooks/useExerciseWheel";
import { getConversationSession } from "@/services/quiz-session/conversation";

export default function QuizzSessionPage() {
  // Wheel selection and animation
  const { currentDisplayedSelectedIndex, selectedTypeIndex } =
    useExerciseWheel(exerciseTypes);

  const [isSessionMode, setIsSessionMode] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (selectedTypeIndex !== null) {
      timeoutId = setTimeout(() => setIsSessionMode(true), 5000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [selectedTypeIndex]);
  return (
    <div className="grow flex items-center justify-center">
      {isSessionMode ? (
        <div>Session</div>
      ) : (
        <div>
          <div className="flex justify-center mt-16">
            <ExerciseTypeWheel
              types={exerciseTypes}
              currentDisplayedSelectedIndex={currentDisplayedSelectedIndex}
              selectedTypeIndex={selectedTypeIndex}
            />
          </div>
          <h1 className="text-center font-bold text-3xl mt-8">
            {selectedTypeIndex === null
              ? "Selecting Exercise Type"
              : `${exerciseTypes[selectedTypeIndex].name} Selected`}
          </h1>
          {selectedTypeIndex !== null && (
            <p className="font-semibold text-xl text-center">
              {exerciseTypes[selectedTypeIndex].description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
