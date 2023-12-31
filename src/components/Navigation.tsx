import React from "react";
import "../styles/Navigation.scss";
import { Link } from "react-router-dom";
import CustomLink from "../ui/CustomLink";
import { links } from "../data/links";
import { FaRegUserCircle } from "react-icons/fa";
import Button from "../ui/Button";
import { RootState, useAppDispatch, useAppSelector } from "../app/store";
import { auth } from "../firebase";
import { logOut } from "../app/slices/loginSlice";
import { signOut } from "firebase/auth";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../ui/Spinner";
import { mapLinks } from "../utils/mapLinks";

const Navigation: React.FC = () => {
  const [menu, setMenu] = React.useState<boolean>(false);
  const { email, isLogged } = useAppSelector((state: RootState) => state.login);
  const dispatch = useAppDispatch();
  const { loading } = useAuth();

  const onLogOut = async () => {
    await signOut(auth);
    dispatch(logOut());
  };

  const onToggleMenu = () => {
    setMenu((prev) => !prev);
  };

  const linksToRender = menu ? mapLinks(links) : links;

  const renderListContent = linksToRender.map((link, index) => (
    <CustomLink key={index} {...link} onClick={() => setMenu(false)} />
  ));

  const togglerClasses = ["navigation__toggle-menu", menu ? "navigation__toggle-menu--active" : ""].join(" ");
  const listClasses = ["navigation__list", menu ? "navigation__list--active" : ""].join(" ");

  return (
    <>
      <nav className="navigation">
        <div className={togglerClasses} onClick={onToggleMenu} />
        <Link to="/" className="navigation__logo">
          {import.meta.env.VITE_PROJECT_NAME}
        </Link>
        <ul className={listClasses}>
          {renderListContent}
          {menu ? (
            isLogged ? (
              <Button text="Sign Out" design="link" onClick={onLogOut} />
            ) : (
              <Button text="Log in" design="basic" to="/registration/login" />
            )
          ) : null}
        </ul>
        <div className="navigation__account">
          <div className="navigation__account_wrapper">
            {isLogged && <FaRegUserCircle alt="Account picture" className="navigation__account_logo" />}
            <span className="navigation__account_name">{email}</span>
          </div>
          {isLogged ? (
            <Button text="Sign Out" design="link" onClick={onLogOut} />
          ) : (
            <Button text="Log in" design="basic" to="/registration/login" />
          )}
        </div>
      </nav>
      {loading && <Spinner />}
    </>
  );
};

export default Navigation;
