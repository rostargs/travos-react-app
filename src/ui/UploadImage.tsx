import React from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import "../styles/UploadImage.scss";

type TUploadImage = {
  activeImage: null | File;
  uploadFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isError: boolean;
};

const UploadImage: React.FC<TUploadImage> = ({ activeImage, uploadFile, isError }) => {
  const inputID = React.useId();

  const classes = [
    "upload-image__label",
    activeImage ? "upload-image__label--choosed" : "",
    isError ? "upload-image__label--error" : "",
  ].join(" ");

  const imageURL = activeImage ? URL.createObjectURL(activeImage) : "";

  return (
    <div className="upload-image" datatype-image={imageURL}>
      <label htmlFor={inputID} className={classes}>
        <MdDriveFolderUpload />
      </label>
      <input type="file" id={inputID} onChange={uploadFile} accept=".svg, .png, .jpg" />
      <div className="upload-image__preview" style={{ backgroundImage: `url(${imageURL})` }} />
    </div>
  );
};

export default UploadImage;
