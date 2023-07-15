import React from "react";
import { StyleSheet, Text, View } from "react-native";
import sizes from "../../constants/sizes";
import {
  widthPercentage,
  heightPercentage,
} from "../../utils/functions.dimensions";
import theme from "../../constants/colors";
import FieldView from "./FieldView";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

type SecurityQuestionViewProps = {
  q: string;
  a: string;
};

const SecurityQuestionView = ({ a, q }: SecurityQuestionViewProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <FieldView
        label={t("common.form.query").toString()}
        value={q}
        leftIcon={
          <MaterialCommunityIcons
            name="chat-question"
            size={sizes.inputIcon}
            color={inputColor}
          />
        }
      />
      <FieldView
        label={t("common.form.answer").toString()}
        value={a}
        leftIcon={
          <MaterialCommunityIcons
            name="spellcheck"
            size={sizes.inputIcon}
            color={inputColor}
          />
        }
      />
    </View>
  );
};

export default SecurityQuestionView;

const inputColor = theme.soft_gray;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    borderRadius: sizes.borderRadius,
    borderWidth: 0.5,
    borderColor: inputColor,
    paddingHorizontal: widthPercentage(5),
    paddingVertical: heightPercentage(1),
    marginVertical: heightPercentage(1),
  },
});
