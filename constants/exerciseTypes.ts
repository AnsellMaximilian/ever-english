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
    description:
      "User will be given a sentence with missing words. They are to fill in all the blanks with the correct words.",
    exampleJSON: "",
  },
  {
    type: "COMPREHENSION",
    name: "Comprehension",
    description: "Form a sentence from a list of words",
    exampleJSON: "",
  },
  {
    type: "CONVERSATION",
    name: "Conversation",
    description: "",
    exampleJSON: "",
  },
  {
    type: "PARTS OF SPEECH MATCH",
    name: "Parts of Speech",
    description: "",
    exampleJSON: "",
  },
];

export default exerciseTypes;
