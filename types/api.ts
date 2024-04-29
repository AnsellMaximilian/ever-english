export type QuizSessionRequestBody = {
  concepts: string[];
  englishLevel: string;
};

export interface ExerciseSession {
  exerciseType: string;
  level: string;
  concepts: string[];
}

export interface ConversationExerciseSession extends ExerciseSession {
  conversations: {
    concept: string;
    dialog: {
      name: string;
      content: string | null;
    }[];
    choices: {
      isCorrect: boolean;
      content: string;
    }[];
  }[];
}

export interface PartsOfSpeechMatchExerciseSession extends ExerciseSession {
  matchSets: {
    concept: string;
    pairs: { word: string; partOfSpeech: string }[];
  }[];
}

export interface ComprehensionExerciseSession extends ExerciseSession {
  texts: {
    concept: string;
    text: string;
    question: string;
    choices: {
      answer: string;
      isCorrect: boolean;
    }[];
  }[];
}

export interface ArrangeSentenceExerciseSession extends ExerciseSession {
  sentences: {
    concept: string;
    sentence: string;
  }[];
}
