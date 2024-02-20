import { apiSlice } from "..";
import { parseNextFromLinkHeader } from "src/utils/LinkHeaderParser";
import { Profile, Search } from "../users/types";
import { Repos, ReposResponse } from "./types";
import { transformResponseArgToNext } from "src/utils/TransformResponseLink";

export const reposApi = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["Repos"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getRepos: builder.query<ReposResponse, Search>({
        transformResponse: (result: { items: Repos }, meta, args) => {
          return {
            repos: result.items.map((r) => {
              r.TYPE = "REPO";
              return r;
            }),

            ...transformResponseArgToNext(args.page, meta),
          };
        },
        query: (search) => ({
          url: `search/repositories?q=${search.query}&page=${search.page}`,
        }),
      }),
      getRepo: builder.query<Profile, string>({
        query: (repoId) => `/repositories/${repoId}`,
      }),
    }),
    overrideExisting: true,
  });

export const { useGetReposQuery, useGetRepoQuery } = reposApi;
export const { useLazyGetReposQuery, useLazyGetRepoQuery } = reposApi;
