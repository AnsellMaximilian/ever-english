const englishLevels = [
  {
    level: "A1",
    requiredXp: 500,
    concepts: [
      "Greetings and introductions",
      "Basic vocabulary for everyday objects (e.g., food, clothing, household items)",
      "Numbers and counting",
      "Days of the week, months, and telling time",
      "Asking and answering simple questions",
      "Describing people and objects using basic adjectives",
      "Common verbs and their usage in present tense",
      "Forming simple sentences and questions (subject-verb-object structure)",
      "Basic phrases for ordering food and drinks",
      "Asking for directions and giving simple directions",
      "Expressing likes, dislikes, and preferences",
      "Using simple conjunctions (e.g., and, but, or)",
    ],
  },
  {
    level: "A2",
    requiredXp: 1000,
    concepts: [
      "Expanding vocabulary for various topics (e.g., family, hobbies, work)",
      "Describing daily routines and activities",
      "Talking about past events using past simple tense",
      "Expressing future plans and intentions using future tense",
      "Comparing objects and people using comparative and superlative forms",
      "Talking about personal experiences and interests",
      "Expressing opinions and preferences",
      "Discussing simple plans and arrangements",
      "Using modal verbs for possibility, necessity, and advice (e.g., can, must, should)",
      "Narrating a simple story or sequence of events",
      "Understanding basic written texts (e.g., signs, short messages, simple emails)",
      "Listening for specific information in short spoken passages",
      "Reading and understanding short texts on familiar topics",
    ],
  },
  {
    level: "B1",
    requiredXp: 1500,
    concepts: [
      "Understanding main ideas and details in longer texts and conversations",
      "Expressing wishes, hopes, and regrets using conditional sentences",
      "Describing habits and routines using present perfect tense",
      "Narrating personal experiences and events in the past",
      "Expressing future plans and intentions using going to + infinitive",
      "Giving and receiving opinions, agreeing and disagreeing",
      "Talking about likes, dislikes, and preferences in detail",
      "Expressing cause and effect using linking words (e.g., because, so, therefore)",
      "Expressing purpose and result using infinitive and gerund structures",
      "Using phrasal verbs and idiomatic expressions in context",
      "Understanding gist and specific information in longer written texts (e.g., articles, stories)",
      "Listening for detailed information and implied meaning in longer spoken passages",
      "Participating in conversations and discussions on familiar topics",
    ],
  },
  {
    level: "B2",
    requiredXp: 3000,
    concepts: [
      "Understanding complex texts on both concrete and abstract topics",
      "Analyzing and evaluating arguments and opinions in written texts",
      "Expressing hypothetical situations using unreal conditionals",
      "Describing experiences and events with detailed information and supporting evidence",
      "Expressing future predictions and possibilities using future continuous and future perfect",
      "Discussing abstract ideas and concepts in depth",
      "Expressing certainty, probability, and obligation using modal verbs and adverbs",
      "Using a wide range of vocabulary accurately and appropriately",
      "Writing clear and coherent essays, reports, and formal letters",
      "Engaging in debates and expressing opinions persuasively",
      "Understanding implied meaning, tone, and attitude in spoken discourse",
      "Summarizing and synthesizing information from spoken sources",
      "Delivering presentations and speeches on various topics",
    ],
  },
  {
    level: "C1",
    requiredXp: 5000,
    concepts: [
      "Understanding complex and specialized texts in professional and academic domains",
      "Analyzing and critiquing arguments and theories in written texts",
      "Expressing nuanced meanings and shades of opinion",
      "Using a wide range of idiomatic expressions and figurative language",
      "Adapting language register and style to suit different contexts and audiences",
      "Writing well-structured and coherent academic essays, research papers, and reports",
      "Participating effectively in academic seminars, discussions, and debates",
      "Conducting independent research and synthesizing information from multiple sources",
      "Understanding and producing complex spoken discourse (e.g., lectures, presentations)",
      "Negotiating and mediating in professional and academic contexts",
      "Understanding and producing different genres of written and spoken discourse (e.g., narrative, argumentative, expository)",
      "Interpreting and evaluating cultural nuances and subtleties in language use",
    ],
  },
  {
    level: "C2",
    requiredXp: 7500,
    concepts: [
      "Understanding virtually all forms of written and spoken communication, including nuanced and technical language",
      "Analyzing and synthesizing information from diverse and challenging sources",
      "Critically evaluating complex arguments and theories",
      "Expressing ideas with precision, subtlety, and fluency",
      "Using language flexibly and creatively to achieve rhetorical and stylistic effects",
      "Writing polished and sophisticated texts for a wide range of purposes and audiences",
      "Speaking confidently and persuasively in professional and public settings",
      "Understanding and producing complex and specialized discourse in academic and professional domains",
      "Interacting effortlessly with native speakers in a wide range of contexts",
      "Adapting language use to navigate diverse cultural and social situations",
      "Demonstrating near-native or native-like proficiency in all aspects of language use",
    ],
  },
];

export default englishLevels.reverse();
