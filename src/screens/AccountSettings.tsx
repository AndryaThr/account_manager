import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AccountSettings = () => {
  return (
    <View style={styles.container}>
      <Text>Account settings</Text>
    </View>
  );
};

export default AccountSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
