import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { RootState, useAppDispatch, useAppSelector } from "../app/store";
import { setLoginData } from "../app/slices/loginSlice";
import { useGetUserDataMutation } from "../app/api/userApi";
import { TUser } from "../models/user.module";

export const useAuth = () => {
  const { isLogged, uid, email, isAdmin } = useAppSelector((state: RootState) => state.login);
  const [getUserData] = useGetUserDataMutation();
  const [loading, setLoading] = React.useState<boolean>(true);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        const userInfo: { data: TUser } | { error: unknown } = await getUserData(user.uid);
        const userData = {
          uid: user.uid,
          email: user.email,
          isLogged: !!user || false,
          isAdmin: (userInfo as { data: TUser }).data ? (userInfo as { data: TUser }).data.isAdmin : false,
        };
        dispatch(setLoginData(userData));

        setLoading(false);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  return { isLogged, uid, email, loading, isAdmin };
};
