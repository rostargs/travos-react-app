import React from "react";
import Space from "../../public/space.png";
import Button from "../ui/Button";
import "../styles/ErrorPage.scss";
import { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC<Partial<FallbackProps>> = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate();

  const onGoBack = () => {
    resetErrorBoundary && resetErrorBoundary();
    navigate(-1);
  };

  return (
    <div className="error-page">
      <div className="error-page__container">
        <h1 className="error-page__title">Oops!</h1>
        <p className="error-page__message">{error?.message || "You are lost"}</p>
        <img src={Space} alt="Space" />
        <Button text="Go back" design="link" onClick={onGoBack} />
      </div>
    </div>
  );
};

export default ErrorPage;
