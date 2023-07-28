import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import ExtendedStyleSheet from "../styles/ExtendedStyleSheet";
import theme from "../../constants/colors";

type LoaderProps = {
  color?: string;
  size?: number | "large" | "small" | undefined;
  height?: number;
};

const Loader = ({ color, size, height }: LoaderProps) => {
  return (
    <View style={[styles.container, height ? { height: height } : { flex: 1 }]}>
      <ActivityIndicator size={size ?? "large"} color={color ?? theme.blue} />
    </View>
  );
};

export default Loader;

const styles = ExtendedStyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.background,
  },
});
