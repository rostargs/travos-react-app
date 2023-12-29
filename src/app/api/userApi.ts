import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { TResult, TUser } from "../../models/user.module";
import { ApiResponse } from "../../models/word.module";
import { insertionSort } from "../../utils/insertionSort";

export type TAddWord = {
  userID: string;
  word: string;
  wordData: ApiResponse[];
};

export type TRemoveWord = Omit<TAddWord, "wordData">;
export type TSetResult = {
  userID: string;
  testInfo: TResult;
};

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Users", "Words", "Results"],
  endpoints: (builder) => ({
    setUserData: builder.mutation<null, TUser>({
      queryFn: async (user) => {
        try {
          await setDoc(doc(db, "users", user.uid), { ...user });
          return { data: null };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Users"],
    }),
    getUserTextbook: builder.query<Record<string, ApiResponse[]>, string>({
      queryFn: async (userID) => {
        try {
          const textbookRef = doc(db, "users", userID);
          const userData = (await getDoc(textbookRef)).data() as TUser;
          const sortedTexbook = insertionSort(userData.textbook);
          return { data: sortedTexbook };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      providesTags: ["Words"],
    }),
    addWordToTheTextbook: builder.mutation<null, TAddWord>({
      queryFn: async ({ userID, word, wordData }) => {
        try {
          const userRef = doc(db, "users", userID);
          const textbook = (await getDoc(userRef)).data() as TUser;

          const textbookMap = new Map(Object.entries(textbook.textbook));
          textbookMap.set(word, wordData);

          const objectToSend = { ...textbook, textbook: Object.fromEntries(textbookMap) };
          await setDoc(userRef, objectToSend);
          return { data: null };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Words"],
    }),
    removeWordFromTextbook: builder.mutation<null, TRemoveWord>({
      queryFn: async ({ userID, word }) => {
        try {
          const userRef = doc(db, "users", userID);

          const textbook = (await getDoc(userRef)).data() as TUser;
          const textbookMap = new Map(Object.entries(textbook.textbook));

          textbookMap.delete(word);
          const objectToSend = { ...textbook, textbook: Object.fromEntries(textbookMap) };
          await setDoc(userRef, objectToSend);
          return { data: null };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Words"],
    }),
    setTestResult: builder.mutation<null, TSetResult>({
      queryFn: async ({ userID, testInfo }) => {
        try {
          const userRef = doc(db, "users", userID);
          const userData = (await getDoc(userRef)).data() as TUser;

          const oldResults = userData.results || [];
          const newResults = [...oldResults, testInfo];

          await setDoc(userRef, { ...userData, results: newResults });

          return { data: null };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Results"],
    }),
    getUserData: builder.mutation<TUser, string>({
      queryFn: async (userID) => {
        try {
          const userRef = doc(db, "users", userID);
          const userData = (await getDoc(userRef)).data() as TUser;
          return { data: userData as TUser };
        } catch (error: any) {
          return { error: error.message };
        }
      },
    }),
    getUserResults: builder.query<TResult[], string>({
      queryFn: async (userID) => {
        try {
          const userRef = doc(db, "users", userID);
          const userData = (await getDoc(userRef)).data() as TUser;

          return { data: userData.results };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      providesTags: ["Results"],
    }),
  }),
});

export const {
  useSetUserDataMutation,
  useGetUserTextbookQuery,
  useAddWordToTheTextbookMutation,
  useRemoveWordFromTextbookMutation,
  useSetTestResultMutation,
  useGetUserDataMutation,
  useGetUserResultsQuery,
} = userApi;
