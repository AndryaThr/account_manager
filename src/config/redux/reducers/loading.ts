import { ActionType, StateType } from "..";
import { LOADING_STATE } from "../types";
import { initialValue } from "../data";

export default function loadingReducer(
  state = initialValue,
  action: ActionType
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
