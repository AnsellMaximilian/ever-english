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
import { getComprehensionSession } from "@/services/quiz-session/comprehension";
import { ComprehensionExerciseSession } from "@/types/api";
import React, { useEffect, useState } from "react";
import SessionResult from "../SessionResult";
import { useRouter } from "next/navigation";
import type { SessionResult as ISessionRes } from "@/types/helpers";
import useExerciseSession from "@/hooks/useExerciseSession";
import useAuth from "@/hooks/useAuth";
import { updateXpAndLevel } from "@/services/levels/level";
import englishLevels from "@/constants/englishLevels";
import Loading from "@/app/(authenticated)/quiz-session/Loading";
import { getLvlByName } from "@/utils/level";
import { shuffleArray } from "@/utils/common";

export default function ComprehensionPage() {
  const [comprehensionSession, setComprehensionSession] =
    useState<ComprehensionExerciseSession | null>(null);

  const { currentAccount } = useAuth();

  const {
    currentExerciseIndex: currentTextIndex,
    setCurrentExerciseIndex: setCurrentTextIndex,
    isCurrentResultCorrect,
    setIsCurrentResultCorrect,
    sessionResult,
    setSessionResult,
  } = useExerciseSession();

  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (currentAccount) {
        const lvl = getLvlByName(currentAccount.userLevel.level, englishLevels);
        if (lvl) {
          const convoSession = await getComprehensionSession({
            concepts: shuffleArray(lvl.concepts).slice(0, 5),
            englishLevel: currentAccount.userLevel.level,
          });

          setComprehensionSession(convoSession);
        }
      }
    })();
  }, [currentAccount]);

  const moveToNextConvo = () => {
    setCurrentTextIndex((prev) => prev + 1);
    setIsCurrentResultCorrect(null);
  };

  const currentText = comprehensionSession?.texts[currentTextIndex];

  const isSessionFinished = !!(
    comprehensionSession &&
    currentTextIndex >= comprehensionSession.texts.length
  );
  return (
    <div className="grow mx-auto container p-8 flex flex-col">
      {currentText ? (
        <div className="">
          <div>
            <h1 className="text-4xl font-bold text-primary text-center">
              Comprehension Exercise
            </h1>
            <p className="text-center font-semibold text-xl">
              {comprehensionSession.concepts[currentTextIndex]}
            </p>
          </div>
          <div className="mt-8">
            <div className="text-center">{currentText.text}</div>
          </div>
          <div className="mt-8">
            <div className="">
              <div className="font-semibold text-2xl text-center">
                {currentText.question}
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {currentText.choices.map((choice, index) => {
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
                              text: currentText.concept,
                              isCorrect: choice.isCorrect,
                            },
                          ],
                        }));
                      }}
                      key={index}
                      className="p-4 border-border border-4 hover:border-primary block rounded-md"
                    >
                      {choice.answer}
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
