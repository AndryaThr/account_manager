import React from "react";
import {
  Alert,
  ScrollView,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AppContainer from "../components/container/AppContainer";
import AppBar from "../components/appbar/AppBar";
import {
  hScale,
  heightPercentage,
  moderateScale,
  vScale,
  widthPercentage,
} from "../utils/functions.dimensions";
import { useNavigation } from "@react-navigation/native";
import theme from "../constants/colors";
import sizes from "../constants/sizes";
import { MainStackParamList } from "../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import ExtendedStyleSheet from "../components/styles/ExtendedStyleSheet";
import StyledText from "../components/texts/StyledText";
import StateTextInput from "../components/input/StateTextInput";
import { Auth } from "../controller/backend/Auth";

const ForgetPassword = () => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const { t } = useTranslation();

  const [typedWord, setTypedWord] = React.useState<string>();

  const handleNavigationAction = React.useCallback(async () => {
    navigation.popToTop();
  }, []);

  const handleResetAction = React.useCallback(async () => {
    if (typedWord) {
      if (typedWord.toLocaleLowerCase() === "ok") {
        let reset = await Auth.reset();
        if (reset.success) {
          Alert.alert(
            t("message.reset.title").toString(),
            t("message.reset.subtitle").toString(),
            [{ text: "Ok", onPress: handleNavigationAction }],
            { onDismiss: handleNavigationAction, cancelable: true }
          );
        } else {
          Alert.alert(
            t("message.error").toString(),
            t("message.error").toString(),
            [{ text: "Ok", style: "cancel" }],
            { cancelable: true }
          );
        }
      }
    }
  }, [typedWord]);

  const handleShowConfirmation = React.useCallback(() => {
    Alert.alert(
      t("message.proceed.title").toString(),
      t("message.proceed.subtitle").toString(),
      [
        { text: t("common.no").toString(), style: "cancel" },
        { text: t("common.yes").toString(), onPress: handleResetAction },
      ],
      { cancelable: true }
    );
  }, []);

  return (
    <AppContainer
      appbar={
        <AppBar
          title={t("screens.forget_pass.title").toString()}
          subtitle={t("screens.forget_pass.subtitle").toString()}
          leftIcon={
            <MaterialIcons
              name="arrow-back"
              size={sizes.icon}
              color={theme.text}
            />
          }
          onLeftIconPress={() => navigation.goBack()}
        />
      }
      height={heightPercentage(87)}
      paddingHorizontalPercentage={7}
    >
      <ScrollView contentContainerStyle={styles.scrollview}>
        <View style={styles.descriptionContainer}>
          <StyledText weight="5" textStyle={styles.descriptionTitle}>
            {t("screens.forget_pass.header")}
          </StyledText>
          <StyledText textStyle={styles.descriptionText}>
            {"\t\t\t" + t("message.caution.password_long").toString()}
          </StyledText>
          <StyledText
            textStyle={[
              styles.descriptionText,
              {
                marginTop: heightPercentage(2),
              },
            ]}
          >
            {"\t\t\t" + t("message.caution.password_long_2").toString()}
          </StyledText>
          <StyledText
            textStyle={[styles.descriptionText, styles.descriptionWarning]}
          >
            {"\t\t\t" + t("message.caution.reset_app").toString()}
          </StyledText>
        </View>
        <View style={styles.confirmationBox}>
          <StateTextInput
            label={t("screens.forget_pass.ok_label").toString()}
            placeholder={t("screens.forget_pass.ok_label").toString()}
            placeholderTextColor={inputColor}
            style={styles.input}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            containerStyle={styles.textInputContainer}
            showIcon={false}
            value={typedWord}
            onChange={(txt) => setTypedWord(txt)}
          />
        </View>
        <TouchableOpacity
          onPress={handleResetAction}
          disabled={typedWord?.toLocaleLowerCase() !== "ok"}
        >
          <View
            style={[
              styles.pressableButton,
              {
                backgroundColor:
                  typedWord?.toLocaleLowerCase() === "ok"
                    ? theme.purple
                    : theme.soft_gray,
              },
            ]}
          >
            <StyledText weight="4" textStyle={styles.pressableButtonLabel}>
              {t("common.button.validate")}
            </StyledText>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </AppContainer>
  );
};

export default ForgetPassword;

const inputColor = theme.soft_gray;

const styles = ExtendedStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollview: {
    flexGrow: 1,
  },

  /* description */
  descriptionContainer: {
    marginVertical: heightPercentage(2.5),
  },
  descriptionText: {
    textAlign: "justify",
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
  },
  descriptionTitle: {
    textAlign: "center",
    fontSize: moderateScale(22),
    marginBottom: heightPercentage(1.5),
    color: theme.purple,
  },
  descriptionWarning: {
    marginTop: heightPercentage(3),
    color: theme.warning,
  },

  /* confirmation box */
  confirmationBox: {
    width: "100%",
    marginTop: heightPercentage(2),
  },

  /* input */
  input: {
    height: vScale(62),
    paddingHorizontal: hScale(12),
    borderRadius: sizes.borderRadius,
    borderWidth: 0.5,
    borderColor: inputColor,
  },
  inputStyle: {
    fontSize: moderateScale(16),
    paddingLeft: widthPercentage(3),
  },
  labelStyle: {
    fontSize: moderateScale(20),
    position: "absolute",
    top: -vScale(10),
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
  textInputContainer: {
    width: "100%",
  },

  /* button */
  pressableButton: {
    ...ExtendedStyleSheet.defaultStyles.alignCenter,
    ...ExtendedStyleSheet.defaultStyles.justifyCenter,
    height: hScale(40),
    borderRadius: sizes.roundedRadius,
    marginTop: heightPercentage(3),
    marginBottom: heightPercentage(1),
    marginHorizontal: "15%",
  },
  pressableButtonLabel: {
    color: theme.text,
    fontSize: moderateScale(14),
  },
});
