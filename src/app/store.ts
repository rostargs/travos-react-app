import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import questionSlice from "./slices/questionSlice";
import constructorErrorSlice from "./slices/constructorErrorSlice";
import loginSlice from "./slices/loginSlice";
import { imageApi } from "./api/imageApi";
import { wordsApi } from "./api/wordsApi";
import { testApi } from "./api/testApi";
import { userApi } from "./api/userApi";

export const store = configureStore({
  reducer: {
    questionConstructor: questionSlice,
    constructorError: constructorErrorSlice,
    login: loginSlice,
    [imageApi.reducerPath]: imageApi.reducer,
    [wordsApi.reducerPath]: wordsApi.reducer,
    [testApi.reducerPath]: testApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(imageApi.middleware, wordsApi.middleware, testApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
