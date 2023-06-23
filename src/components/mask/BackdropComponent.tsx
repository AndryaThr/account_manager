import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ExtendedStyleSheet from "../styles/ExtendedStyleSheet";
import theme from "../../constants/colors";

type BackdropComponentProps = {
  onBackdropPress: () => void;
};

const BackdropComponent = ({ onBackdropPress }: BackdropComponentProps) => {
  return <Pressable style={styles.mask} onPress={onBackdropPress} />;
};

export default BackdropComponent;

const styles = ExtendedStyleSheet.create({
  mask: {
    ...ExtendedStyleSheet.absoluteFillObject,
    backgroundColor: theme.backdrop,
    opacity: 0.6,
  },
});
