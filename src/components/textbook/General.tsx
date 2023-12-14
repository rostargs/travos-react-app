import React from "react";
import "../../styles/General.scss";
import { AiFillSound } from "react-icons/ai";
import Meaninig from "./Meaninig";
import { Link } from "react-router-dom";
import { ApiResponse } from "../../models/word.module";
import { findAudio } from "../../utils/findAudio";
import { playAudio } from "../../utils/playAudio";

const General: React.FC<ApiResponse> = ({ meanings, phonetic, phonetics, sourceUrls, word }) => {
  const isAudio = findAudio(phonetics) || false;
  return (
    <div className="general">
      <div className="general__main">
        <h3 className="general__word">{word}</h3>
        <div className="general__phonetic">
          <b>UK</b>
          {isAudio && <AiFillSound onClick={() => playAudio(isAudio)} />}
          <span>{phonetic}</span>
        </div>
      </div>
      <main className="general__details">
        {meanings.map((item, index) => {
          return <Meaninig {...item} key={index} />;
        })}
      </main>
      <Link to={sourceUrls[0]}>
        Visit <b>Wiktionary</b>
      </Link>
    </div>
  );
};

export default General;
