import React from "react";
import { saveSimpleAnswerValue, saveQuestionValue, setErrorValue } from "../app/slices/questionSlice";
import { useAppDispatch } from "../app/store";
import { TQuestionValidation } from "../models/constructor.module";

export type TSave = keyof TQuestionValidation;
export type TInputField = {
  value: string;
  minLength: number;
  maxLength: number;
};

export const useConstructorInput = <T extends { [key: string]: string }>(
  initialState: Record<keyof T, TInputField>,
  id: number
) => {
  const dispatch = useAppDispatch();
  const [field, setField] = React.useState(initialState);
  const [errorState, setErrorState] = React.useState<Record<keyof T, null | string>>(() => {
    const validationFields: Record<keyof T, null> = {} as Record<keyof T, null>;
    Object.keys(initialState).forEach((key) => {
      const typedKey = key as keyof T;
      validationFields[typedKey] = null;
    });
    return validationFields;
  });

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setField((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value: value,
      },
    }));
  };

  const checkValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    return field[name].minLength < value.length && field[name].maxLength > value.length;
  };

  const onChangeQuestionInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeInput(event);
    dispatch(saveQuestionValue({ id: id, value: event.target.value }));
    dispatch(setErrorValue({ questionID: id, value: checkValidation(event), type: "question" }));
  };

  const onChangeSimpleAnswerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeInput(event);
    dispatch(saveSimpleAnswerValue({ id, value: event.target.value }));
    dispatch(setErrorValue({ questionID: id, value: checkValidation(event), type: "answers" }));
  };

  const onChangeMultiAnswerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeInput(event);
  };

  React.useEffect(() => {
    Object.keys(field).map((key) => {
      const fieldLength = field[key].value.length;
      const isBigger = fieldLength > field[key].minLength;
      const isLess = fieldLength < field[key].maxLength;

      if (field[key].value.length) {
        setErrorState((prev) => {
          return {
            ...prev,
            [key]:
              (!isBigger && `Min.length is ${field[key].minLength} symbols`) ||
              (!isLess && `Max.length is ${field[key].maxLength} symbols`) ||
              null,
          };
        });
      }
    });
  }, [field]);

  return {
    field,
    errorState,
    handleChangeInput,
    onChangeQuestionInput,
    onChangeSimpleAnswerInput,
    onChangeMultiAnswerInput,
  };
};
