import React from "react";
import "../../styles/Test.scss";
import { useGetTestByIDQuery } from "../../app/api/testApi";
import { useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import TestQuestion from "./TestQuestion";
import Button from "../../ui/Button";
import { TSendState } from "../../app/slices/questionSlice";
import { Options } from "../constructor/QuestionForm";
import { TAnswer } from "../../models/constructor.module";
import Results from "./Results";
import { useSetTestResultMutation } from "../../app/api/userApi";
import { RootState, useAppSelector } from "../../app/store";
import { TResult } from "../../models/user.module";

export type TCheckAnswears<T extends Options> = TSendState & {
  answear: (T extends Options.MULTI ? number : string) | null;
};

const Test: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) throw new Error("Test not found");

  const [setTestResult] = useSetTestResultMutation();
  const { uid } = useAppSelector((state: RootState) => state.login);
  const [testInfo, setTestInfo] = React.useState<TCheckAnswears<Options>[]>([]);
  const { data: test, isLoading, isSuccess, isError } = useGetTestByIDQuery(id);
  const [rightAnswears, setRightAnswears] = React.useState<number>(0);
  const [completeTest, setCompleteTest] = React.useState<boolean>(false);

  if (isError || (!isLoading && !test)) throw new Error("Test not found");

  React.useEffect(() => {
    if (isSuccess && test) {
      setTestInfo(
        test.questions.map((question) => {
          return { ...question, answear: null };
        })
      );
    }
  }, [isSuccess, test]);

  const onChangeSingleAnswear = (event: React.ChangeEvent<HTMLInputElement>, id: number): void => {
    const copyOfTest = structuredClone(testInfo);
    copyOfTest[id] = {
      ...copyOfTest[id],
      answear: event.target.value,
    };
    setTestInfo(copyOfTest);
  };

  const onSelectMultiAnswear = (id: number, answear: TAnswer): void => {
    const copyOfTest = structuredClone(testInfo);
    copyOfTest[id] = {
      ...copyOfTest[id],
      answear: answear.id,
    };
    setTestInfo(copyOfTest);
  };

  const onCompleteTest = async () => {
    if (!test) return;
    const { name, questions } = test;
    const rightAnswears = testInfo.reduce((acc, question) => {
      if (question.questionType === Options.SIMPLE) {
        const isCorrect = String(question.answear).toLowerCase() === question.general[0].answer.toLowerCase();
        return isCorrect ? acc + 1 : acc;
      } else {
        const rightAnswerID = question.general.findIndex((item) => item.isCorrect);
        const isCorrect = question.answear !== null ? Number(question.answear) === +rightAnswerID : false;
        return isCorrect ? acc + 1 : acc;
      }
    }, 0);

    const testResult: TResult = {
      id,
      name,
      rightAnswears,
      amountOfQuestions: questions.length,
      time: String(new Date()),
    };

    uid && (await setTestResult({ userID: uid, testInfo: testResult }));
    setRightAnswears(rightAnswears);
    setCompleteTest((prev) => !prev);
  };

  if (isLoading) return <Spinner />;

  const renderTests = testInfo.map((question, index) => (
    <TestQuestion
      key={`test-${index}`}
      {...question}
      onChangeSingleAnswear={onChangeSingleAnswear}
      onSelectMultiAnswear={onSelectMultiAnswear}
    />
  ));

  return (
    <>
      <div className="test">
        <h2 className="test__name">{test?.name}</h2>
        <main className="test__tests">{renderTests}</main>
        <div className="test__buttons">
          <Button design="add" text="Check answers" onClick={onCompleteTest} />
        </div>
      </div>
      {completeTest && <Results rightAnswears={rightAnswears} testInfo={test} />}
    </>
  );
};

export default Test;
