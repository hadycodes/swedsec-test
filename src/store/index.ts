import {
  Action,
  Middleware,
  ThunkAction,
  combineSlices,
  configureStore,
} from "@reduxjs/toolkit";
import { apiSlice, authSlice, tokenSlice } from "./slices";
import logger from "redux-logger";

const rootReducer = combineSlices(apiSlice, authSlice, tokenSlice);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (defaultMiddleware) => {
      return defaultMiddleware().concat(
        apiSlice.middleware as Middleware,
        authSlice.middleware as Middleware,
        logger
      );
    },
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
  });

  return store;
};

export const store = makeStore();

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
