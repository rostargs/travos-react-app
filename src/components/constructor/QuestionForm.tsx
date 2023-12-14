import React from "react";
import "../../styles/QuestionForm.scss";
import ConstructorInput from "../../ui/ConstructorInput";
import ConstructorCheckbox from "../../ui/ConstructorCheckbox";
import Control from "../../ui/Control";
import { RootState, useAppDispatch, useAppSelector } from "../../app/store";
import AddAnswer from "./AddAnswer";
import { copyQuestion, deleteQuestion } from "../../app/slices/questionSlice";
import { TInputField, useConstructorInput } from "../../hooks/useConstructorInput";
import Answer from "../../ui/Answer";
import { TQuestion } from "../../models/constructor.module";

const MAX_OPTIONS = 4;

export enum Options {
  SIMPLE = "Simple answer",
  MULTI = "Multi answer",
}

type TFormInputs = {
  question: string;
  simpleAnswer: string;
};

const initialState: Record<keyof TFormInputs, TInputField> = {
  question: {
    value: "",
    minLength: 12,
    maxLength: 128,
  },
  simpleAnswer: {
    value: "",
    minLength: 1,
    maxLength: 30,
  },
};

const formOptions = [Options.SIMPLE, Options.MULTI];

const QuestionForm: React.FC<TQuestion> = ({ id, question, questionType, general }) => {
  const dispatch = useAppDispatch();
  const [showAddMenu, setShowAddMenu] = React.useState<boolean>(false);
  const constructorInputs = useConstructorInput<TFormInputs>(initialState, id);
  const { errorForm } = useAppSelector((state: RootState) => state.constructorError);
  const { isValid } = useAppSelector((state: RootState) => state.questionConstructor[id]);

  const onToggleAddMenu = () => {
    setShowAddMenu((prev) => !prev);
  };

  const onCloseAddMenu = () => {
    setShowAddMenu(false);
  };

  const isMultiOption = questionType === Options.MULTI;
  const isMaxOptions = isMultiOption && general.length < MAX_OPTIONS;
  const showError = errorForm === true ? isValid : null;

  return (
    <>
      <div className="question-form">
        <div className="question-form__wrapper">
          <ConstructorInput
            name="question"
            label="Question"
            questionId={id}
            placeholder="Write your answer here"
            value={question}
            onChange={constructorInputs.onChangeQuestionInput}
            error={showError && !showError.question}
            errorState={constructorInputs.errorState.question}
          />
          <ConstructorCheckbox options={formOptions} questionId={id} error={showError && !showError.answers} />
        </div>
        <div className="question-form__answers">
          {isMultiOption ? (
            general.map((answer, index) => (
              <Answer
                value={answer.answer}
                questionId={id}
                answerId={answer.id}
                isCorrect={answer.isCorrect}
                key={index}
              />
            ))
          ) : general.length ? (
            <ConstructorInput
              name="simpleAnswer"
              questionId={id}
              placeholder="Write the answer"
              value={general[0].answer}
              onChange={constructorInputs.onChangeSimpleAnswerInput}
              error={showError && !showError.answers}
              errorState={constructorInputs.errorState.simpleAnswer}
            />
          ) : null}
        </div>
        <div className="question-form__controls">
          {isMaxOptions && <Control type="add answer" onClick={onToggleAddMenu} />}
          <Control type="duplicate" onClick={() => dispatch(copyQuestion(id))} />
          <Control type="delete" onClick={() => dispatch(deleteQuestion(id))} />
        </div>
      </div>
      {showAddMenu && <AddAnswer onClose={onCloseAddMenu} id={id} />}
    </>
  );
};

export default React.memo(QuestionForm);
