import React from "react";
import "../../styles/CourseArticle.scss";
import HeroStatistic from "../HeroStatistic";

const CourseArticle: React.FC = () => {
  return (
    <article className="course-article">
      <span className="course-article__platform">E-COURSE PLATFORM</span>
      <h1 className="course-article__title">Learning and teaching online, made easy.</h1>
      <p className="course-article__paragraph">
        Practice your English and learn new things <br /> with the platform.
      </p>
      <HeroStatistic />
    </article>
  );
};

export default CourseArticle;
