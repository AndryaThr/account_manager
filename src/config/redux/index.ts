import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import appReducer from "./reducers";
import { useAppDispatch, useAppSelector } from "./hooks";
import { UserType } from "../../controller/types";

const store = configureStore({
  reducer: appReducer,
  enhancers: [applyMiddleware(thunk)],
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

type ActionType<T> = {
  type: string;
  payload?: T;
};

type StateType = {
  loadingState?: boolean;
  user?: UserType;
};

export {
  RootState,
  AppDispatch,
  ActionType,
  StateType,
  useAppDispatch,
  useAppSelector,
};

export default store;
