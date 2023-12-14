import { TLoginForm } from "../../components/forms/Login";
import { THookProps } from "../../ui/Input";

export const loginInputs: THookProps<TLoginForm>[] = [
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
  ];