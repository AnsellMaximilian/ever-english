"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { getConversationSession } from "@/services/quiz-session/conversation";
import { ConversationExerciseSession } from "@/types/api";
import React, { useEffect, useState } from "react";
import SessionResult from "../SessionResult";
import { useRouter } from "next/navigation";
import useExerciseSession from "@/hooks/useExerciseSession";

export default function ConversationPage() {
  const [conversationSession, setConversationSession] =
    useState<ConversationExerciseSession | null>(null);

  const [conversationProgress, setConversationProgress] = useState(0);

  const {
    currentExerciseIndex: currentConversationIndex,
    setCurrentExerciseIndex: setCurrentConversationIndex,
    isCurrentResultCorrect,
    setIsCurrentResultCorrect,
    sessionResult,
    setSessionResult,
  } = useExerciseSession();

  const router = useRouter();

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

  const moveToNextConvo = () => {
    setCurrentConversationIndex((prev) => prev + 1);
    setIsCurrentResultCorrect(null);
    setConversationProgress(0);
  };

  const currentConvo =
    conversationSession?.conversations[currentConversationIndex];

  const isAtEndOfConvo =
    currentConvo && conversationProgress + 1 >= currentConvo.dialog.length;

  const isSessionFinished = !!(
    conversationSession &&
    currentConversationIndex >= conversationSession.conversations.length
  );
  return (
    <div className="grow mx-auto container p-8">
      {currentConvo && (
        <div className="">
          <div>
            <h1 className="text-4xl font-bold text-primary text-center">
              Conversation Exercise
            </h1>
            <p className="text-center font-semibold text-xl">
              {conversationSession.concepts[currentConversationIndex]}
            </p>
          </div>
          <div className="mt-8">
            <div className="flex flex-col gap-4">
              {currentConvo.dialog
                .slice(0, conversationProgress + 1)
                .map((convo, index) => {
                  return (
                    <div
                      key={index}
                      className={cn(
                        "flex",
                        index % 2 === 0 ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "p-4 text-primary-foreground rounded-md min-w-[400px] max-w-full",
                          index % 2 === 0
                            ? "bg-primary ml-8"
                            : "bg-secondPrimary mr-8"
                        )}
                      >
                        <div className="font-semibold">{convo.name}</div>
                        <p>{convo.content || "________________________"}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="mt-8">
            {isAtEndOfConvo ? (
              <div className="">
                <div className="font-semibold text-2xl text-center">
                  What should the next line be?
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {currentConvo.choices.map((choice, index) => {
                    return (
                      <button
                        onClick={() => {
                          setIsCurrentResultCorrect(choice.isCorrect);
                          setSessionResult((prev) => ({
                            totalCorrect: choice.isCorrect
                              ? prev.totalCorrect + 1
                              : prev.totalCorrect,
                            resultDetails: [
                              ...prev.resultDetails,
                              {
                                text: currentConvo.concept,
                                isCorrect: choice.isCorrect,
                              },
                            ],
                          }));
                        }}
                        key={index}
                        className="p-4 border-border border-4 hover:border-primary block rounded-md"
                      >
                        {choice.content}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <button
                  className="p-4 border-border border-4 hover:border-primary block rounded-md bg-accent"
                  onClick={() => {
                    setConversationProgress((prev) => prev + 1);
                  }}
                >
                  Continue...
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <Dialog
        open={isCurrentResultCorrect !== null}
        onOpenChange={(open) => {
          if (!open) {
            moveToNextConvo();
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              {isCurrentResultCorrect ? "Correct!" : "Sorry"}
            </DialogTitle>
            <DialogDescription className="text-center">
              {isCurrentResultCorrect
                ? "Congrats, you got it right!"
                : "Better luck next time!"}
            </DialogDescription>
          </DialogHeader>
          <div></div>
          <DialogFooter>
            <Button type="button" onClick={moveToNextConvo}>
              Next Convo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <SessionResult
        open={isSessionFinished}
        sessionResult={sessionResult}
        onOpenChange={(status) => {
          if (!status) {
            router.push("/dashboard");
          }
        }}
      />
    </div>
  );
}
