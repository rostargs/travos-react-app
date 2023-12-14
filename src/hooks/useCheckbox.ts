import React from "react";
import { selectOption } from "../app/slices/questionSlice";
import { RootState, useAppDispatch, useAppSelector } from "../app/store";
import { Options } from "../components/constructor/QuestionForm";

export const useCheckbox = (questionID: number) => {
  const [optionList, setOptionList] = React.useState<boolean>(false);
  const questions = useAppSelector((state: RootState) => state.questionConstructor);
  const dispatch = useAppDispatch();
  const { questionType } = questions[questionID];


  const onSelectOption = (option: Options) => {
    dispatch(
      selectOption({
        questionID: questionID,
        option: option,
      })
    );
    setOptionList(false);
  };

  const onToggleOptionList = (event: React.MouseEvent<HTMLDivElement>) => {
    const spanElement = event.target as HTMLSpanElement;
    const target = event.currentTarget;

    if (event.target === target || spanElement.nodeName === "SPAN") {
      setOptionList((prev) => !prev);
    }
  };

  const onClickOverlay = () => {
    setOptionList(false);
  };

  return {
    onSelectOption,
    questionType,
    optionList,
    onToggleOptionList,
    onClickOverlay,
  };
};
