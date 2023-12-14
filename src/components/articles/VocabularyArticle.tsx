import React from "react";
import Button from "../../ui/Button";
import "../../styles/VocabularyArticle.scss";

const VocabularyArticle: React.FC = () => {
  return (
    <article className="vocabulary-article">
      <h1 className="vocabulary-article__title">Increase your vocabulary</h1>
      <p className="vocabulary-article__paragraph">Save statistics on your achievements, words learned, and mistakes</p>
      <Button design="link-light" text="Textbook" to="/textbook" />
    </article>
  );
};

export default VocabularyArticle;
