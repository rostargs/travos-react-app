import { Options } from "../components/constructor/QuestionForm";

export type TQuestionValidation = {
  question: boolean | null;
  answers: boolean | null;
};

export type TAnswer = {
  id: number;
  answer: string;
  isCorrect: boolean;
};

export type TQuestion = {
  id: number;
  question: string;
  isValid: TQuestionValidation;
  questionType: Options | null;
  general: TAnswer[];
};

export type TOption = {
  questionID: number;
  option: Options;
};

export type TSetError = {
  questionID: number;
  value: boolean | null;
  type: keyof TQuestionValidation;
};
