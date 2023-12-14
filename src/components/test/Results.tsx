import React from "react";
import "../../styles/Results.scss";
import Overlay from "../../ui/Overlay";
import Books from "../../../public/books.png";
import { CircularProgress } from "@mui/material";
import { TTest } from "../../app/api/testApi";
import Button from "../../ui/Button";

type TResult = {
  rightAnswears: number;
  testInfo: TTest | undefined;
};

const Results: React.FC<TResult> = ({ rightAnswears, testInfo }) => {
  if (!testInfo) return;
  const { name, questions } = testInfo;

  const testLength = questions.length;
  const testResult = (rightAnswears / testLength) * 100;
  return (
    <>
      <div className="results">
        <div className="results__wrapper">
          <img src={Books} alt="Books" />
          <main className="results__info">
            <h4 className="results__test-name">{name}</h4>
            <p className="results__test-mark">You did pretty good!</p>
            <div>
              <p>
                Right answears: {rightAnswears} / {testLength}{" "}
              </p>
              <CircularProgress
                value={testResult}
                variant="determinate"
                sx={{
                  ".MuiCircularProgress-svg": {
                    color: "#5996a5",
                  },
                }}
              />
            </div>
          </main>
        </div>
        <div className="results__buttons">
          <Button text="Try again" design="link" onClick={() => location.reload()} />
          <Button text="Go to the tests" design="basic" to="/games/test" />
        </div>
      </div>
      <Overlay color />
    </>
  );
};

export default Results;
