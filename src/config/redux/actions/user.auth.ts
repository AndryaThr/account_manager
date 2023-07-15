import { ActionType } from "..";
import { USER_LOGIN, USER_LOGOUT } from "../types";
import { UserType } from "../../../controller/types";

const userLoginAction = (payload: UserType): ActionType => ({
  type: USER_LOGIN,
  payload,
});

const userLogoutAction = (): ActionType => ({
  type: USER_LOGOUT,
});

export { userLoginAction, userLogoutAction };
