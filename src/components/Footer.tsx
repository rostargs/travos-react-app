import React from "react";
import { links } from "../data/links";
import { mapLinks } from "../utils/mapLinks";
import CustomLink from "../ui/CustomLink";
import "../styles/Footer.scss";
// import Reddit from "../../public/reddit.svg";
// import YouTube from "../../public/youtube.svg";
// import GT from "../../public/GT.svg";
import { Link } from "react-router-dom";

const footerLinks = mapLinks(links);
// const logos = Array.from([Reddit, YouTube, GT]);

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <nav className="footer__nav">
        <ul className="footer__nav-list">
          {footerLinks.map((link, index) => (
            <CustomLink {...link} key={index} />
          ))}
        </ul>
        <Link to="/">
          <h1 className="footer__logo">{import.meta.env.VITE_PROJECT_NAME}</h1>
        </Link>
      </nav>
      <div className="footer__social-links">
        {/* <ul className="footer__company-logos">
          {logos.map((logo, index) => {
            return (
              <li key={index}>
                <Link to="#">
                  <img src={logo} alt="Company logo" />
                </Link>
              </li>
            );
          })}
        </ul> */}
        <span className="footer__support">bodnarooksandr@gmail.com</span>
        <span className="footer__project">©2023 Travos. Project for {import.meta.env.VITE_PROJECT_NAME}.</span>
      </div>
    </footer>
  );
};

export default Footer;
