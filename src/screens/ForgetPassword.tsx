import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ForgetPassword = () => {
  return (
    <View style={styles.container}>
      <Text>ForgetPassword</Text>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
