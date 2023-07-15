import React from "react";
import {
  View,
  ViewStyle,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  TouchableHighlight,
  GestureResponderEvent,
  TextProps,
} from "react-native";
import ExtendedStyleSheet from "../styles/ExtendedStyleSheet";
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
import StyledText from "../texts/StyledText";

type FieldViewProps = {
  label?: string;
  value: string;
  selectable?: boolean;
  hidden?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
  onRightIconPress?: () => void;
};

function FieldView(props: FieldViewProps) {
  const selectatbleDefault = props.selectable ?? false;
  const hiddenDefault = props.hidden ?? false;

  const handleTextCopy = React.useCallback((e: GestureResponderEvent) => {
    if (props?.onPress) {
      e.preventDefault();
      e.stopPropagation();
      console.log("copy text into clipboard");
    }
  }, []);

  const handleRightIconPress = React.useCallback((e: GestureResponderEvent) => {
    if (props?.onRightIconPress) {
      e.preventDefault();
      e.stopPropagation();
      props.onRightIconPress();
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={handleTextCopy}
      disabled={props.onPress ? false : true}
    >
      <View style={styles.container}>
        {props.leftIcon && (
          <View
            style={[
              ExtendedStyleSheet.defaultStyles.center,
              { paddingRight: "2%" },
            ]}
          >
            {props.leftIcon}
          </View>
        )}
        {props?.label && (
          <StyledText italic textStyle={styles.labelStyle}>
            {props.label}
          </StyledText>
        )}
        <View
          style={[
            ExtendedStyleSheet.defaultStyles.flex_1,
            ExtendedStyleSheet.defaultStyles.justifyCenter,
            { paddingVertical: vScale(10) },
          ]}
        >
          <StyledText
            textStyle={styles.inputStyle}
            selectable={hiddenDefault ? false : selectatbleDefault}
          >
            {!hiddenDefault ? props.value : "****************"}
          </StyledText>
        </View>
        {props.rightIcon && (
          <TouchableOpacity
            onPress={handleRightIconPress}
            disabled={props.onRightIconPress ? false : true}
          >
            <View
              style={[
                ExtendedStyleSheet.defaultStyles.center,
                { paddingLeft: "2%" },
              ]}
            >
              {props.rightIcon}
            </View>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default FieldView;

const styles = ExtendedStyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: vScale(58),
    paddingHorizontal: hScale(12),
    borderRadius: sizes.borderRadius,
    borderWidth: 0.5,
    borderColor: theme.soft_gray,
    flex: 1,
    alignItems: "center",
    paddingLeft: "5%",
    marginVertical: heightPercentage(0.75),
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
    paddingHorizontal: widthPercentage(2),
    color: theme.soft_gray,
    marginLeft: hScale(30),
  },
});
