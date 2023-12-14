import React from "react";
import "../styles/HeroContainer.scss";

type THeroContainer = {
  children?: React.ReactNode;
  imageSrc: string;
  reverse?: boolean;
};

const HeroContainer: React.FC<THeroContainer> = ({ children, reverse, imageSrc }) => {
  const classes = ["hero", reverse && "hero__reverse"];
  return (
    <section className={classes.join(" ")}>
      <main>{children}</main>
      <div>
        <img src={imageSrc} alt={imageSrc} />
      </div>
    </section>
  );
};

export default HeroContainer;
