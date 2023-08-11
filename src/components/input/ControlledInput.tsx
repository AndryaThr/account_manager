import React from "react";
import { View, ViewStyle, TextStyle, TextInputProps } from "react-native";
import ExtendedStyleSheet from "../styles/ExtendedStyleSheet";
import {
  FieldValues,
  UseControllerProps,
  useController,
  useFormContext,
} from "react-hook-form";
import { TextInput } from "react-native-element-textinput";
import {
  hScale,
  heightPercentage,
  moderateScale,
  vScale,
  widthPercentage,
} from "../../utils/functions.dimensions";
import sizes from "../../constants/sizes";
import theme from "../../constants/colors";

type ControlledInputProps<T extends FieldValues> = {
  name: string;
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
  keyboardType?: React.ComponentProps<typeof TextInput>["keyboardType"];
} & UseControllerProps<T> &
  Omit<TextInputProps, "style" | "defaultValue">;

function ControlledInput<T extends FieldValues>(
  props: ControlledInputProps<T>
) {
  const { field, fieldState } = useController<T>({
    defaultValue: props?.defaultValue,
    control: props.control,
    name: props.name,
    rules: props.rules,
  });

  return (
    <View
      style={props.containerStyle ? props.containerStyle : styles.container}
    >
      <TextInput
        value={props.defaultValue ? props.defaultValue : field.value}
        style={props?.containerStyle ? props.style : styles.input}
        inputStyle={props?.inputStyle ? props.inputStyle : styles.inputStyle}
        labelStyle={props?.labelStyle ? props.labelStyle : styles.labelStyle}
        placeholderStyle={
          props?.placeholderStyle
            ? props.placeholderStyle
            : styles.placeholderStyle
        }
        textErrorStyle={
          props?.textErrorStyle ? props.textErrorStyle : styles.textErrorStyle
        }
        label={field?.value && field.value.length > 0 ? props.label : undefined}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        textError={fieldState?.error?.message}
        renderLeftIcon={props.leftIcon}
        renderRightIcon={props.rightIcon}
        multiline={props.multiline}
        secureTextEntry={props.secureTextEntry}
        numberOfLines={props.multiline ? props.numberOfLines : 1}
        showIcon={props.showIcon}
        editable={props.editable ?? true}
        keyboardType={props.keyboardType ?? undefined}
      />
    </View>
  );
}

export default ControlledInput;

const styles = ExtendedStyleSheet.create({
  container: {
    marginHorizontal: widthPercentage(3),
    marginVertical: heightPercentage(1),
  },
  input: {
    height: vScale(70),
    paddingHorizontal: hScale(12),
    borderRadius: sizes.borderRadius,
    borderWidth: 0.5,
  },
  inputStyle: { fontSize: moderateScale(16) },
  labelStyle: {
    fontSize: moderateScale(14),
    position: "absolute",
    top: -vScale(10),
    backgroundColor: "white",
    paddingHorizontal: widthPercentage(1),
    marginLeft: widthPercentage(1),
  },
  placeholderStyle: { fontSize: moderateScale(16) },
  textErrorStyle: {
    fontSize: moderateScale(14),
    color: theme.error,
    fontStyle: "italic",
  },
});
