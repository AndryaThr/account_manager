import React from "react";
import { View, TouchableNativeFeedback } from "react-native";
import ExtendedStyleSheet from "../components/styles/ExtendedStyleSheet";
import theme from "../constants/colors";
import sizes from "../constants/sizes";
import StyledText from "../components/texts/StyledText";
import { useTranslation } from "react-i18next";
import {
  hScale,
  heightPercentage,
  moderateScale,
  widthPercentage,
} from "../utils/functions.dimensions";
import { useForm } from "react-hook-form";
import User from "../controller/database/User";

type DigitInputType = {
  digit_1: number;
  digit_2: number;
  digit_3: number;
  digit_4: number;
  digit_5: number;
  digit_6: number;
};

const inputColor = theme.soft_gray;

const ForgetPassword = () => {
  const [error, setError] = React.useState<string | null | undefined>(
    undefined
  );

  const { t } = useTranslation();

  const { control, handleSubmit } = useForm<DigitInputType>({
    mode: "onSubmit",
  });

  React.useEffect(() => {
    User.fetchAllUsername().then((val) => {
      // console.log("val : ", JSON.stringify(val, null, 4));
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={[styles.circle, styles.position1]} />
        <View style={[styles.circle, styles.position2]} />
        <View
          style={[
            ExtendedStyleSheet.defaultStyles.flex_1,
            styles.appTitleContainer,
          ]}
        >
          <StyledText textStyle={styles.appTitleLabel} weight="5">
            {t("common.app_title")}
          </StyledText>
          <StyledText textStyle={styles.appDescriptionLabel} weight="3">
            {t("common.app_description")}
          </StyledText>
        </View>
      </View>
      <View style={styles.card}>
        <View>
          <View style={styles.cardTitleContainer}>
            <StyledText textStyle={styles.cardTitle} weight="5">
              {t("screens.forget_pass.title")}
            </StyledText>
            <StyledText textStyle={styles.cardTitleDescription} weight="3">
              {t("screens.forget_pass.subtitle")}
            </StyledText>
          </View>

          <TouchableNativeFeedback>
            <View style={styles.pressableButton}>
              <StyledText weight="4" textStyle={styles.pressableButtonLabel}>
                {t("screens.auth.sign_in")}
              </StyledText>
            </View>
          </TouchableNativeFeedback>
          {error && (
            <View style={styles.errorContainer}>
              <StyledText weight="3" textStyle={styles.errorLabel} italic>
                {error}
              </StyledText>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ForgetPassword;

const styles = ExtendedStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5941A9",
  },
  background: {
    flex: 1,
  },
  card: {
    backgroundColor: theme.background,
    flex: 4,
    borderTopEndRadius: sizes.cardBorderRadius,
    borderTopStartRadius: sizes.cardBorderRadius,
    paddingHorizontal: widthPercentage(8),
    justifyContent: "space-between",
  },
  circle: {
    backgroundColor: theme.card,
    opacity: 0.2,
    width: sizes.circleSize,
    height: sizes.circleSize,
    borderRadius: sizes.circleSize / 2,
    position: "absolute",
  },
  position1: {
    top: -sizes.circleSize / 3,
    right: 0,
  },
  position2: {
    top: 0,
    right: -sizes.circleSize / 2,
  },

  /* title */
  appTitleContainer: {
    paddingHorizontal: widthPercentage(5),
    marginTop: heightPercentage(2),
  },
  appTitleLabel: {
    fontSize: moderateScale(25),
    color: theme.text,
  },
  appDescriptionLabel: {
    fontSize: moderateScale(16),
    lineHeight: moderateScale(30),
    color: theme.text,
  },

  /* card title */
  cardTitleContainer: {
    height: heightPercentage(15),
    paddingTop: heightPercentage(4),
  },
  cardTitle: {
    fontSize: moderateScale(25),
    color: theme.purple,
  },
  cardTitleDescription: {
    fontSize: moderateScale(16),
  },

  /* button */
  pressableButton: {
    ...ExtendedStyleSheet.defaultStyles.alignCenter,
    ...ExtendedStyleSheet.defaultStyles.justifyCenter,
    backgroundColor: theme.purple,
    height: hScale(50),
    borderRadius: sizes.roundedRadius,
    marginTop: heightPercentage(1),
  },
  pressableButtonLabel: {
    color: theme.text,
    fontSize: moderateScale(17),
  },

  /* error */
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: heightPercentage(3),
  },
  errorLabel: {
    color: theme.error,
  },
});
