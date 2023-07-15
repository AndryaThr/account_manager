import React from "react";
import {
  TextStyle,
  TouchableHighlight,
  View,
  ViewStyle,
  Alert,
} from "react-native";
import ExtendedStyleSheet from "../styles/ExtendedStyleSheet";
import {
  FieldValues,
  Path,
  PathValue,
  UseControllerProps,
  UseFieldArrayProps,
  useController,
  useFieldArray,
} from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../../constants/colors";
import sizes from "../../constants/sizes";
import {
  heightPercentage,
  vScale,
  hScale,
  moderateScale,
  widthPercentage,
} from "../../utils/functions.dimensions";
import { Entypo } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import ControlledInput from "./ControlledInput";

type ControlledSecurityQuestionProps<T extends FieldValues> = {
  containerStyle?: ViewStyle;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  placeholderStyle?: TextStyle;
  textErrorStyle?: TextStyle;

  leftIcon?: () => JSX.Element;
  rightIcon?: () => JSX.Element;

  onCrossPress: (arg0: number) => void;
  arrayId: number;
} & Omit<UseControllerProps<T>, "rules">;

const crossSize = widthPercentage(6);

function ControlledSecurityQuestion<T extends FieldValues>(
  props: ControlledSecurityQuestionProps<T>
) {
  const { t } = useTranslation();

  const handleCrossButtonAction = React.useCallback(() => {
    Alert.alert(
      t("message.delete.title").toString(),
      t("message.delete.description").toString(),
      [
        {
          text: t("common.button.no").toString(),
          onPress: () => {},
        },
        {
          text: t("common.button.yes").toString(),
          onPress: () => {
            props.onCrossPress(props.arrayId);
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  }, []);

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.absoluteIcon}
        onPress={handleCrossButtonAction}
      >
        <Entypo name="cross" size={sizes.inputIcon} color={theme.background} />
      </TouchableHighlight>
      <ControlledInput
        name={`${props.name}.question` as Path<T>}
        control={props.control}
        style={styles.input}
        containerStyle={styles.containerStyle}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        showIcon={false}
        leftIcon={() => (
          <MaterialCommunityIcons
            name="chat-question"
            size={sizes.inputIcon}
            color={inputColor}
          />
        )}
        placeholder={t("common.form.placeholder_query").toString()}
        label={t("common.form.query").toString()}
        placeholderTextColor={inputColor}
        rules={{
          required: false || t("message.errors.required").toString(),
        }}
        multiline
      />
      <ControlledInput
        name={`${props.name}.answer` as Path<T>}
        control={props.control}
        style={styles.input}
        containerStyle={styles.containerStyle}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        showIcon={false}
        leftIcon={() => (
          <MaterialCommunityIcons
            name="spellcheck"
            size={sizes.inputIcon}
            color={inputColor}
          />
        )}
        placeholder={t("common.form.placeholder_answer").toString()}
        label={t("common.form.answer").toString()}
        placeholderTextColor={inputColor}
        rules={{
          required: false || t("message.errors.required").toString(),
        }}
        multiline
      />
    </View>
  );
}

export default ControlledSecurityQuestion;

const inputColor = theme.soft_gray;

const styles = ExtendedStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    justifyContent: "center",
    borderRadius: sizes.borderRadius,
    borderWidth: 0.5,
    borderColor: inputColor,
    paddingHorizontal: widthPercentage(5),
    paddingVertical: heightPercentage(1),
    marginVertical: heightPercentage(1),
  },

  /* input */
  containerStyle: {
    marginTop: heightPercentage(1),
    marginBottom: heightPercentage(1),
  },
  input: {
    minHeight: heightPercentage(7),
    paddingHorizontal: "5%",
    borderRadius: sizes.borderRadius,
    borderWidth: 0.5,
    borderColor: inputColor,
    paddingVertical: vScale(10),
  },
  inputStyle: {
    fontSize: moderateScale(16),
    paddingLeft: widthPercentage(3),
  },
  labelStyle: {
    fontSize: moderateScale(14),
    position: "absolute",
    top: -vScale(20),
    backgroundColor: "white",
    paddingHorizontal: widthPercentage(1),
    color: inputColor,
  },
  placeholderStyle: {
    fontSize: moderateScale(16),
    color: inputColor,
  },
  textErrorStyle: {
    fontSize: moderateScale(14),
    color: theme.error,
    fontStyle: "italic",
  },

  /* button */
  absoluteIcon: {
    position: "absolute",
    top: -crossSize / 2,
    right: crossSize,
    borderRadius: crossSize / 2,
    backgroundColor: theme.error,
    ...ExtendedStyleSheet.defaultStyles.center,
  },
});
