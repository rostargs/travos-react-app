import React from "react";
import Overlay from "../../ui/Overlay";
import { IoMdClose } from "react-icons/io";
import "../../styles/SearchWord.scss";
import Button from "../../ui/Button";
import Input, { THookProps } from "../../ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type TSearchWord = {
  onToggleMenu: () => void;
};

type TSearchWordInputs = {
  search: string;
};

const searchInput: THookProps<TSearchWordInputs> = {
  name: "search",
  label: "Search Word",
  required: {
    value: true,
    message: "This field is required",
  },
  minLength: {
    value: 2,
    message: "Min.length is 2 symbols",
  },
  type: "text",
  icon: "text",
};

const SearchWord: React.FC<TSearchWord> = ({ onToggleMenu }) => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TSearchWordInputs>();

  const onSearch: SubmitHandler<TSearchWordInputs> = (data) => {
    const searchedWord = data.search.toLowerCase();
    navigate(`/textbook/${searchedWord}`);
    onToggleMenu();
  };

  return (
    <>
      <div className="search-word">
        <div className="search-word__head">
          <h4 className="search-word__title">Search Word</h4>
          <IoMdClose onClick={onToggleMenu} />
        </div>
        <Input register={register} {...searchInput} errorMessage={errors.search?.message} />
        <div className="search-word__buttons">
          <Button design="cancel" text="Cancel" onClick={onToggleMenu} />
          <Button design="basic" text="Search" onClick={handleSubmit(onSearch)} />
        </div>
      </div>
      <Overlay color onClickOverlay={onToggleMenu} />
    </>
  );
};

export default SearchWord;
