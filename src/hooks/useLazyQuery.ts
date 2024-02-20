import { SearchTypes } from "../components/home/SearchInput";
import { useEffect, useState } from "react";
import { Search, UserResponse } from "../store/slices/api/users/types";
import { useLazyGetUsersQuery } from "src/store/slices/api/users";
import { useLazyGetReposQuery } from "src/store/slices/api/repos";
import { ReposResponse } from "src/store/slices/api/repos/types";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface ItemResult {
  data?: UserResponse | ReposResponse;
  isError: boolean;
  isLoading: boolean;
  isFetching: boolean;
  error?: FetchBaseQueryError | SerializedError | undefined;
}

export const initData: ItemResult = {
  isError: false,
  isLoading: false,
  isFetching: false,
};

export const useLazyItemQuery = (): [
  (search: Search & { searchType: SearchTypes }) => void,
  ItemResult
] => {
  const [fetchUsers, userResults] = useLazyGetUsersQuery();
  const [fetchRepos, reposResults] = useLazyGetReposQuery();
  const [itemResult, setItemsResult] = useState<ItemResult>(initData);

  const fetchData = (search: Search & { searchType: SearchTypes }) =>
    search.searchType == SearchTypes.Repos
      ? fetchRepos(search, true)
      : fetchUsers(search, true);

  useEffect(() => {
    setItemsResult({...reposResults, ...{TYPE: "REPO"}});
  }, [reposResults]);
  useEffect(() => {

    setItemsResult({...userResults, ...{TYPE: "USER"}});
  }, [userResults]);

  return [fetchData, itemResult];
};
