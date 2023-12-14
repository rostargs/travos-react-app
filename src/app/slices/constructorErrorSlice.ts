import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TConstructorForm = {
  errorForm: boolean | null;
};

const initialState: TConstructorForm = {
  errorForm: null,
};

const constructorErrorSlice = createSlice({
  name: "constructorError",
  initialState,
  reducers: {
    setFormStatus: (state, action: PayloadAction<boolean>) => {
      state.errorForm = action.payload;
    },
  },
});

export const {setFormStatus} = constructorErrorSlice.actions

export default constructorErrorSlice.reducer
