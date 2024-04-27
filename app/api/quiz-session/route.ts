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
      text: "Generate a JSON representing a set of English exercises at a particular English level. The amount of exercises should correlate to the number of concepts provided. So, each concept should have one exercise. Each exercise should be of the following type: CONVERSATION, FILL IN THE BLANKS, PARTS OF SPEECH MATCH, FINISH THE TEXT. Choose the type at random. The JSON should have the following fields:\n- exercises: an array of English exercises. Each type of exercise should have a different structure. But all should have exerciseType.\n\n\nType: CONVERSATION\nAn English conversation about a particular concept between two people. The difficulty of the conversation should be constrained to the English level. The JSON should contain the following fields: \n1. dialog: an array of dialog. The final turn of conversation's content should be null, but leave the name of the speaker. Make the dialog such that it's unfinished but can be ended by one final turn. This field should have the following fields:\n\n  - name: the name of a person speaking it.\n  - content: the actual text of the dialog\n2. conversationChoices: an array of 4 possible choices to finish the conversation AKA fill in the blank dialog element. It should have the following fields:\n - isCorrect: a boolean of whether or not this is the correct choice to finish the conversation.\n - content: the content of the dialog turn\n\nType: FILL IN THE BLANKS\nOne or two sentences with a few words (blanks) missing for the user to complete.  There should at least be 3 blanks. The JSON should have the following fields:\n1. fillInTheBlanksIncompleteText: an array of string of words representing a text. Make some words null to represent blanks.\n2. fillInTheBlankChoices: an array of choices the user can pick to complete fillInTheBlanksIncompleteText. Also include a few incorrect choice. Each choice should have the following fields: \n - correctIndex: the correct zero-based index representing the order the choice should be put to complete the corresponding blank. If it's one of the incorrect choices, it should be -1.\n - content: the text to fill the blank with\n\nType: FINISH THE TEXT\nA text made up of two or more sentences. A phrase (more than one word) is removed at the end. The blank should be more than one word (a phrase). The JSON should have the following fields:\n1. finishTheTextIncompleteText: A string of the incomplete text\n2. finishTheTextChoices: an array of 4 choices the user can pick to complete the blank in finishTheTextIncompleteText. Each choice should have the following fields: \n- text: the missing text \n- isCorrect: a boolean of whether or not the choice is correct. Only one should have the value of true.\n\nType: PARTS OF SPEECH MATCH\nMatching words with the appropriate parts of speech (adjective, verb, etc.). The JSON should have the following fields:\n1. pairs: an array of pairs object with the following fields: \n - word: the word to identify \n - partOfSpeech: which part of speech the word is\n\n Do not wrap the JSON code in json markers. The output should just be pure JSON.",
    },
    { text: "English Level: A1" },
    {
      text: "concepts: Academics; Understanding complex and specialized texts in professional and academic domains; Conducting independent research and synthesizing information from multiple sources; Negotiating and mediating in professional and academic contexts",
    },
    {
      text: 'json: {  "exercises": [    {      "type": "FILL IN THE BLANKS",      "fillInTheBlanksIncompleteText": [        "The",        "professor",        "presented",        null,        "study",        "findings",        null,        "conclusions",        "during",        null,        "lecture."      ],      "fillInTheBlanksChoices": [        { "correctIndex": 3, "content": "his" },        { "correctIndex": 9, "content": "the" },        { "correctIndex": -1, "content": "their" },        { "correctIndex": -1, "content": "your" },        { "correctIndex": 6, "content": "and" }      ]    },    {      "type": "CONVERSATION",      "dialog": [        {          "name": "Alice",          "content": "Have you read the latest research paper on quantum computing?"        },        {          "name": "Bob",          "content": "Yes, I found it fascinating! The advancements in quantum computing are groundbreaking."        },        {          "name": "Alice",          "content": "Absolutely! The paper delves into some intricate concepts regarding quantum entanglement and superposition."        },        {          "name": "Bob",          "content": "Indeed. It\'s remarkable how quantum mechanics is revolutionizing the field of information technology."        },        {          "name": "Alice",          "content": "Definitely. The implications of quantum computing extend far beyond traditional computing paradigms."        },        {          "name": "Bob",          "content": null        }      ],      "conversationChoices": [        {          "isCorrect": false,          "content": "That sounds interesting. How about we grab a coffee later?"        },        {          "isCorrect": true,          "content": "The paper provides valuable insights into the potential applications of quantum computing."        },        {          "isCorrect": false,          "content": "I haven\'t had the chance to read it yet. Is it worth the read?"        },        {          "isCorrect": false,          "content": "I prefer to stick with classical computing methods. Quantum computing seems too complex."        }      ]    },    {      "type": "FINISH THE TEXT",      "finishTheTextIncompleteText": "After conducting independent research and synthesizing information from multiple sources,",      "finishTheTextChoices": [        {          "text": "the researcher can draw valid conclusions.",          "isCorrect": true        },        { "text": "the doctor can cure the patient.", "isCorrect": false },        { "text": "I will be home.", "isCorrect": false },        { "text": "the researcher can win a nobel prize.", "isCorrect": false }      ]    },    {      "type": "PARTS OF SPEECH MATCH",      "pairs": [        { "word": "effective", "partOfSpeech": "adjective" },        { "word": "negotiate", "partOfSpeech": "verb" },        { "word": "diplomatic", "partOfSpeech": "adjective" },        { "word": "mediate", "partOfSpeech": "verb" },        { "word": "strategically", "partOfSpeech": "adverb" },        { "word": "resolve", "partOfSpeech": "verb" },        { "word": "tactful", "partOfSpeech": "adjective" }      ]    }  ]}',
    },
    { text: "English Level: C1" },
    {
      text: "concepts: Understanding complex and specialized texts in professional and academic domains; Analyzing and critiquing arguments and theories in written texts; Expressing nuanced meanings and shades of opinion; Using a wide range of idiomatic expressions and figurative language; Adapting language register and style to suit different contexts and audiences; Writing well-structured and coherent academic essays, research papers, and reports; Participating effectively in academic seminars, discussions, and debates; Conducting independent research and synthesizing information from multiple sources; Understanding and producing complex spoken discourse (e.g., lectures, presentations); Negotiating and mediating in professional and academic contexts; Understanding and producing different genres of written and spoken discourse (e.g., narrative, argumentative, expository); Interpreting and evaluating cultural nuances and subtleties in language use",
    },
    {
      text: 'json: {\n  "dialog": [\n    {\n      "name": "Alice",\n      "content": "Have you read the latest research paper on quantum computing?"\n    },\n    {\n      "name": "Bob",\n      "content": "Yes, I found it fascinating! The advancements in quantum computing are groundbreaking."\n    },\n    {\n      "name": "Alice",\n      "content": "Absolutely! The paper delves into some intricate concepts regarding quantum entanglement and superposition."\n    },\n    {\n      "name": "Bob",\n      "content": "Indeed. It\'s remarkable how quantum mechanics is revolutionizing the field of information technology."\n    },\n    {\n      "name": "Alice",\n      "content": "Definitely. The implications of quantum computing extend far beyond traditional computing paradigms."\n    },\n    {\n      "name": "Bob",\n      "content": null\n    }\n  ],\n  "choices": [\n    {\n      "isCorrect": false,\n      "content": "That sounds interesting. How about we grab a coffee later?"\n    },\n    {\n      "isCorrect": true,\n      "content": "The paper provides valuable insights into the potential applications of quantum computing."\n    },\n    {\n      "isCorrect": false,\n      "content": "I haven\'t had the chance to read it yet. Is it worth the read?"\n    },\n    {\n      "isCorrect": false,\n      "content": "I prefer to stick with classical computing methods. Quantum computing seems too complex."\n    }\n  ]\n}',
    },
    { text: `English Level: ${requestBody.englishLevel}` },
    {
      text: `concepts: ${requestBody.concepts.join("; ")}`,
    },
    { text: "json: " },
  ];

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    const response = result.response;

    const text = removeJsonWrapper(response.text());

    console.log(text);

    return Response.json(JSON.parse(text));
  } catch (error) {
    console.log(error, typeof error, Object.keys(error as object));
    return Response.json(
      {
        message: "Something went wrong.",

        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}
