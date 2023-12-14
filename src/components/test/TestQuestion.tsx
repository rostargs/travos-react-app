import React from "react";
import "../../styles/TestQuestion.scss";
import { Options } from "../constructor/QuestionForm";
import AnswearItem from "./AnswerItem";
import { TAnswer } from "../../models/constructor.module";
import { TCheckAnswears } from "./Test";

const baseColors = ["#5996a5", "#639b6d", "#a15993", "#a95151", "#c4a24c"];

type TTestQuestion = TCheckAnswears<Options> & {
  onChangeSingleAnswear: (event: React.ChangeEvent<HTMLInputElement>, id: number) => void;
  onSelectMultiAnswear: (id: number, answear: TAnswer) => void;
};

const TestQuestion: React.FC<TTestQuestion> = ({
  question,
  questionType,
  general,
  id,
  onChangeSingleAnswear,
  onSelectMultiAnswear,
  answear,
}) => {
  return (
    <div className="test-question">
      <div className="test-question__main">
        <div className="test-question__number">
          <span>{id + 1}</span>
        </div>
        <p>{question}</p>
      </div>
      <div className="test-question__answears">
        {questionType === Options.MULTI ? (
          general.map((item, index) => (
            <AnswearItem
              color={baseColors[index]}
              answer={item}
              questionID={id}
              onSelectMultiAnswear={onSelectMultiAnswear}
              key={`multi-answear-${index}`}
              isActive={answear !== null ? +answear === index : false}
            />
          ))
        ) : (
          <input
            className="test-question__input"
            placeholder="Write the answear here"
            onChange={(e) => onChangeSingleAnswear(e, id)}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(TestQuestion);
