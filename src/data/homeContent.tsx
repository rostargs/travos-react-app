import BoyWithFlowers from "../../public/boyWithFlowers.png";
import GirlWithTablet from "../../public/learn.png";
import GirlWithBook from "../../public/girlWithBook.png";
import CourseArticle from "../components/articles/CourseArticle";
import LearnArticle from "../components/articles/LearnArticle";
import VocabularyArticle from "../components/articles/VocabularyArticle";
import ProgressArticle from "../components/articles/ProgressArticle";
import GirlAndBoy from "../../public/GirlAndBoy.png";

type TArticle = {
  id: number;
  article: JSX.Element;
  image: string;
  reverse?: boolean;
};

export const articles: TArticle[] = [
  {
    id: 0,
    article: <CourseArticle />,
    image: BoyWithFlowers,
  },
  {
    id: 1,
    article: <LearnArticle />,
    image: GirlWithTablet,
    reverse: true,
  },
  {
    id: 2,
    article: <VocabularyArticle />,
    image: GirlWithBook,
  },
  {
    id: 3,
    article: <ProgressArticle />,
    image: GirlAndBoy,
    reverse: true,
  },
];