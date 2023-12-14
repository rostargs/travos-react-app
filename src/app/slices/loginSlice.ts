import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TLogin = {
  isLogged: boolean;
  uid: string | null;
  email: string | null;
  isAdmin: boolean;
};

const initialState: TLogin = {
  isLogged: false,
  uid: null,
  email: null,
  isAdmin: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginData: (state, action: PayloadAction<TLogin>) => {
      state = action.payload;
      return state;
    },
    logOut: (state) => {
      state = {
        isAdmin: false,
        uid: null,
        email: null,
        isLogged: false,
      };
      return state;
    },
  },
});

export const { setLoginData, logOut } = loginSlice.actions;

export default loginSlice.reducer;
