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
    key: "FILL_IN_THE_BLANKS",
    name: "Fill in the blanks",
    description:
      "User will be given a sentence with missing words. They are to fill in all the blanks with the correct words.",
    exampleJSON: "",
  },
];

export default exerciseTypes;
