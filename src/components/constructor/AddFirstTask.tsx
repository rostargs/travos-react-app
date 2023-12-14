import React from "react";
import { FaSearchPlus } from "react-icons/fa";
import Button from "../../ui/Button";

const menuStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100%",
};

type TAddFirstTask = {
  onAddTask: () => void;
};

const AddFirstTask: React.FC<TAddFirstTask> = ({ onAddTask }) => {
  return (
    <div style={menuStyles}>
      <FaSearchPlus style={{ fill: "rgba(108, 117, 125, 0.5)", fontSize: "13rem" }} />
      <Button design="basic" text="Add first question" style={{ marginTop: "1.5rem" }} onClick={onAddTask} />
    </div>
  );
};

export default AddFirstTask;
