export type ExerciseType = {
  type: string;
  name: string;
  description: string;
  exampleJSON: string;
};

const exerciseTypes: ExerciseType[] = [
  {
    type: "ARRANGE SENTENCE",
    name: "Sentence Arrangement",
    description: "Arrange a sentence in the correct order.",
    exampleJSON: "",
  },
  {
    type: "COMPREHENSION",
    name: "Comprehension",
    description: "Test your comprehension skills with reading materials.",
    exampleJSON: "",
  },
  {
    type: "CONVERSATION",
    name: "Conversation",
    description: "Practise your conversation skills.",
    exampleJSON: "",
  },
  {
    type: "PARTS OF SPEECH MATCH",
    name: "Parts of Speech",
    description: "Match words to the correct parts of speech.",
    exampleJSON: "",
  },
];

export default exerciseTypes;
