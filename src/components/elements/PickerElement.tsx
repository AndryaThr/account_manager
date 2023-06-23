import React from "react";
import {
  GestureResponderEvent,
  TouchableNativeFeedback,
  View,
} from "react-native";
import {
  heightPercentage,
  widthPercentage,
} from "../../utils/functions.dimensions";
import StyledText from "../texts/StyledText";
import ExtendedStyleSheet from "../styles/ExtendedStyleSheet";

type PickerElementProps = {
  id: number;
  label: string;
  onLabelPress: (id: number, label: string) => void;
};

const PickerElement = (props: PickerElementProps) => {
  const handlePress = React.useCallback(() => {
    props.onLabelPress(props.id, props.label);
  }, []);

  return (
    <TouchableNativeFeedback onPress={handlePress}>
      <View style={styles.container}>
        <StyledText weight="4">{props.label}</StyledText>
      </View>
    </TouchableNativeFeedback>
  );
};

export default PickerElement;

const styles = ExtendedStyleSheet.create({
  container: {
    height: heightPercentage(5),
    justifyContent: "center",
    paddingHorizontal: widthPercentage(8),
  },
});
