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
  vScale,
  widthPercentage,
} from "../utils/functions.dimensions";
import { useForm } from "react-hook-form";
import ControlledInput from "../components/input/ControlledInput";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { validateUsername } from "../utils/functions.string";
import { Auth } from "../controller/backend/Auth";
import Loader from "../components/loader/Loader";
import { useAppDispatch } from "../config/redux";
import { userLoginAction } from "../config/redux/actions";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { MainStackParamList } from "../navigation/types";
import AppContainer from "../components/container/AppContainer";
import AppBar from "../components/appbar/AppBar";

type LoginFormValues = {
  username: string;
  password: string;
};

const inputColor = theme.soft_gray;

const AuthScreen = () => {
  const [showSecuredText, setShowSecuredText] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null | undefined>(
    undefined
  );

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  const { control, handleSubmit } = useForm<LoginFormValues>({
    mode: "onSubmit",
  });

  const handleAuth = React.useCallback(async (data: LoginFormValues) => {
    setLoading(true);
    setError(null);

    try {
      let username = data.username;
      let password = data.password;

      const auth = await Auth.authUser(username, password);
      if (auth.success) {
        dispatch(userLoginAction(auth.data));
      } else {
        setError(t("message.errors.login_error").toString());
      }
    } catch (error) {
      console.log("error : ", JSON.stringify(error, null, 4));
      setError(t("message.error").toString());
    } finally {
      setLoading(false);
    }
  }, []);

  const handleShowPasswordAction = React.useCallback(() => {
    setShowSecuredText((p) => !p);
  }, []);

  const handleForgetPasswordAction = React.useCallback(() => {
    navigation.navigate("reset_pass");
  }, []);

  const handleNewAccountAction = React.useCallback(() => {
    console.log("====================================");
    console.log("pressed");
    console.log("====================================");
  }, []);

  return (
    <AppContainer
      appbar={
        <AppBar
          title={t("common.app_title")}
          subtitle={t("common.app_description")}
        />
      }
    >
      <View>
        <View style={styles.cardTitleContainer}>
          <StyledText textStyle={styles.cardTitle} weight="5">
            {t("screens.auth.welcome")}
          </StyledText>
          <StyledText textStyle={styles.cardTitleDescription} weight="3">
            {t("screens.auth.welcome_description")}
          </StyledText>
        </View>
        <ControlledInput
          name={"username"}
          control={control}
          leftIcon={() => (
            <MaterialIcons name="person" size={25} color={inputColor} />
          )}
          containerStyle={styles.containerStyle}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          placeholder={t("screens.auth.username").toString()}
          label={t("screens.auth.username").toString()}
          placeholderTextColor={inputColor}
          showIcon={false}
          rules={{
            required: true || t("message.errors.required").toString(),
            validate: {
              invalid: (str) =>
                validateUsername(str) ||
                t("message.errors.username").toString(),
            },
          }}
          defaultValue="andrya.thr"
        />
        <ControlledInput
          name={"password"}
          control={control}
          leftIcon={() => (
            <MaterialIcons name="lock" size={25} color={inputColor} />
          )}
          rightIcon={() => (
            <Ionicons
              name={showSecuredText ? "eye" : "eye-off"}
              size={25}
              color={inputColor}
              onPress={handleShowPasswordAction}
            />
          )}
          containerStyle={styles.containerStyle}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          placeholder={t("screens.auth.password").toString()}
          label={t("screens.auth.password").toString()}
          placeholderTextColor={inputColor}
          secureTextEntry={!showSecuredText}
          rules={{
            required: true || t("message.errors.required").toString(),
          }}
          defaultValue="password"
        />
        <View style={styles.forgetPassContainer}>
          <StyledText
            onPress={handleForgetPasswordAction}
            textStyle={styles.forgetPassLabel}
            weight="4"
            italic
          >
            {t("screens.auth.forget_pass")}
          </StyledText>
        </View>
        <TouchableNativeFeedback onPress={handleSubmit(handleAuth)}>
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
      {loading && <Loader color={theme.error} />}

      <View style={styles.createAccountContainer}>
        <StyledText
          onPress={handleNewAccountAction}
          textStyle={styles.createAccountLabel}
        >
          {t("screens.auth.create_account")}
        </StyledText>
      </View>
    </AppContainer>
  );
};

export default AuthScreen;

const styles = ExtendedStyleSheet.create({
  /* input */
  containerStyle: {
    marginTop: heightPercentage(1),
    marginBottom: heightPercentage(1),
  },
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
    fontSize: moderateScale(14),
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

  /* forget password */
  forgetPassContainer: {
    ...ExtendedStyleSheet.defaultStyles.justifyCenter,
    height: heightPercentage(5),
  },
  forgetPassLabel: {
    fontSize: moderateScale(14),
    color: theme.purple,
  },

  /* create account */
  createAccountContainer: {
    ...ExtendedStyleSheet.defaultStyles.alignCenter,
    ...ExtendedStyleSheet.defaultStyles.justifyCenter,
    height: heightPercentage(15),
  },
  createAccountLabel: {
    color: theme.blue,
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
