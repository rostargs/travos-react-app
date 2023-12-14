import React from "react";
import "../../styles/ChooseWay.scss";

const chooseWay = {
  signup: "Sign up",
  login: "Login",
};

type TChooseWay = {
  variant: keyof typeof chooseWay;
};

const ChooseWay: React.FC<TChooseWay> = ({ variant }) => {
  return (
    <div className="choose-way">
      <p>
        <span>{chooseWay[variant]}</span> with Others
      </p>
    </div>
  );
};

export default React.memo(ChooseWay);
