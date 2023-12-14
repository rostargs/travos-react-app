import React from "react";
import "../../styles/AnswearItem.scss";
import { TAnswer } from "../../models/constructor.module";

type TAnswearItem = {
  questionID: number;
  color: string;
  answer: TAnswer;
  onSelectMultiAnswear: (id: number, answear: TAnswer) => void;
  isActive: boolean;
};

const AnswearItem: React.FC<TAnswearItem> = ({ color, answer, onSelectMultiAnswear, questionID, isActive }) => {
  return (
    <div
      className={`answear-item ${isActive ? "answear-item--active" : ""}`}
      style={{ backgroundColor: color }}
      onClick={() => onSelectMultiAnswear(questionID, answer)}
    >
      <span>{answer.answer}</span>
    </div>
  );
};

export default React.memo(AnswearItem);
