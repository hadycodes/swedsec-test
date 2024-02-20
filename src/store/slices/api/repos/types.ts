import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { User } from "../users/types";

export type Repo = {
  id: number;
  name: string;
  full_name: string;
  owner: User;
  html_url: string;
  description: null | string;
  TYPE: "REPO";
};

export type Repos = Repo[];

export type ReposResponse = {
  next: number;
  hasNext: boolean;
  repos: Repos;
};
