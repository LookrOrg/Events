import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://lookr.netlify.app/api/" }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (coords) => `posts?lat=${coords.lat}&lon=${coords.lon}`,
    }),
  }),
});

export const { useGetPostsQuery } = dataApi;
