import React, { HTMLInputTypeAttribute } from "react";
import { InputAdornment, TextField } from "@mui/material";
import { VscAccount } from "react-icons/vsc";
import { RiLockPasswordLine } from "react-icons/ri";
import { PiSubtitles } from "react-icons/pi";
import { FaEye } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import { MdOutlineTextsms } from "react-icons/md";
import { Path, UseFormRegister } from "react-hook-form";

const iconVariants = {
  account: <VscAccount />,
  password: <RiLockPasswordLine />,
  name: <PiSubtitles />,
  text: <MdOutlineTextsms />,
};

export type TDefaultInputProps = {
  required: { value: boolean; message: string };
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  disabled?: boolean;
  errorMessage?: string;
  pattern?: { value: RegExp; message: string };
  label: string;
  icon: keyof typeof iconVariants;
  type: HTMLInputTypeAttribute;
};

export type THookProps<T extends { [key: string]: string }> = {
  name: Path<T>;
} & TDefaultInputProps;

type TInput<T extends { [key: string]: string }> = {
  register: UseFormRegister<T>;
  name: Path<T>;
} & TDefaultInputProps;

const Input = <T extends { [key: string]: string }>({
  label,
  icon,
  register,
  name,
  required,
  pattern,
  maxLength,
  minLength,
  errorMessage,
  type,
  disabled,
  ...props
}: TInput<T>) => {
  const inputID = React.useId();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const inputStyles: React.CSSProperties = {
    fontFamily: "Montserrat",
    fontSize: "1.2rem",
    fontWeight: 500,
    color: "var(--dark)",
    textTransform: "capitalize",
  };

  const isError = !!errorMessage;

  const errorStyles = isError
    ? {
        position: "relative",
        "&::after": {
          fontFamily: "Montserrat",
          position: "absolute",
          bottom: "-2.1rem",
          content: `'${errorMessage}'`,
          color: "var(--red)",
          fontWeight: 600,
          fontSize: "1.4rem",
        },
      }
    : null;

  const onTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType: HTMLInputTypeAttribute = type === "password" ? (showPassword ? "text" : "password") : type;

  const inputProps = {
    startAdornment: <InputAdornment position="start">{iconVariants[icon]}</InputAdornment>,
    sx: { ...inputStyles, ".MuiInputBase-input": { padding: "1.65rem 1.4rem" } },
    endAdornment:
      type === "password" ? (
        <InputAdornment position="end" onClick={onTogglePassword} sx={{ cursor: "pointer" }}>
          {showPassword ? <MdCancelPresentation /> : <FaEye />}
        </InputAdornment>
      ) : null,
  };

  return (
    <TextField
      id={inputID}
      label={label}
      type={inputType}
      variant="outlined"
      InputProps={inputProps}
      inputProps={props}
      fullWidth
      error={isError}
      margin="dense"
      InputLabelProps={{ sx: { ...inputStyles } }}
      {...register(name, { required, pattern, maxLength, minLength })}
      sx={errorStyles}
    />
  );
};

export default Input;
