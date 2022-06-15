import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://lookr.netlify.app/api/" }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (coords) => `posts?lat=${coords.lat}&lon=${coords.lon}`,
    }),
    postLogin: builder.query({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    postRegister: builder.query({
      query: (user) => ({
        url: "signup",
        method: "POST",
        body: user,
      }),
    }),
    getCheckMail: builder.query({
      query: (email) => ({
        url: `checkEmail?email=${email}`,
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  usePostLoginQuery,
  usePostRegisterQuery,
  useGetCheckMailQuery,
} = dataApi;
