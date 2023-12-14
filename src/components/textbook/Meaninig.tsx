import React from "react";
import "../../styles/Meaning.scss";
import { Link } from "react-router-dom";
import Wrapper from "./Wrapper";
import { Meaning } from "../../models/word.module";

const Meaninig: React.FC<Meaning> = ({ partOfSpeech, synonyms, definitions }) => {
  return (
    <div className="meaning">
      <h5 className="meaning__part-of-speech">
        Part of speech : {partOfSpeech} [{partOfSpeech[0]}]
      </h5>
      <Wrapper color="green" title="Synonyms">
        {synonyms.length ? (
          synonyms.map((item, index) => {
            return (
              <li className="meaning__synonyms-item" key={index}>
                <Link to={`/textbook/${item}`}>{item}</Link>
              </li>
            );
          })
        ) : (
          <p>No synonyms found 😒</p>
        )}
      </Wrapper>
      <Wrapper color="yellow" title="Examples">
        {definitions.map((item, index) => {
          return (
            <li className="meaning__examples-item" key={index}>
              <p className="meaning__examples-item--definition">{item.definition}</p>
              <p className="meaning__examples-item--example">{item.example}</p>
            </li>
          );
        })}
      </Wrapper>
    </div>
  );
};

export default Meaninig;
