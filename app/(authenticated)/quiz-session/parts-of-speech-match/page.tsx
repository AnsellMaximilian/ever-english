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
import { getPartsOfSpeechMatchSession } from "@/services/quiz-session/partsOfSpeechMatch";
import { PartsOfSpeechMatchExerciseSession } from "@/types/api";
import React, { useEffect, useState } from "react";
import SessionResult from "../SessionResult";
import { useRouter } from "next/navigation";
import type { SessionResult as ISessionRes } from "@/types/helpers";
import { shuffleArray } from "@/utils/common";
import MatchButton from "./MatchButton";

interface StringSelection {
  hasBeenSelected: boolean;
  isCorrect: boolean;
  text: string;
  match: string;
}

export default function PartsOfSpeechMatchPage() {
  const [conversationSession, setConversationSession] =
    useState<PartsOfSpeechMatchExerciseSession | null>(null);

  const [currentMatchSetIndex, setCurrentMatchSetIndex] = useState(0);

  const [isCurrentResultCorrect, setIsCurrentResultCorrect] = useState<
    null | boolean
  >(null);

  const [sessionResult, setSessionResult] = useState<ISessionRes>({
    totalCorrect: 0,
    resultDetails: [],
  });

  const [currentPartsOfSpeech, setCurrentPartsOfSpeech] = useState<
    StringSelection[]
  >([]);
  const [currentWords, setCurrentWords] = useState<StringSelection[]>([]);

  // matching
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [currentPartIndex, setCurrentPartIndex] = useState(-1);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const partsSession = await getPartsOfSpeechMatchSession({
        concepts: [
          "Understanding complex and specialized texts in professional and academic domains",
          "Analyzing and critiquing arguments and theories in written texts",
          "Negotiating and mediating in professional and academic contexts",
        ],
        englishLevel: "C1",
      });

      setConversationSession(partsSession);
    })();
  }, []);

  const moveToNextMatchSet = () => {
    setCurrentMatchSetIndex((prev) => prev + 1);
    setIsCurrentResultCorrect(null);
  };

  const currentMatchSet = conversationSession?.matchSets[currentMatchSetIndex];

  const isSessionFinished = !!(
    conversationSession &&
    currentMatchSetIndex >= conversationSession.matchSets.length
  );

  useEffect(() => {
    if (currentMatchSet) {
      const currentPartsOfSpeech: StringSelection[] = currentMatchSet
        ? shuffleArray(
            currentMatchSet.pairs.map((p) => ({
              text: p.partOfSpeech,
              match: p.word,
              isCorrect: false,
              hasBeenSelected: false,
            }))
          )
        : [];
      const currentWords: StringSelection[] = currentMatchSet
        ? shuffleArray(
            currentMatchSet.pairs.map((p) => ({
              text: p.word,
              match: p.partOfSpeech,
              isCorrect: false,
              hasBeenSelected: false,
            }))
          )
        : [];

      setCurrentPartsOfSpeech(currentPartsOfSpeech);
      setCurrentWords(currentWords);
    }
  }, [currentMatchSet]);

  useEffect(() => {
    if (currentWordIndex != -1) {
    }
  }, [currentPartIndex, currentWordIndex]);
  return (
    <div className="grow mx-auto container p-8">
      {currentMatchSet && (
        <div className="">
          <div>
            <h1 className="text-4xl font-bold text-primary text-center">
              Parts of Speech Exercise
            </h1>
            <p className="text-center font-semibold text-xl">
              {conversationSession.concepts[currentMatchSetIndex]}
            </p>
          </div>
          <div className="mt-8">
            <div className="grid grid-cols-2 gap-4 max-w-[750px] mx-auto">
              <div className="flex flex-col gap-4">
                {currentWords.map((word, index) => {
                  return (
                    <MatchButton
                      key={index}
                      text={word.text}
                      isSelected={
                        currentWordIndex === index || word.hasBeenSelected
                      }
                      isCorrect={word.isCorrect}
                      onClick={() => setCurrentWordIndex(index)}
                    />
                  );
                })}
              </div>
              <div className="flex flex-col gap-4">
                {currentPartsOfSpeech.map((part, index) => {
                  return (
                    <MatchButton
                      key={index}
                      text={part.text}
                      isSelected={
                        currentPartIndex === index || part.hasBeenSelected
                      }
                      isCorrect={part.isCorrect}
                      onClick={() => {
                        setCurrentPartIndex(index);

                        // if a word has already been selected, check if correct part
                        if (currentWordIndex !== -1) {
                          const word = currentWords[currentWordIndex];
                          const isCorrect = word.match === part.text;
                          if (isCorrect) {
                            setIsCurrentResultCorrect(true);
                            setSessionResult((prev) => ({
                              resultDetails: [
                                ...prev.resultDetails,
                                {
                                  text: currentMatchSet.concept,
                                  isCorrect,
                                },
                              ],
                              totalCorrect: isCorrect
                                ? prev.totalCorrect + 1
                                : prev.totalCorrect,
                            }));
                          } else {
                            setIsCurrentResultCorrect(false);
                          }
                        }
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      <Dialog
        open={isCurrentResultCorrect !== null}
        onOpenChange={(open) => {
          if (!open) {
            moveToNextMatchSet();
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
            <Button type="button" onClick={moveToNextMatchSet}>
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
