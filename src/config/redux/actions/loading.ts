import { ActionType } from "..";
import { LOADING_STATE } from "../types";

const toggleLoadingAction = (payload: boolean): ActionType => ({
  type: LOADING_STATE,
  payload,
});

export default toggleLoadingAction;
