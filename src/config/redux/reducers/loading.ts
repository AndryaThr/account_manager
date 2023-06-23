import { ActionType, StateType } from "..";
import { LOADING_STATE } from "../types";
import { initialValue } from "../data";

export default function loadingReducer<T>(
  state: StateType = initialValue,
  action: ActionType<T>
) {
  switch (action.type) {
    case LOADING_STATE:
      return {
        ...state,
        loadingState: action.payload,
      };
    default:
      return state;
  }
}
