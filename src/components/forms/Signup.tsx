import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { buttonStyles, formStyles } from "./Login";
import Input from "../../ui/Input";
import Button from "@mui/material/Button";
import ChooseWay from "./ChooseWay";
import ExtraWays from "./ExtraWays";
import { signupInputs } from "../../data/registration/signup";
import { auth } from "../../firebase";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { firebaseErrors } from "../../firebaseErrors";
import { Link, useNavigate } from "react-router-dom";
import { userObj } from "../../utils/userObj";
import { useSetUserDataMutation } from "../../app/api/userApi";
import { ToastContainer } from "react-toastify";
import { notify } from "../../pages/TestConstructor";

export type TSignupForm = {
  email: string;
  password: string;
  submit: string;
};

const Signup: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<TSignupForm>();
  const navigate = useNavigate();
  const [setUserData] = useSetUserDataMutation();

  const onCreateAccount: SubmitHandler<TSignupForm> = async (data) => {
    const { email, password, submit } = data;

    if (password !== submit) {
      setError("submit", { type: "value", message: "Passwords do not match!" }, { shouldFocus: true });
      return;
    }

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const userData = userObj(user);
      await setUserData(userData);
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
        {signupInputs.map((input, index) => {
          return (
            <Input<TSignupForm> key={index} register={register} {...input} errorMessage={errors[input.name]?.message} />
          );
        })}
        <Button variant="contained" sx={buttonStyles} onClick={handleSubmit(onCreateAccount)}>
          Sign up
        </Button>
        <Link to="/registration/login" style={{ textAlign: "right", fontSize: "1.6rem", fontFamily: "Montserrat" }}>
          Already have an account?
        </Link>
        <ChooseWay variant="signup" />
        <div className="login__extra-ways" style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
          <ExtraWays variant="google" onClick={onLoginWithGoogle} />
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default Signup;
