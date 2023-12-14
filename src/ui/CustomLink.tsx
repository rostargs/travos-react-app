import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/CustomLink.scss";

export type TCustomLink = {
  name: string;
  to: string;
  children?: TCustomLink[];
  onClick?: () => void;
};

const CustomLink: React.FC<TCustomLink> = ({ name, to, children, onClick }) => {
  const [activeParentLink, setActiveParentLink] = React.useState<boolean>(false);
  const subMenuRef = React.useRef<HTMLUListElement | null>(null);
  return (
    <li className="custom-link" onClick={onClick}>
      <NavLink to={to} style={({ isActive }) => (isActive || activeParentLink ? { color: "var(--dark)" } : {})}>
        {({ isActive }) => (
          <>
            {name}
            {children && (
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 15 14" fill="none">
                <path
                  d="M3.81216 6.60889L7.27434 10.0713L10.7367 6.60889"
                  stroke={isActive ? "#333" : "#757575"}
                  strokeWidth="1.6"
                />
              </svg>
            )}
          </>
        )}
      </NavLink>
      {children?.length && (
        <ul
          ref={subMenuRef}
          onMouseEnter={() => setActiveParentLink(true)}
          onMouseLeave={() => setActiveParentLink(false)}
          className="custom-link__sublinks"
        >
          {children.map((sublink, index) => (
            <CustomLink {...sublink} key={index} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default React.memo(CustomLink);
