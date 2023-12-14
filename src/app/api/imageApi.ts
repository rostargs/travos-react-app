import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const imageApi = createApi({
  reducerPath: "image",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://text-to-image7.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", "c7c652a78bmsh1f41b9104f18116p1aa360jsneaa857005646"),
        headers.set("X-RapidAPI-Host", "text-to-image7.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getImageByWord: builder.query<string[], string>({
      query: (word) => `?prompt=${word}&batch_size=1`,
    }),
  }),
});

export const { useGetImageByWordQuery } = imageApi;
