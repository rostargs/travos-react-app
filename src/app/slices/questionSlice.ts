import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { Options } from "../../components/constructor/QuestionForm";
import { TOption, TQuestion, TSetError } from "../../models/constructor.module";
import { RootState } from "../store";

const initialState: TQuestion[] = [];

export type TSendState = Pick<TQuestion, "id" | "question" | "questionType" | "general">;

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    selectOption: (state, action: PayloadAction<TOption>) => {
      const { questionID, option } = action.payload;
      if (state[questionID].questionType === option) return;
      state[questionID].questionType = option;
      if (state[questionID].questionType === Options.MULTI) {
        state[questionID].general = [];
      } else {
        state[questionID].general = [
          {
            isCorrect: true,
            answer: "",
            id: 0,
          },
        ];
      }
    },
    setErrorValue: (state, action: PayloadAction<TSetError>) => {
      const { questionID, type, value } = action.payload;
      state[questionID].isValid[type] = value;
    },
    deleteQuestion: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
      state.forEach((question, index) => {
        question.id = index;
      });
    },
    copyQuestion: (state, action: PayloadAction<number>) => {
      const questionToCopy = { ...state[action.payload] };
      questionToCopy.id = state.length;

      state.push(questionToCopy);
    },
    addEmptyQuestion: (state) => {
      const emptyQuestion: TQuestion = {
        id: state.length,
        question: "",
        questionType: null,
        isValid: {
          question: null,
          answers: null,
        },
        general: [],
      };
      state.push(emptyQuestion);
    },
    saveQuestionValue: (state, action: PayloadAction<{ id: number; value: string }>) => {
      const { id, value } = action.payload;
      state[id].question = value;
    },
    saveMultiAnswerValue: (state, action: PayloadAction<{ id: number; value: string; isCorrect: boolean }>) => {
      const { id, value, isCorrect } = action.payload;
      state[id].general.push({ id: state[id].general.length, answer: value, isCorrect });
    },
    saveSimpleAnswerValue: (state, action: PayloadAction<{ id: number; value: string }>) => {
      const { id, value } = action.payload;
      state[id].general[0].answer = value;
    },
    deleteMultiAnswer: (state, action: PayloadAction<{ questionId: number; answerId: number }>) => {
      const { questionId, answerId } = action.payload;
      state[questionId].general.splice(answerId, 1);
      state[questionId].general.forEach((answer, index) => {
        answer.id = index;
      });
      state[questionId].isValid.answers = state[questionId].general.length > 1;
    },
    clearState: (state) => {
      state.length = 0;
    },
  },
});

const selectState = (state: RootState) => state.questionConstructor;

export const statsSelector = createSelector([selectState], (state) => {
  const testLength = state.length;
  const multiAnswer = state.reduce((acc, curr) => (acc += curr.questionType === Options.MULTI ? 1 : 0), 0);
  const singleAnswer = testLength - multiAnswer;

  const data = [
    { name: "Multiple answers", value: multiAnswer },
    { name: "Single answer", value: singleAnswer },
  ];

  return data;
});

export const constructorSelect = createSelector([selectState], (state) => {
  return state.map(
    ({ question, questionType, id, general }) => ({ question, questionType, id, general } as TSendState)
  );
});

export const {
  selectOption,
  setErrorValue,
  deleteQuestion,
  copyQuestion,
  addEmptyQuestion,
  saveQuestionValue,
  saveMultiAnswerValue,
  saveSimpleAnswerValue,
  deleteMultiAnswer,
  clearState,
} = questionSlice.actions;

export default questionSlice.reducer;
