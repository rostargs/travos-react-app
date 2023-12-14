import React from "react";
import "../styles/Registration.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const Registration: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="registration">
      <IoMdArrowRoundBack className="registration__back" onClick={() => navigate("/")} />
      <div className="registration-container">
        <main className="registration__content">
          <h1 className="registration__title">Welcome</h1>
          <div>
            <Outlet />
          </div>
        </main>
        <div className="registration__image" />
      </div>
    </div>
  );
};

export default Registration;
