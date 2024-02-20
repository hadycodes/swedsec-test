import { AppStore, store } from "./../../index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../index";
import { useSelector } from "react-redux";
import { GUEST_TOKEN } from "../../../const";
import { Search, User, UserResponse } from "./users/types";
import { usersApi } from "./users";

//empty to inject to the api endpoints later.
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com/",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.token.token;
      if (token !== null && token !== GUEST_TOKEN) {
        headers.set("authorization", `Bearer ${token}`);
      }

      headers.set("ACCEPT", "application/json");
      return headers;
    },
  }),

  reducerPath: "github",
  tagTypes: ["github"],

  endpoints: (builder) => ({}),
});
