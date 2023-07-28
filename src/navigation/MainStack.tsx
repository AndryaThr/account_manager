import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AuthScreen from "../screens/AuthScreen";
import HomeScreen from "../screens/HomeScreen";
import { StateType, useAppSelector } from "../config/redux";
import ForgetPassword from "../screens/ForgetPassword";
import { MainStackParamList } from "./types";
import AccountForm from "../screens/AccountForm";
import AccountDetails from "../screens/AccountDetails";
import ProtectedAction from "../screens/ProtectedAction";
import CreateUser from "../screens/CreateUser";
import AddDigit from "../screens/AddDigit";
import AccountSettings from "../screens/AccountSettings";

const Stack = createStackNavigator<MainStackParamList>();

const MainStack = () => {
  const { user } = useAppSelector<StateType>((state) => state.authReducer);

  return (
    <Stack.Navigator
      initialRouteName="auth"
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
    >
      {!user ? (
        <Stack.Group>
          <Stack.Screen name="auth" component={AuthScreen} />
          <Stack.Screen name="reset_pass" component={ForgetPassword} />
          <Stack.Screen name="create_user" component={CreateUser} />
          <Stack.Screen name="add_digit" component={AddDigit} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="add_account" component={AccountForm} />
          <Stack.Screen name="details_account" component={AccountDetails} />
          <Stack.Screen name="settings" component={AccountSettings} />
        </Stack.Group>
      )}
      <Stack.Screen name="protected_action" component={ProtectedAction} />
    </Stack.Navigator>
  );
};

export default MainStack;
