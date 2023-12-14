import React from "react";
import "../styles/Textbook.scss";
import Button from "../ui/Button";
import SearchWord from "../components/textbook/SearchWord";
import Word from "../components/textbook/Word";
import { Outlet } from "react-router-dom";
import { useGetUserTextbookQuery } from "../app/api/userApi";
import { RootState, useAppSelector } from "../app/store";
import ErrorState from "../ui/ErrorState";
import Spinner from "../ui/Spinner";

const Textbook: React.FC = () => {
  const { uid } = useAppSelector((state: RootState) => state.login);
  if (!uid) throw new Error("No user found");

  const { data: textbook, isLoading } = useGetUserTextbookQuery(uid);
  const [searchMenu, setSearchMenu] = React.useState<boolean>(false);

  const onToggleSearchMenu = () => {
    setSearchMenu((prev) => !prev);
  };

  const isAnyWordsInTextbook = textbook && !!new Map(Object.entries(textbook)).size;

  const renderAllWords = isAnyWordsInTextbook ? (
    Object.keys(textbook).map((word, index) => {
      const wordInfo = textbook[word][0];

      return <Word {...wordInfo} key={index} />;
    })
  ) : (
    <ErrorState type="words" />
  );

  if (isLoading) return <Spinner />;

  const containerStyles = isAnyWordsInTextbook ? { gridTemplateColumns: "1fr 1fr" } : { gridTemplateColumns: "1fr" };

  return (
    <>
      <div className="textbook">
        <div className="textbook__menu">
          <h4 className="textbook__title">Textbook</h4>
          <Button design="basic" text="Search word" onClick={onToggleSearchMenu} />
        </div>
        <main className="textbook__words" style={containerStyles}>
          {renderAllWords}
        </main>
      </div>
      {searchMenu && <SearchWord onToggleMenu={onToggleSearchMenu} />}
      <Outlet />
    </>
  );
};

export default Textbook;
