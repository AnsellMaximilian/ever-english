import {
  ArrangeSentenceExerciseSession,
  QuizSessionRequestBody,
} from "@/types/api";
import axios from "axios";

import exampleJson from "@/constants/json/exampleArrangeSentence.json";
import requestGemini from "@/utils/requestGemini";

export async function getArrangeSentenceSession(
  sessionReq: QuizSessionRequestBody
): Promise<ArrangeSentenceExerciseSession> {
  // return (await axios.post("/api/quiz-session/arrange-sentence", sessionReq))
  //   .data;
  // return Promise.resolve(exampleJson);

  const parts = [
    {
      text: 'Generate JSON for a set of scrambled sentences to assemble. The difficulty of the sentences should be constrained to the English level. The number of texts should match the amount of concepts given (separated by semicolons).\nThe parent JSON object should have the following fields:\n- exerciseType: set to "ARRANGE SENTENCE"\n- level: the English level (eg. A1, C1, etc.)\n- concepts: an array of the given concepts. This will relate to the amount of text items items in the texts array. 5 concepts items means 5 text items.\n- sentences: an array of texts or text items. Each element will represent a scrambled sentences. \n\nThe JSON for each text (each element) should have the following fields:\n1. concept: the corresponding concept for each text\n2. sentence:  a complete sentence. It should be unscrambled the words should be in the original order. (string)',
    },
    { text: "level: A1" },
    {
      text: "concepts: Greetings and introductions; Basic vocabulary for everyday objects (e.g., food, clothing, household items); Numbers and counting; Days of the week, months, and telling time; Asking and answering simple questions",
    },
    {
      text: 'json: {  "exerciseType": "ARRANGE SENTENCE",  "level": "A1",  "concepts": [    "Greetings and introductions",    "Basic vocabulary for everyday objects (e.g., food, clothing, household items)",    "Numbers and counting",    "Days of the week, months, and telling time",    "Asking and answering simple questions"  ],  "sentences": [    {      "concept": "Greetings and introductions",      "sentence": "Hello! My name is Sarah."    },    {      "concept": "Basic vocabulary for everyday objects (e.g., food, clothing, household items)",      "sentence": "I eat an apple every day."    },    {      "concept": "Numbers and counting",      "sentence": "There are ten fingers on my hands."    },    {      "concept": "Days of the week, months, and telling time",      "sentence": "Today is Monday. It\'s seven o\'clock."    },    {      "concept": "Asking and answering simple questions",      "sentence": "What is your name? My name is John."    }  ]}',
    },
    { text: `level: ${sessionReq.englishLevel}` },
    {
      text: `concepts: ${sessionReq.concepts.slice(0, 5).join("; ")}`,
    },
    { text: "json: " },
  ];

  return JSON.parse(await requestGemini(parts));
}
