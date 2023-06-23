import { RouteProp } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

type MainStackParamList = {
  auth: undefined;
  reset_pass: undefined;
  home: undefined;
  add_account: undefined;
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
