import React from "react";
import { StyleSheet, Text, View } from "react-native";
import theme from "../../constants/colors";
import { moderateScale } from "../../utils/functions.dimensions";

const Divider = () => {
  return <View style={styles.container} />;
};

export default Divider;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: 0.5,
    backgroundColor: theme.soft_gray,
    marginVertical: moderateScale(1),
  },
});
