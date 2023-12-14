import React from "react";
import "../styles/ConstructorCheckbox.scss";
import { IoIosArrowDown } from "react-icons/io";
import Overlay from "./Overlay";
import { useCheckbox } from "../hooks/useCheckbox";
import { Options } from "../components/constructor/QuestionForm";

type TConstructorCheckbox = {
  questionId: number;
  options: Options[];
  error: boolean | null;
};

const ConstructorCheckbox: React.FC<TConstructorCheckbox> = ({ questionId, options, error }) => {
  const { questionType, onSelectOption, optionList, onClickOverlay, onToggleOptionList } = useCheckbox(questionId);

  const isActiveOptionList = optionList ? "constructor-checkbox__list--active" : "";
  const classes = ["constructor-checkbox__checkbox", error ? "constructor-checkbox__checkbox--error" : ""];

  const selectedQuestionType = questionType || "Select type";

  const renderOptions = options.map((option, index) => (
    <li className="constructor-checkbox__option" onClick={() => onSelectOption(option)} key={index}>
      {option}
    </li>
  ));

  return (
    <div className="constructor-checkbox">
      <label>Question Type</label>
      <div className={classes.join(" ")} onClick={onToggleOptionList}>
        <span className="constructor-checkbox__variant">{selectedQuestionType}</span>
        <IoIosArrowDown style={{ fontSize: "1.2rem" }} />
        {optionList ? <Overlay onClickOverlay={onClickOverlay} /> : null}
        <ul className={`constructor-checkbox__list ${isActiveOptionList}`}>{renderOptions}</ul>
      </div>
    </div>
  );
};

export default ConstructorCheckbox;
