import React from "react";
import { Triangle } from "react-loader-spinner";
import Overlay from "./Overlay";

const spinnerStyles = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: "7777",
};

const Spinner: React.FC = () => {
  return (
    <>
      <Triangle
        height="8rem"
        width="8rem"
        color="#FFF"
        ariaLabel="circles-loading"
        visible={true}
        wrapperStyle={spinnerStyles}
      />
      <Overlay color zIndex={1111} />
    </>
  );
};

export default Spinner;
