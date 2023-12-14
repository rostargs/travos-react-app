import React from "react";
import "../styles/ConstructorInput.scss";

type TConstructorInput = {
  questionId: number;
  value: string;
  name: string;
  label?: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorState: string | null;
  error: boolean | null;
};

const ConstructorInput: React.FC<TConstructorInput> = ({
  questionId,
  value,
  label,
  placeholder,
  onChange,
  error,
  errorState,
  name,
}) => {
  const inputID = React.useId();

  const errorContent = errorState ? (
    <span className="constructor-input__error" style={label ? { bottom: "-30%" } : { bottom: "-45%" }}>
      {errorState}
    </span>
  ) : null;

  const labelText = label ? `${label} ${questionId + 1}` : null;

  return (
    <div className="constructor-input">
      <label htmlFor={inputID}>{labelText}</label>
      <input
        className={error ? "constructor-input--error" : ""}
        name={name}
        type="text"
        id={inputID}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {errorContent}
    </div>
  );
};

export default React.memo(ConstructorInput);
