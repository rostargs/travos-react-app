import React from "react";
import { useParams } from "react-router-dom";
import { useGetWordQuery } from "../../app/api/wordsApi";
import "../../styles/Details.scss";
import Overlay from "../../ui/Overlay";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import General from "./General";
import Button from "../../ui/Button";
import { useAddWordToTheTextbookMutation, useRemoveWordFromTextbookMutation } from "../../app/api/userApi";
import { RootState, useAppSelector } from "../../app/store";
import Spinner from "../../ui/Spinner";
import { isWordInTextbook } from "../../utils/isWordInTextBook";

const Details: React.FC = () => {
  const { uid } = useAppSelector((state: RootState) => state.login);

  const [addWordToTheTextbook, { isLoading: isAdding }] = useAddWordToTheTextbookMutation();
  const [removeWordFromTextbook, { isLoading: isRemoving }] = useRemoveWordFromTextbookMutation();

  const params = useParams<string>();
  const navigate = useNavigate();

  if (!params.word?.length) throw new Error("No words found");

  const { data: word, isLoading, isError } = useGetWordQuery(params.word);

  const isAlreadyInTextbook = isWordInTextbook(params.word);

  if (isLoading) return <Spinner />;
  if (isError) throw new Error("Where did you find such a word?");

  const onGoBack = () => {
    navigate("/textbook");
  };

  const addWord = async () => {
    if (!word || !uid) return;
    const wordName = word[0].word;
    await addWordToTheTextbook({ userID: uid, word: wordName, wordData: word });
  };

  const removeWord = async () => {
    if (!params.word || !uid) return;
    await removeWordFromTextbook({ userID: uid, word: params.word });
  };

  const button = isAlreadyInTextbook ? (
    <Button text="Remove from the textbook" design="remove" onClick={removeWord} />
  ) : (
    <Button text="Add to the textbook" design="basic" onClick={addWord} />
  );

  return (
    <>
      <div className="details">
        <IoMdClose className="details__back" onClick={onGoBack} />
        <div className="details__head">
          <p className="details__phrase">
            Meaning of <b>{params.word}</b> in English
          </p>
          {button}
        </div>
        <main className="details__content">
          {word?.map((item, index) => {
            return <General {...item} key={index} />;
          })}
        </main>
      </div>
      <Overlay onClickOverlay={onGoBack} color />
      {(isAdding || isRemoving) && <Spinner />}
    </>
  );
};

export default Details;
