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
      text: "Generate JSON for an array of English conversations between two people based on the given concepts. The difficulty of the conversation should be constrained to the English level.  The number of items in the array should correlate to the amount of concepts given (separated by semicolons).  The parent JSON object should have the following fields:\n- conversations: an array of conversation JSON\n- exerciseType: set to \"CONVERSATION\"\n- level: the English level (eg. A1, C1, etc.)\n- concepts: an array of the given concepts. This will relate to the amount of conversations items in the conversations array. 5 concepts items means 5 conversations\n\nThe JSON  for each conversation should contain the following fields: \n1. The corresponding concept for this conversation\n2. dialog: an array of dialog. The final turn of conversation's content should be null, but leave the name of the speaker. Make the dialog such that it's unfinished but can be ended by one final turn. This field should have the following fields:\n  - name: the name of a person speaking it.\n  - content: the actual text of the dialog\n\n3. choices: an array of 4 possible choices to finish the conversation AKA fill in the blank dialog element. It should have the following fields:\n - isCorrect: a boolean of whether or not this is the correct choice to finish the conversation.\n - content: the content of the dialog turn",
    },
    { text: "level: C1" },
    {
      text: "concepts: Understanding complex and specialized texts in professional and academic domains; Analyzing and critiquing arguments and theories in written texts; Negotiating and mediating in professional and academic contexts",
    },
    {
      text: 'json: {  "exerciseType": "CONVERSATION",  "level": "C1",  "concepts": [    "Understanding complex and specialized texts in professional and academic domains",    "Analyzing and critiquing arguments and theories in written texts",    "Negotiating and mediating in professional and academic contexts"  ],  "conversations": [    {      "concept": "Understanding complex and specialized texts in professional and academic domains",      "dialog": [        {          "name": "Alice",          "content": "Have you read the latest research paper on quantum computing?"        },        {          "name": "Bob",          "content": "Yes, I found it fascinating! The advancements in quantum computing are groundbreaking."        },        {          "name": "Alice",          "content": "Absolutely! The paper delves into some intricate concepts regarding quantum entanglement and superposition."        },        {          "name": "Bob",          "content": "Indeed. It\'s remarkable how quantum mechanics is revolutionizing the field of information technology."        },        {          "name": "Alice",          "content": "Definitely. The implications of quantum computing extend far beyond traditional computing paradigms."        },        {          "name": "Bob",          "content": null        }      ],      "choices": [        {          "isCorrect": false,          "content": "That sounds interesting. How about we grab a coffee later?"        },        {          "isCorrect": true,          "content": "The paper provides valuable insights into the potential applications of quantum computing."        },        {          "isCorrect": false,          "content": "I haven\'t had the chance to read it yet. Is it worth the read?"        },        {          "isCorrect": false,          "content": "I prefer to stick with classical computing methods. Quantum computing seems too complex."        }      ]    },    {      "concept": "Analyzing and critiquing arguments and theories in written texts",      "dialog": [        {          "name": "Emily",          "content": "Have you had a chance to review the latest publication on climate change?"        },        {          "name": "Daniel",          "content": "Yes, I\'ve read through it. The author presents a compelling argument regarding the impact of human activity on global temperatures."        },        {          "name": "Emily",          "content": "I agree. The evidence provided is quite extensive, and the analysis of data trends is meticulous."        },        {          "name": "Daniel",          "content": "Absolutely. However, I did notice a few inconsistencies in the interpretation of certain data sets."        },        {          "name": "Emily",          "content": "Interesting. Could you provide some examples?"        },        {          "name": "Daniel",          "content": "Certainly. For instance, the correlation between carbon emissions and temperature rise seemed oversimplified."        },        {          "name": "Emily",          "content": "I see your point. It\'s crucial to critically evaluate the methodology used in such studies."        },        {          "name": "Daniel",          "content": "Precisely. Without rigorous scrutiny, we risk misinterpreting the findings and drawing flawed conclusions."        },        {          "name": "Emily",          "content": null        }      ],      "choices": [        {          "isCorrect": false,          "content": "I\'m more concerned about the economic implications of climate change."        },        {          "isCorrect": true,          "content": "It\'s essential to examine the underlying assumptions and methodologies employed in the research."        },        {          "isCorrect": false,          "content": "I haven\'t had a chance to read it yet. Is it worth the time?"        },        {          "isCorrect": false,          "content": "I prefer to focus on practical solutions rather than theoretical discussions."        }      ]    },    {      "concept": "Negotiating and mediating in professional and academic contexts",      "dialog": [        {          "name": "Alex",          "content": "I believe it\'s time to discuss the terms of our collaboration with the research institute."        },        {          "name": "Sophia",          "content": "Agreed. We need to ensure that our interests are adequately represented in the negotiation."        },        {          "name": "Alex",          "content": "Precisely. I\'ve prepared a proposal outlining our key objectives and desired outcomes."        },        {          "name": "Sophia",          "content": "Excellent. Let\'s schedule a meeting with their representatives to present our proposal."        },        {          "name": "Alex",          "content": "I\'ve also identified potential areas of compromise to facilitate the negotiation process."        },        {          "name": "Sophia",          "content": "That\'s a prudent approach. It\'s essential to find common ground to reach a mutually beneficial agreement."        },        {          "name": "Alex",          "content": "Absolutely. By fostering open communication and collaboration, we can overcome any challenges."        },        {          "name": "Sophia",          "content": "I couldn\'t agree more. Let\'s work towards a successful outcome for both parties."        },        {          "name": "Alex",          "content": null        }      ],      "choices": [        {          "isCorrect": false,          "content": "I think we should take a more aggressive stance to assert our demands."        },        {          "isCorrect": true,          "content": "It\'s crucial to approach the negotiation with a cooperative and constructive mindset."        },        {          "isCorrect": false,          "content": "I\'m not sure if we have the leverage to negotiate effectively in this situation."        },        {          "isCorrect": false,          "content": "Let\'s aim for maximum concessions from their side to secure a favorable deal."        }      ]    }  ]}',
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
