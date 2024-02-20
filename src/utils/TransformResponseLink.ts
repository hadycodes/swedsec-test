import { FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { parseNextFromLinkHeader } from "./LinkHeaderParser";

type NextParsed = {
  next: number;
  hasNext: boolean;
};
export function transformResponseArgToNext(
  defaultNext: number = 1,
  meta?: FetchBaseQueryMeta
): NextParsed {
  const link = meta?.response?.headers.get("link");
  if (link) {
    const next = parseNextFromLinkHeader(link);
    if (next) {
      try {
        let page = parseInt(
          new URL(next).searchParams.get("page") ?? `${defaultNext}`
        );
        return { next: page, hasNext: next != null };
      } catch {
        return { next: defaultNext, hasNext: false };
      }
    }
  }

  return { next: defaultNext, hasNext: false };
}
