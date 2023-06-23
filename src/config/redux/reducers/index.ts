import { combineReducers } from "redux";
import loadingReducer from "./loading";
import authReducer from "./user.auth";

const appReducer = combineReducers({
  loadingReducer,
  authReducer,
});

export default appReducer;
