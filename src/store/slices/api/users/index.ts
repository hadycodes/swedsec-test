import { apiSlice } from "..";
import { Profile, Search, UserResponse, Users } from "./types";
import { transformResponseArgToNext } from "src/utils/TransformResponseLink";

export const usersApi = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["Users"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUsers: builder.query<UserResponse, Search>({
        transformResponse: (result: { items: Users }, meta, args) => {
          return {
            users: result.items.map((u) => {
              u.TYPE = "USER";
              return u;
            }),

            ...transformResponseArgToNext(args.page, meta),
          };
        },
        query: (search) => ({
          url: `search/users?q=${search.query}&page=${search.page}`,
          headers: { ACCEPT: "application/json" },
        }),
      }),
      getUser: builder.query<Profile, string>({
        query: (userId) => `/users/${userId}`,
      }),
    }),
    overrideExisting: true,
  });

//get users
export const { useGetUsersQuery, useLazyGetUsersQuery } = usersApi;
//get single user
export const { useGetUserQuery, useLazyGetUserQuery } = usersApi;
