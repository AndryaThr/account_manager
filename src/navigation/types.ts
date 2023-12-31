import { RouteProp } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { AccountFormValues } from "../screens/types";

type MainStackParamList = {
  auth: undefined;
  reset_pass: undefined;
  home: undefined;
  add_account: {
    title: string;
    subtitle: string;
    account_id?: number;
    account_info?: AccountFormValues;
  };
  details_account: {
    account_id: number;
  };
  protected_action: {
    action: () => void | Promise<void>;
  };
  create_user: undefined;
  add_digit: {
    user_data: {
      name: string;
      first_name: string;
      password: string;
      private_key: string;
    };
    digit?: string;
  };
  settings: undefined;
};

// with usenavigation
type MainStackScreenNavigationProps<T extends keyof MainStackParamList> =
  StackScreenProps<MainStackParamList, T>;

// with useroute
type MainStackScreenRouteProp<T extends keyof MainStackParamList> = RouteProp<
  MainStackParamList,
  T
>;

export {
  MainStackParamList,
  MainStackScreenNavigationProps,
  MainStackScreenRouteProp,
};
