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
import { ArrangeSentenceExerciseSession } from "@/types/api";
import React, { useEffect, useState } from "react";
import SessionResult from "../SessionResult";
import { useRouter } from "next/navigation";
import type { SessionResult as ISessionRes } from "@/types/helpers";
import { getArrangeSentenceSession } from "@/services/quiz-session/arrangeSentence";
import { shuffleArray } from "@/utils/common";
import useExerciseSession from "@/hooks/useExerciseSession";
import useAuth from "@/hooks/useAuth";
import { updateXpAndLevel } from "@/services/levels/level";
import englishLevels from "@/constants/englishLevels";
import Loading from "@/app/(authenticated)/quiz-session/Loading";
import { getLvlByName } from "@/utils/level";
import useProtectedPage from "@/hooks/useProtectedPage";

export default function ArrangeSentencePage() {
  useProtectedPage();

  const [conversationSession, setConversationSession] =
    useState<ArrangeSentenceExerciseSession | null>(null);

  const { currentAccount } = useAuth();

  const {
    currentExerciseIndex: currentSentenceIndex,
    setCurrentExerciseIndex: setCurrentSentenceIndex,
    isCurrentResultCorrect,
    setIsCurrentResultCorrect,
    sessionResult,
    setSessionResult,
  } = useExerciseSession();

  const [shuffledSentence, setShuffledSentence] = useState<string[]>([]);

  const [formedSentence, setFormedSentence] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (currentAccount) {
        const lvl = getLvlByName(currentAccount.userLevel.level, englishLevels);
        if (lvl) {
          const arrangeSession = await getArrangeSentenceSession({
            concepts: shuffleArray(lvl.concepts).slice(0, 5),
            englishLevel: currentAccount.userLevel.level,
          });

          setConversationSession(arrangeSession);
        }
      }
    })();
  }, [currentAccount]);

  const moveToNextSentence = () => {
    setCurrentSentenceIndex((prev) => prev + 1);
    setIsCurrentResultCorrect(null);
    setFormedSentence([]);
  };

  const currentSentence = conversationSession?.sentences[currentSentenceIndex];

  const isSessionFinished = !!(
    conversationSession &&
    currentSentenceIndex >= conversationSession.sentences.length
  );

  useEffect(() => {
    if (currentSentence) {
      setShuffledSentence(shuffleArray(currentSentence.sentence.split(" ")));
    }
  }, [currentSentence]);

  useEffect(() => {
    if (
      currentSentence &&
      shuffledSentence.length === 0 &&
      currentSentence.sentence.split(" ").length === formedSentence.length
    ) {
      const isCorrect = currentSentence.sentence === formedSentence.join(" ");
      setIsCurrentResultCorrect(isCorrect);
      setSessionResult((prev) => ({
        totalCorrect: isCorrect ? prev.totalCorrect + 1 : prev.totalCorrect,
        resultDetails: [
          ...prev.resultDetails,
          {
            text: currentSentence.concept,
            isCorrect: isCorrect,
          },
        ],
      }));
    }
  }, [
    formedSentence,
    shuffledSentence,
    currentSentence,
    setSessionResult,
    setIsCurrentResultCorrect,
  ]);
  return (
    <div className="grow mx-auto container p-8 flex flex-col">
      {currentSentence ? (
        <div className="">
          <div>
            <h1 className="text-4xl font-bold text-primary text-center">
              Sentence Arrangement Exercise
            </h1>
            <p className="text-center font-semibold text-xl">
              {conversationSession.concepts[currentSentenceIndex]}
            </p>
          </div>
          <div className="mt-8">
            {formedSentence.length > 0 ? (
              <div className="flex flex-wrap gap-4 justify-center">
                {formedSentence.map((word, index) => {
                  return (
                    <button
                      onClick={() => {
                        setShuffledSentence((prev) => [...prev, word]);
                        setFormedSentence((prev) =>
                          prev.filter((w, i) => i !== index)
                        );
                      }}
                      key={index}
                      className="px-4 py-2 border-border border-4 hover:bg-accent block rounded-md"
                    >
                      {word}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="h-[48px]"></div>
            )}
            <div className="h-2 bg-primary w-full mt-2 mx-auto max-w-[500px]"></div>
          </div>
          <div className="mt-8">
            <div className="">
              <div className="font-semibold text-2xl text-center mb-4">
                Arrange the sentence correctly.
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                {shuffledSentence.map((word, index) => {
                  return (
                    <button
                      onClick={() => {
                        setFormedSentence((prev) => [...prev, word]);
                        setShuffledSentence((prev) =>
                          prev.filter((w, i) => i !== index)
                        );
                      }}
                      key={index}
                      className="px-4 py-2 border-border border-4 hover:bg-accent block rounded-md"
                    >
                      {word}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grow flex justify-center items-center">
          <Loading />
        </div>
      )}
      <Dialog
        open={isCurrentResultCorrect !== null}
        onOpenChange={(open) => {
          if (!open) {
            moveToNextSentence();
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
            <Button type="button" onClick={moveToNextSentence}>
              Next
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <SessionResult
        open={isSessionFinished}
        sessionResult={sessionResult}
        onOpenChange={async (status) => {
          if (!status) {
            if (currentAccount) {
              await updateXpAndLevel(
                sessionResult,
                currentAccount.$id,
                englishLevels
              );
            }
            router.push(
              `/dashboard?prevLvl=${currentAccount?.userLevel.level}`
            );
          }
        }}
      />
    </div>
  );
}
