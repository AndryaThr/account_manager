import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import appReducer from "./reducers";
import { useAppDispatch, useAppSelector } from "./hooks";
import { UserType } from "../../controller/types";
import loadingReducer from "./reducers/loading";
import authReducer from "./reducers/user.auth";

const store = configureStore({
  reducer: appReducer,
  enhancers: [applyMiddleware(thunk)],
});

type RootState = ReturnType<typeof appReducer>;
type AppDispatch = typeof store.dispatch;

type ActionType = {
  type: string;
  payload?: any;
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
