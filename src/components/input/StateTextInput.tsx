import React from "react";
import { View, ViewStyle, TextInputProps, TextStyle } from "react-native";
import ExtendedStyleSheet from "../styles/ExtendedStyleSheet";
import { TextInput } from "react-native-element-textinput";
import {
  hScale,
  moderateScale,
  vScale,
  widthPercentage,
} from "../../utils/functions.dimensions";
import sizes from "../../constants/sizes";
import theme from "../../constants/colors";

type StateTextInputProps = {
  containerStyle?: ViewStyle;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  placeholderStyle?: TextStyle;
  textErrorStyle?: TextStyle;
  label?: string;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
  showIcon?: boolean;
  leftIcon?: () => JSX.Element;
  rightIcon?: () => JSX.Element;
  defaultValue?: string;
  value?: string;
  onChange?: (text: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
} & Omit<TextInputProps, "style" | "defaultValue" | "onChange" | "onBlur">;

function StateTextInput(props: StateTextInputProps) {
  const handleInputChange = React.useCallback(
    (text: string) => {
      if (props.onChange) {
        props.onChange(text);
      }
    },
    [props.value]
  );

  const handleInputBlur = React.useCallback(() => {
    if (props.onBlur) {
      props.onBlur();
    }
  }, []);

  return (
    <View
      style={props.containerStyle ? props.containerStyle : styles.container}
    >
      <TextInput
        value={props.defaultValue ? props.defaultValue : props.value}
        style={props?.style ? props.style : styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label={props?.value && props.value.length > 0 ? props.label : undefined}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        onChangeText={handleInputChange}
        onBlur={handleInputBlur}
        renderLeftIcon={props.leftIcon}
        renderRightIcon={props.rightIcon}
        multiline={props.multiline}
        numberOfLines={props.multiline ? props.numberOfLines : 1}
        showIcon={props.showIcon}
        editable={props.disabled}
      />
    </View>
  );
}

export default StateTextInput;

const styles = ExtendedStyleSheet.create({
  container: {
    paddingHorizontal: widthPercentage(2),
  },
  input: {
    height: vScale(60),
    paddingHorizontal: hScale(12),
    borderRadius: sizes.borderRadius,
    borderWidth: 0.5,
    borderColor: theme.soft_gray,
  },
  inputStyle: {
    fontSize: moderateScale(16),
    paddingHorizontal: widthPercentage(2),
  },
  labelStyle: {
    fontSize: moderateScale(14),
    position: "absolute",
    top: -vScale(10),
    backgroundColor: "white",
    paddingHorizontal: widthPercentage(1),
    marginLeft: widthPercentage(1),
    color: theme.soft_gray,
  },
  placeholderStyle: {
    fontSize: moderateScale(16),
    paddingHorizontal: widthPercentage(2),
  },
  textErrorStyle: {
    fontSize: moderateScale(14),
    color: theme.error,
    fontStyle: "italic",
  },
});
