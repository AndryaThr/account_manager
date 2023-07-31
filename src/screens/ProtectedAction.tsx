import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import ProtectedContainer from "../components/container/ProtectedContainer";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { MainStackScreenRouteProp } from "../navigation/types";
import { VerificationValueContext } from "../components/container/context";

const ProtectedAction = () => {
  const { params } = useRoute<MainStackScreenRouteProp<"protected_action">>();
  const isVerified = React.useContext(VerificationValueContext);
  const navigation = useNavigation();

  const action = React.useCallback(async () => {
    await params.action();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (isVerified) {
        action()
          .then(() => {
            console.log("<.> protected action done");
          })
          .catch((err) => {
            Alert.alert(err.message, err + "\n" + JSON.stringify(err, null, 4));
          });

        navigation.goBack();
      }
    }, [])
  );

  return <ProtectedContainer>{null}</ProtectedContainer>;
};

export default ProtectedAction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
