import React from "react";
import Card from "../components/games/Card";
import "../styles/Games.scss";

const Games: React.FC = () => {
  return (
    <div className="games">
      <Card type="tests" />
      <Card type="stats" />
    </div>
  );
};

export default Games;
