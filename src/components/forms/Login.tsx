import React from "react";
import Input from "../../ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import ExtraWays from "./ExtraWays";
import { loginInputs } from "../../data/registration/login";
import ChooseWay from "./ChooseWay";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseErrors } from "../../firebaseErrors";
import { FirebaseError } from "firebase/app";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useSetUserDataMutation } from "../../app/api/userApi";
import { userObj } from "../../utils/userObj";
import { ToastContainer } from "react-toastify";
import { notify } from "../../pages/TestConstructor";

export type TLoginForm = {
  email: string;
  password: string;
};

export const formStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
};

export const buttonStyles = {
  background: "#1C1C1C",
  color: "var(--white)",
  p: 1.5,
  fontSize: "1.2rem",
  fontWeight: 600,
};

const Login: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TLoginForm>();
  const navigate = useNavigate();
  const [setUserData] = useSetUserDataMutation();

  const onLogIn: SubmitHandler<TLoginForm> = async (data) => {
    const { email, password } = data;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code in firebaseErrors) {
          notify(firebaseErrors[error.code]);
          throw new Error(firebaseErrors[error.code]);
        }
      }
    }
  };

  const onLoginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(auth, provider);
      await setUserData(userObj(user));
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code in firebaseErrors) {
          notify(firebaseErrors[error.code]);
          throw new Error(firebaseErrors[error.code]);
        }
      }
    }
  };

  return (
    <>
      <form style={formStyles}>
        {loginInputs.map((input, index) => {
          return (
            <Input<TLoginForm> key={index} register={register} {...input} errorMessage={errors[input.name]?.message} />
          );
        })}
        <Button variant="contained" sx={buttonStyles} onClick={handleSubmit(onLogIn)}>
          Log in
        </Button>
        <Link to="/registration/sign-up" style={{ textAlign: "right", fontSize: "1.6rem", fontFamily: "Montserrat" }}>
          Don't have an account?
        </Link>
        <ChooseWay variant="login" />
        <div className="login__extra-ways" style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
          <ExtraWays variant="google" onClick={onLoginWithGoogle} />
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default Login;
