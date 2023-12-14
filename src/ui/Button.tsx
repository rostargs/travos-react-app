import React from "react";
import "../styles/Buttons.scss";
import { Link } from "react-router-dom";

type TButtton = {
  text: string;
  design: "link" | "link-light" | "basic" | "shoes-pink" | "shoes-basic" | "cancel" | "add" | "dictionary" | "remove";
  to?: string;
} & React.HTMLAttributes<HTMLButtonElement>;

const Button: React.FC<TButtton> = ({ text, to, design, ...props }) => {
  const classes = [props.className || "button", `button__${design}`];
  return (
    <Link to={to || "#"}>
      <button {...props} className={classes.join(" ")}>
        {text}
      </button>
    </Link>
  );
};

export default React.memo(Button);
