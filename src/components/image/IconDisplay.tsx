import React from "react";
import { Image } from "react-native";
import ExtendedStyleSheet from "../styles/ExtendedStyleSheet";

const IconDisplay = ({
  icon_path,
  image_label,
  width,
}: {
  icon_path: string;
  image_label?: string;
  width?: string | number;
}) => {
  return (
    <Image
      source={{
        uri: `data:image/png;base64,${icon_path}`,
      }}
      style={[
        styles.image,
        width ? { width } : ExtendedStyleSheet.defaultStyles.full_width,
      ]}
      resizeMode="contain"
      accessibilityLabel={image_label}
    />
  );
};

export default IconDisplay;

const styles = ExtendedStyleSheet.create({
  image: {
    ...ExtendedStyleSheet.defaultStyles.flex_1,
  },
});
