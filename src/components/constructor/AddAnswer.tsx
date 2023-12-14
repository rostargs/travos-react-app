import React from "react";
import Overlay from "../../ui/Overlay";
import "../../styles/AddAnswer.scss";
import { IoMdClose } from "react-icons/io";
import ConstructorInput from "../../ui/ConstructorInput";
import { FormControlLabel, Switch } from "@mui/material";
import Button from "../../ui/Button";
import { TInputField, useConstructorInput } from "../../hooks/useConstructorInput";
import { RootState, useAppDispatch, useAppSelector } from "../../app/store";
import { saveMultiAnswerValue, setErrorValue } from "../../app/slices/questionSlice";

type TAddAnswer = {
  id: number;
  onClose: () => void;
};

type TAddAnswerInputs = {
  multiAnswer: string;
};

const initialState: Record<keyof TAddAnswerInputs, TInputField> = {
  multiAnswer: {
    value: "",
    minLength: 1,
    maxLength: 34,
  },
};

const AddAnswer: React.FC<TAddAnswer> = ({ onClose, id }) => {
  const { general } = useAppSelector((state: RootState) => state.questionConstructor[id]);
  const isAlreadyRightAnswer = general.some((answer) => answer.isCorrect);
  const [isAnswerCorrect, setIsAnswerCorrect] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const constructorInput = useConstructorInput<TAddAnswerInputs>(initialState, id);
  const onAddAnswer = () => {
    const value = constructorInput.field.multiAnswer.value;
    if (constructorInput.errorState.multiAnswer === null && value.length > 0) {
      dispatch(saveMultiAnswerValue({ id, value, isCorrect: isAnswerCorrect }));
      const isAnyAnswer = !!(general.length >= 1);
      dispatch(setErrorValue({ questionID: id, type: "answers", value: isAnyAnswer }));
      onClose();
    }
  };
  return (
    <>
      <div className="add-answer">
        <div className="add-answer__header">
          <h4 className="add-answer__title">Add answer</h4>
          <IoMdClose onClick={onClose} />
        </div>
        <form className="add-answer__form">
          <ConstructorInput
            placeholder="White the answer here"
            value={constructorInput.field.multiAnswer.value}
            onChange={constructorInput.onChangeMultiAnswerInput}
            error={false}
            errorState={constructorInput.errorState.multiAnswer}
            name="multiAnswer"
            questionId={id}
          />
          <FormControlLabel
            disabled={isAlreadyRightAnswer}
            control={<Switch value={isAnswerCorrect} onChange={(e) => setIsAnswerCorrect(e.target.checked)} />}
            label="Right answer"
            labelPlacement="end"
            sx={{
              "& .MuiTypography-root": {
                fontFamily: "Montserrat",
                fontSize: "1.4rem",
              },
            }}
          />
        </form>
        <div className="add-answer__buttons">
          <Button design="cancel" text="Cancel" onClick={onClose} />
          <Button design="basic" text="Add" onClick={onAddAnswer} />
        </div>
      </div>
      <Overlay color onClickOverlay={onClose} />
    </>
  );
};

export default AddAnswer;
