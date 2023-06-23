import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AuthScreen from "../screens/AuthScreen";
import HomeScreen from "../screens/HomeScreen";
import { useAppSelector } from "../config/redux";
import ForgetPassword from "../screens/ForgetPassword";
import { MainStackParamList } from "./types";
import AccountForm from "../screens/AccountForm";

const Stack = createStackNavigator<MainStackParamList>();

const MainStack = () => {
  const { user } = useAppSelector((state) => state.authReducer);

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
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="add_account" component={AccountForm} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default MainStack;
