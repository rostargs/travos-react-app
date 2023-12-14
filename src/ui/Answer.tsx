import React from "react";
import { FaCheck } from "react-icons/fa";
import { FaBan } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { useAppDispatch } from "../app/store";
import { deleteMultiAnswer } from "../app/slices/questionSlice";
import "../styles/Answer.scss";

type TAnswer = {
  questionId: number;
  answerId: number;
  isCorrect: boolean;
  value: string;
};

const Answer: React.FC<TAnswer> = ({ questionId, answerId, isCorrect, value }) => {
  const dispatch = useAppDispatch();
  const deleteAnswer = () => {
    dispatch(deleteMultiAnswer({ questionId, answerId }));
  };

  const iconStyles = { color: "var(--red)", cursor: "pointer" };
  const answer = isCorrect ? <FaCheck style={{ color: "var(--green)" }} /> : <FaBan style={{ color: "var(--red)" }} />;

  return (
    <span className="answer">
      <div className="answer__info">
        {answer}
        <p>{value}</p>
      </div>
      <IoTrashBin onClick={deleteAnswer} style={iconStyles} />
    </span>
  );
};

export default React.memo(Answer);
