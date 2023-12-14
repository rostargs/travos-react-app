import React from "react";
import ErrorImage from "../../public/Error.svg";
import BoyWithBook from "../../public/boyWithBook.png";
import "../styles/Error.scss";

const variants = {
  words: {
    img: ErrorImage,
    text: "No words yet 😒",
  },
  tests: { img: BoyWithBook, text: "No test found 🤷‍♂️" },
  stats: { img: BoyWithBook, text: "You have not taken any tests yet!" },
};

type TErrorState = {
  type: keyof typeof variants;
};

const ErrorState: React.FC<TErrorState> = ({ type }) => {
  const { img, text } = variants[type];
  return (
    <div className="error">
      <img src={img} alt={text} />
      <b>OOPS!</b>
      <p>{text}</p>
    </div>
  );
};

export default ErrorState;
