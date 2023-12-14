import React from "react";
import "../../styles/LearnArticle.scss";
import Button from "../../ui/Button";

const LearnArticle: React.FC = () => {
  return (
    <article className="learn-article">
      <h1 className="learn-article__title">Learn a language in a playful way</h1>
      <p className="learn-article__paragraph">Make learning words more fun with mini-games</p>
      <div className="learn-article__buttons">
        <Button text="Tests" design="shoes-pink" to="/games/test" />
        <Button text="Statistics" design="shoes-basic" to="/games/stats" />
      </div>
    </article>
  );
};

export default LearnArticle;
