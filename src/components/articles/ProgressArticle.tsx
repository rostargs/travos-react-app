import React from "react";
import Button from "../../ui/Button";
import "../../styles/ProgressArticle.scss";

const ProgressArticle: React.FC = () => {
  return (
    <article className="progress-article">
      <h1 className="progress-article__title">Watch your progress every day</h1>
      <p className="progress-article__paragraph">Save statistics on your achievements, words learned, and mistakes</p>
      <Button text="Statistics" design="link-light" to="/games/stats" />
    </article>
  );
};

export default ProgressArticle;
