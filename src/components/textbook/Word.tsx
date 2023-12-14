import React from "react";
import AudioPlay from "../../../public/audio.svg";
import "../../styles/Word.scss";
import Button from "../../ui/Button";
import { ApiResponse } from "../../models/word.module";
import { findAudio } from "../../utils/findAudio";
import { playAudio } from "../../utils/playAudio";
import { filterMeanings } from "../../utils/filterMeanings";
import { useRemoveWordFromTextbookMutation } from "../../app/api/userApi";
import { RootState, useAppSelector } from "../../app/store";
import Spinner from "../../ui/Spinner";

const Word: React.FC<ApiResponse> = ({ word, meanings, phonetic, phonetics }) => {
  const { uid } = useAppSelector((state: RootState) => state.login);
  if (!uid) throw new Error("No user found!");

  const [loading, setLoading] = React.useState<boolean>(false);

  const [removeWordFromTextbook] = useRemoveWordFromTextbookMutation();
  const isSynonyms = meanings.find((item) => item.synonyms.length);
  const synonym = isSynonyms?.synonyms[0] || "-";

  const isAudio = findAudio(phonetics) || false;

  const { example, definition } = filterMeanings(meanings);

  const onRemoveWord = async () => {
    setLoading(true);
    await removeWordFromTextbook({ userID: uid, word: word });
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  if (loading) return <Spinner />;

  return (
    <div className="word">
      <div className="word__head">
        <div className="word__main">
          <h6 className="word__title">{word}</h6>
          <b>/</b>
          <span className="word__antonym">{synonym}</span>
        </div>
        {isAudio && <img src={AudioPlay} alt="Play audio" onClick={() => playAudio(isAudio)} />}
      </div>
      <div className="word__addition">
        <span className="word__transcription">{phonetic}</span>
        <div className="word__status">learned</div>
      </div>
      <p className="word__definition">{definition}</p>
      <p className="word__example">{example || "-"}</p>
      <div className="word__buttons">
        <Button design="remove" text="Remove from dictionary" onClick={onRemoveWord} />
        <Button design="dictionary" text="More" to={word} />
      </div>
    </div>
  );
};

export default React.memo(Word);
