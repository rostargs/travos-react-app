import { UserCredential } from "firebase/auth";
import { TUser } from "../models/user.module";

export const userObj = (user: UserCredential) => {
  const { email, uid } = user.user;

  const userDefaultData: TUser = {
    email,
    uid,
    textbook: {},
    results: [],
    isAdmin: false,
  };

  return userDefaultData;
};
