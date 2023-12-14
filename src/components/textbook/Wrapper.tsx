import React from "react";

type TWrapper = {
  title: string;
  color: "yellow" | "green";
  children: React.ReactNode;
};

const Wrapper: React.FC<TWrapper> = ({ children, color, title }) => {
  const wrapperStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    border: `0.1rem solid var(--${color})`,
  };
  const typographyStyles: React.CSSProperties = {
    width: "100%",
    fontSize: " 1.7rem",
    padding: "1rem 2rem",
    background: `var(--${color})`,
    color: "var(--white)",
  };
  const ulStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem 2rem",
  };
  return (
    <div style={wrapperStyles}>
      <h6 style={typographyStyles}>{title}</h6>
      <ul style={ulStyles}>{children}</ul>
    </div>
  );
};

export default Wrapper;
