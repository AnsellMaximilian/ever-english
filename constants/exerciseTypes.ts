export type ExerciseType = {
  key: string;
  name: string;
  description: string;
  exampleJSON: string;
};

const exerciseTypes: ExerciseType[] = [
  {
    key: "FILL_IN_THE_BLANKS",
    name: "Fill in the blanks",
    description:
      "User will be given a sentence with missing words. They are to fill in all the blanks with the correct words.",
    exampleJSON: "",
  },
  {
    key: "IDENTIFY_PARTS_OF_SPEECH",
    name: "Identify parts of speech",
    description: "",
    exampleJSON: "",
  },
  {
    key: "FORM_SENTENCE",
    name: "Form sentence",
    description: "Form a sentence from a list of words",
    exampleJSON: "",
  },
  {
    key: "MULTIPLE_CHOICE",
    name: "Multiple choice",
    description: "",
    exampleJSON: "",
  },
];

export default exerciseTypes;
