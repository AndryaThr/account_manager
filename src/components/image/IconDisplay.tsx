import React from "react";
import { Image } from "react-native";
import ExtendedStyleSheet from "../styles/ExtendedStyleSheet";

const IconDisplay = ({
  icon_path,
  image,
  width,
}: {
  icon_path: string;
  image?: string;
  width?: string | number;
}) => {
  return (
    <Image
      source={{
        uri: icon_path,
      }}
      style={[
        styles.image,
        width ? { width } : ExtendedStyleSheet.defaultStyles.full_width,
      ]}
      resizeMode="contain"
      accessibilityLabel={image}
    />
  );
};

export default IconDisplay;

const styles = ExtendedStyleSheet.create({
  image: {
    ...ExtendedStyleSheet.defaultStyles.flex_1,
  },
});
