import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Card.scss";
import Statistics from "../../../public/statisticsImage.png";
import Graduation from "../../../public/graduation.png";

type TCard = {
  type: "stats" | "tests";
};

const types = {
  tests: {
    img: Graduation,
    to: "/games/test",
    name: "Tests",
  },
  stats: {
    img: Statistics,
    to: "/games/stats",
    name: "Statistics",
  },
};

const Card: React.FC<TCard> = ({ type }) => {
  const { img, to, name } = types[type];
  return (
    <Link to={to}>
      <div className="card">
        <img src={img} alt="Type of games" />
        <h6>{name}</h6>
      </div>
    </Link>
  );
};

export default Card;
