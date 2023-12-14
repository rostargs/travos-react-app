import { TSignupForm } from "../../components/forms/Signup";
import { THookProps } from "../../ui/Input";

export const signupInputs: THookProps<TSignupForm>[] = [
    {
      label: "Email",
      icon: "account",
      required: {
        value: true,
        message: "This field is required!",
      },
      pattern: {
        value:
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        message: "The email is incorrect!",
      },
      name: "email",
      type: "email",
    },
    {
      label: "Password",
      icon: "password",
      required: {
        value: true,
        message: "This field is required!",
      },
      pattern: {
        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
        message: "The password is invalid!",
      },
      name: "password",
      maxLength: {
        value: 16,
        message: "Max.lenght is 16 symbols!",
      },
      minLength: {
        value: 8,
        message: "Min.lenght is 8 symbols!",
      },
      type: "password",
    },
    {
        label: "submit",
        icon: "password",
        required: {
          value: true,
          message: "This field is required!",
        },
        name: "submit",
        maxLength: {
          value: 16,
          message: "Max.lenght is 16 symbols!",
        },
        minLength: {
          value: 8,
          message: "Min.lenght is 8 symbols!",
        },
        type: "password",
      },
  ];