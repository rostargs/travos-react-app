import React from "react";
import HeroContainer from "../components/HeroContainer";
import { articles } from "../data/homeContent";

const Home: React.FC = () => {
  const renderArticles = articles.map((article) => {
    return (
      <HeroContainer imageSrc={article.image} key={article.id} reverse={article.reverse}>
        {article.article}
      </HeroContainer>
    );
  });
  return <div className="home">{renderArticles}</div>;
};

export default Home;
