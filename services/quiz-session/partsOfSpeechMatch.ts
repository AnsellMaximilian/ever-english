import {
  PartsOfSpeechMatchExerciseSession,
  QuizSessionRequestBody,
} from "@/types/api";
import axios from "axios";

import exampleJson from "@/constants/json/examplePartsOfSpeechMatch.json";
import requestGemini from "@/utils/requestGemini";

export async function getPartsOfSpeechMatchSession(
  sessionReq: QuizSessionRequestBody
): Promise<PartsOfSpeechMatchExerciseSession> {
  // return (
  //   await axios.post("/api/quiz-session/parts-of-speech-match", sessionReq)
  // ).data;
  // return Promise.resolve(exampleJson);

  const parts = [
    {
      text: 'Generate JSON for matching words with the appropriate parts of speech (adjective, verb, etc.). The difficulty of the words should be constrained to the English level. The number of sets of words should match the amount of concepts given (separated by semicolons).\nThe parent JSON object should have the following fields:\n- exerciseType: set to "PARTS OF SPEECH MATCH"\n- level: the English level (eg. A1, C1, etc.)\n- concepts: an array of the given concepts. This will relate to the amount of match sets items in the matchSets array. 5 concepts items means 5 match sets.\n- matchSets: an array of match sets. Each element will represent a set of matches. The JSON for each match set should have the following fields:\n\n\n The JSON for each match set should have the following fields:\n1. concept: the corresponding concept for each particular match set\n2. pairs: an array of pairs object with the following fields: \n - word: the word to identify \n - partOfSpeech: which part of speech the word is',
    },
    { text: "level: A1" },
    {
      text: "concepts: Greetings and introductions; Basic vocabulary for everyday objects (e.g., food, clothing, household items); Numbers and counting; Days of the week, months, and telling time; Asking and answering simple questions",
    },
    {
      text: 'json: {  "exerciseType": "PARTS OF SPEECH MATCH",  "level": "A1",  "concepts": [    "Greetings and introductions",    "Basic vocabulary for everyday objects (e.g., food, clothing, household items)",    "Numbers and counting",    "Days of the week, months, and telling time",    "Asking and answering simple questions"  ],  "matchSets": [    {      "concept": "Greetings and introductions",      "pairs": [        {          "word": "hello",          "partOfSpeech": "interjection"        },        {          "word": "goodbye",          "partOfSpeech": "interjection"        },        {          "word": "friend",          "partOfSpeech": "noun"        },        {          "word": "nice",          "partOfSpeech": "adjective"        },        {          "word": "meet",          "partOfSpeech": "verb"        }      ]    },    {      "concept": "Basic vocabulary for everyday objects (e.g., food, clothing, household items)",      "pairs": [        {          "word": "apple",          "partOfSpeech": "noun"        },        {          "word": "shirt",          "partOfSpeech": "noun"        },        {          "word": "chair",          "partOfSpeech": "noun"        },        {          "word": "plate",          "partOfSpeech": "noun"        },        {          "word": "fork",          "partOfSpeech": "noun"        }      ]    },    {      "concept": "Numbers and counting",      "pairs": [        {          "word": "one",          "partOfSpeech": "numeral"        },        {          "word": "two",          "partOfSpeech": "numeral"        },        {          "word": "three",          "partOfSpeech": "numeral"        },        {          "word": "four",          "partOfSpeech": "numeral"        },        {          "word": "five",          "partOfSpeech": "numeral"        }      ]    },    {      "concept": "Days of the week, months, and telling time",      "pairs": [        {          "word": "Monday",          "partOfSpeech": "noun"        },        {          "word": "July",          "partOfSpeech": "noun"        },        {          "word": "hour",          "partOfSpeech": "noun"        },        {          "word": "clock",          "partOfSpeech": "noun"        },        {          "word": "Wednesday",          "partOfSpeech": "noun"        }      ]    },    {      "concept": "Asking and answering simple questions",      "pairs": [        {          "word": "what",          "partOfSpeech": "pronoun"        },        {          "word": "how",          "partOfSpeech": "adverb"        },        {          "word": "who",          "partOfSpeech": "pronoun"        },        {          "word": "where",          "partOfSpeech": "adverb"        },        {          "word": "why",          "partOfSpeech": "adverb"        }      ]    }  ]}',
    },
    { text: `level: ${sessionReq.englishLevel}` },
    {
      text: `concepts: ${sessionReq.concepts.slice(0, 5).join("; ")}`,
    },
    { text: "json: " },
  ];

  return JSON.parse(await requestGemini(parts));
}
