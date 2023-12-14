import React from "react";
import { IoDuplicateOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdAddCircleOutline } from "react-icons/md";
import "../styles/Control.scss";

const controlImages = {
  duplicate: (
    <IoDuplicateOutline style={{ fontSize: "1.8rem", color: "var(--cyan)" }} />
  ),
  delete: (
    <RiDeleteBinLine style={{ fontSize: "1.8rem", color: "var(--cyan)" }} />
  ),
  "add answer": (
    <MdAddCircleOutline style={{ fontSize: "1.8rem", color: "var(--cyan)" }} />
  ),
};

type TControl = {
  type: keyof typeof controlImages;
  onClick?: () => void;
};

const Control: React.FC<TControl> = ({ type, onClick }) => {
  return (
    <div className="control" onClick={onClick}>
      <div>{controlImages[type]}</div>
      <p>{type}</p>
    </div>
  );
};

export default Control;
