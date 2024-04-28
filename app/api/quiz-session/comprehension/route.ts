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
      text: 'Generate JSON for reading comprehension exercises. The difficulty of the reading material should be constrained to the English level. The number of reading texts should match the amount of concepts given (separated by semicolons).\nThe parent JSON object should have the following fields:\n- exerciseType: set to "COMPREHENSION"\n- level: the English level (eg. A1, C1, etc.)\n- concepts: an array of the given concepts. This will relate to the amount of reading texts in the texts array. 5 concepts items means 5 texts.\n- texts: an array of texts to be the reading materials. \n\nThe JSON for each text should have the following fields:\n1. concept: the corresponding concept for each particular match set\n2. text: the text itself, the reading material. The length of the text should match the English level (C1 should be longer than A1). \n3. question: a question text about the reading material to be answered correctly.\n4. choices: an array of 4 choice objects. One of these will be the correct choice for the reading material. Each choice should have the following fields:\n - answer: answer text to answer the question\n - isCorrect: boolean that represents whether this particular choice is correct or not.',
    },
    { text: "level: A1" },
    {
      text: "concepts: Greetings and introductions; Basic vocabulary for everyday objects (e.g., food, clothing, household items); Numbers and counting; Days of the week, months, and telling time; Asking and answering simple questions",
    },
    {
      text: 'json: {  "exerciseType": "COMPREHENSION",  "level": "A1",  "concepts": [    "Greetings and introductions",    "Basic vocabulary for everyday objects (e.g., food, clothing, household items)",    "Numbers and counting",    "Days of the week, months, and telling time",    "Asking and answering simple questions"  ],  "texts": [    {      "concept": "Greetings and introductions",      "text": "Hello! My name is John. What\'s your name?",      "question": "What is the speaker\'s name?",      "choices": [        { "answer": "John", "isCorrect": true },        { "answer": "Alice", "isCorrect": false },        { "answer": "Bob", "isCorrect": false },        { "answer": "Mary", "isCorrect": false }      ]    },    {      "concept": "Basic vocabulary for everyday objects (e.g., food, clothing, household items)",      "text": "I need to buy some apples, bread, and milk from the store.",      "question": "What does the speaker need to buy from the store?",      "choices": [        { "answer": "Apples, bread, and milk", "isCorrect": true },        { "answer": "Oranges, cake, and juice", "isCorrect": false },        { "answer": "Bananas, cookies, and soda", "isCorrect": false },        { "answer": "Pizza, chips, and ice cream", "isCorrect": false }      ]    },    {      "concept": "Numbers and counting",      "text": "There are five apples and three oranges on the table.",      "question": "How many fruits are on the table?",      "choices": [        { "answer": "Eight", "isCorrect": true },        { "answer": "Six", "isCorrect": false },        { "answer": "Ten", "isCorrect": false },        { "answer": "Four", "isCorrect": false }      ]    },    {      "concept": "Days of the week, months, and telling time",      "text": "Today is Tuesday, and it\'s 3:00 PM.",      "question": "What day is it today?",      "choices": [        { "answer": "Tuesday", "isCorrect": true },        { "answer": "Wednesday", "isCorrect": false },        { "answer": "Monday", "isCorrect": false },        { "answer": "Thursday", "isCorrect": false }      ]    },    {      "concept": "Asking and answering simple questions",      "text": "How are you? I\'m fine, thank you.",      "question": "How is the speaker feeling?",      "choices": [        { "answer": "Fine", "isCorrect": true },        { "answer": "Hungry", "isCorrect": false },        { "answer": "Sad", "isCorrect": false },        { "answer": "Tired", "isCorrect": false }      ]    }  ]}',
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
