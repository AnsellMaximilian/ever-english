export type ExerciseType = {
  type: string;
  name: string;
  description: string;
  url: string;
};

const exerciseTypes: ExerciseType[] = [
  {
    type: "ARRANGE SENTENCE",
    name: "Sentence Arrangement",
    description: "Arrange a sentence in the correct order.",
    url: "arrange-sentence",
  },
  {
    type: "COMPREHENSION",
    name: "Comprehension",
    description: "Test your comprehension skills with reading materials.",
    url: "comprehension",
  },
  {
    type: "CONVERSATION",
    name: "Conversation",
    description: "Practise your conversation skills.",
    url: "conversation",
  },
  {
    type: "PARTS OF SPEECH MATCH",
    name: "Parts of Speech",
    description: "Match words to the correct parts of speech.",
    url: "parts-of-speech-match",
  },
];

export default exerciseTypes;
