import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1234/" }),  
  endpoints: (builder) => ({
    getOtp: builder.mutation({
      query: (email) => ({
        url: 'user/signup/otp',
        method: 'POST',
        body: { email },
      }),
    }),
  }),
});

export const { useGetOtpMutation } = postsApi;
