import React from "react";
import { TTest } from "../../app/api/testApi";
import { Link } from "react-router-dom";
import "../../styles/TestCard.scss";

const TestCard: React.FC<TTest> = ({ name, id, questions, image }) => {
  return (
    <Link to={id}>
      <li className="test-card">
        <div className="test-card__image" style={{ backgroundImage: `url(${image})` }} />
        <h3 className="test-card__name">{name}</h3>
        <div className="test-card__amount">
          <span>{questions.length}</span>
        </div>
      </li>
    </Link>
  );
};

export default React.memo(TestCard);
