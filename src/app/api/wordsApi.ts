import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "../../models/word.module";

export const wordsApi = createApi({
  reducerPath: "words",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.dictionaryapi.dev/api/v2/entries/en/",
  }),
  endpoints: (builder) => ({
    getWord: builder.query<Array<ApiResponse>, string>({
      query: (word) => word,
    }),
  }),
});

export const { useGetWordQuery } = wordsApi;
