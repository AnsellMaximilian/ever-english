import { QuizSessionRequestBody } from "@/types/api";
import { removeJsonWrapper } from "@/utils/processJSONResponse";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

export async function POST(request: Request) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY as string);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

  const requestBody: QuizSessionRequestBody = await request.json();

  const generationConfig = {
    temperature: 1,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: 8192,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

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
    { text: `level: ${requestBody.englishLevel}` },
    {
      text: `concepts: ${requestBody.concepts.slice(0, 5).join("; ")}`,
    },
    { text: "json: " },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;

  const text = removeJsonWrapper(response.text());

  return Response.json(JSON.parse(text));
}
