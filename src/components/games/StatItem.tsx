import React from "react";
import "../../styles/StatItem.scss";
import { TSortResults } from "../../pages/Stats";
import { Link } from "react-router-dom";

const StatItem: React.FC<TSortResults> = ({ date, results }) => {
  return (
    <div className="stat-item">
      <span className="stat-item__date">{date}</span>
      <ul className="stat-item__list">
        {results.map((result, index) => {
          return (
            <li className="stat-item__list-item" key={`result-${index}`}>
              <Link to={`/games/test/${result.id}`}>{result.name}</Link>
              <p>
                {result.rightAnswears} / {result.amountOfQuestions}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StatItem;
