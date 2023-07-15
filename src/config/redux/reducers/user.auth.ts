import { ActionType, StateType } from "..";
import { initialValue } from "../data";
import { USER_LOGIN, USER_LOGOUT } from "../types";

export default function authReducer(state = initialValue, action: ActionType) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        user: undefined,
      };
    default:
      return state;
  }
}
