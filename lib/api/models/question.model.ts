import type ID from "./_id.model";

export const QuestionContentType = {
  multichoicequestion: "",
  singlechoicequestion: "",
  reorderchoicequestion: "",
  dragdropquestion: "",
  textoptionquestion: "",
};

export type Option = {
  name: string;
  is_answer: boolean;
} & ID;

export type ReorderOption = {
  name: string;
  position: number;
} & ID;

export type Choice = {
  name: string;
} & ID;

type Question = {
  title: string;
  type: keyof typeof QuestionContentType;
} & ID;

type ChoiceQuestion = {
  choices: Option[];
} & Question;

export type SingleChoiceQuestion = {} & ChoiceQuestion;

export type MultiChoiceQuestion = {} & ChoiceQuestion;

export type ReorderChoiceQuestion = {
  choices: ReorderOption[];
} & Question;

export type TextOptionQuestion = {
  question: string;
} & Question;

export type DragDropQuestion = {
  question: string;
  choices: Choice[];
} & Question;

type QuestionMixin =
  | SingleChoiceQuestion
  | MultiChoiceQuestion
  | ReorderChoiceQuestion
  | TextOptionQuestion
  | DragDropQuestion;

export default QuestionMixin;
