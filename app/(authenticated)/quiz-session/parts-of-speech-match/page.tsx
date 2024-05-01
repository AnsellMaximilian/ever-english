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
import useExerciseSession from "@/hooks/useExerciseSession";
import useAuth from "@/hooks/useAuth";
import { updateXpAndLevel } from "@/services/levels/level";
import englishLevels from "@/constants/englishLevels";
import Loading from "@/app/(authenticated)/quiz-session/Loading";
import { getLvlByName } from "@/utils/level";

interface StringSelection {
  hasBeenSelected: boolean;
  isCorrect: boolean;
  text: string;
  match: string;
}

export default function PartsOfSpeechMatchPage() {
  const [conversationSession, setConversationSession] =
    useState<PartsOfSpeechMatchExerciseSession | null>(null);

  const { currentAccount } = useAuth();

  const {
    currentExerciseIndex: currentMatchSetIndex,
    setCurrentExerciseIndex: setCurrentMatchSetIndex,
    isCurrentResultCorrect,
    setIsCurrentResultCorrect,
    sessionResult,
    setSessionResult,
  } = useExerciseSession();

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
      if (currentAccount) {
        const lvl = getLvlByName(currentAccount.userLevel.level, englishLevels);

        if (lvl) {
          const partsSession = await getPartsOfSpeechMatchSession({
            concepts: shuffleArray(lvl.concepts).slice(0, 5),
            englishLevel: currentAccount.userLevel.level,
          });
          setConversationSession(partsSession);
        }
      }
    })();
  }, [currentAccount]);

  const moveToNextMatchSet = () => {
    setCurrentMatchSetIndex((prev) => prev + 1);
    setIsCurrentResultCorrect(null);
    setCurrentPartIndex(-1);
    setCurrentWordIndex(-1);
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

  const checkWin = (
    currentWords: StringSelection[],
    currentMatchSet: PartsOfSpeechMatchExerciseSession["matchSets"][number]
  ) => {
    if (
      currentWords.length > 0 &&
      currentWords.filter((w) => w.isCorrect).length === currentWords.length &&
      currentMatchSet
    ) {
      setIsCurrentResultCorrect(true);
      setSessionResult((prev) => ({
        resultDetails: [
          ...prev.resultDetails,
          {
            text: currentMatchSet.concept,
            isCorrect: true,
          },
        ],
        totalCorrect: prev.totalCorrect + 1,
      }));
    }
  };

  return (
    <div className="grow mx-auto container p-8 flex flex-col">
      {currentMatchSet ? (
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
            <div className="mb-4 text-center text-2xl">
              Match the words with the correct part of speech
            </div>
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
                      onClick={() => {
                        setCurrentWordIndex(index);
                        // if a part has already been selected, check if correct word
                        if (currentPartIndex !== -1) {
                          const part = currentPartsOfSpeech[currentPartIndex];
                          const isCorrect = word.match === part.text;
                          if (!isCorrect) {
                            setIsCurrentResultCorrect(false);
                            setSessionResult((prev) => ({
                              ...prev,
                              resultDetails: [
                                ...prev.resultDetails,
                                {
                                  text: currentMatchSet.concept,
                                  isCorrect: false,
                                },
                              ],
                            }));
                          } else {
                            const newWords = currentWords.map((p, i) =>
                              i === index ? { ...p, isCorrect: true } : p
                            );

                            setCurrentWords(newWords);

                            checkWin(newWords, currentMatchSet);

                            setCurrentPartsOfSpeech((prev) =>
                              prev.map((p, i) =>
                                i === currentPartIndex
                                  ? { ...p, isCorrect: true }
                                  : p
                              )
                            );
                          }
                          setCurrentWordIndex(-1);
                          setCurrentPartIndex(-1);
                        }
                      }}
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

                          if (!isCorrect) {
                            setIsCurrentResultCorrect(false);
                            setSessionResult((prev) => ({
                              ...prev,
                              resultDetails: [
                                ...prev.resultDetails,
                                {
                                  text: currentMatchSet.concept,
                                  isCorrect: false,
                                },
                              ],
                            }));
                          } else {
                            setCurrentPartsOfSpeech((prev) =>
                              prev.map((p, i) =>
                                i === index ? { ...p, isCorrect: true } : p
                              )
                            );

                            const newWords = currentWords.map((p, i) =>
                              i === currentWordIndex
                                ? { ...p, isCorrect: true }
                                : p
                            );
                            setCurrentWords(newWords);

                            checkWin(newWords, currentMatchSet);
                          }
                          setCurrentWordIndex(-1);
                          setCurrentPartIndex(-1);
                        }
                      }}
                    />
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
        open={
          isCurrentResultCorrect === false ||
          (currentWords.filter((w) => w.isCorrect).length ===
            currentWords.length &&
            currentWords.length > 0)
        }
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
