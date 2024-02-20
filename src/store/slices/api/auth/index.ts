import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Token = {
  access_token: string;
  token_type: string;
};

const _Client = (code: any) => {
  return {
    code: code,
    client_id: "32461a8baf806363ecf4",
    client_secret: "88d02b288ffcce0be5682050ff61b903e623ebdc",
  };
};

//TODO: CREATE simple proxy server
//github oauth doesn't allow CORS for client application, I need a server,
//very risky and unsecure to use cors anywhere, https://stackoverflow.com/a/42150336
//
export const authSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://cors-anywhere.herokuapp.com/https://github.com/",
    headers: {
        Accept: "application/json",
        "x-requested-with": "redux",
        "origin": "swedsec_test"
    }
  }),
  reducerPath: "Auth",
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    getToken: builder.query<Token, string>({
      query: (body) => ({
        url: "/login/oauth/access_token",
        headers: { ACCEPT: "application/json" },
        method: "POST",
        body: _Client(body),
      }),
    }),
  }),
});

export const { useGetTokenQuery } = authSlice;
