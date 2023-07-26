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
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import { validateUsername } from "../utils/functions.string";
import { Auth } from "../controller/backend/Auth";
import Loader from "../components/loader/Loader";
import { useAppDispatch } from "../config/redux";
import {
  useNavigation,
  NavigationProp,
  useFocusEffect,
} from "@react-navigation/native";
import { MainStackParamList } from "../navigation/types";
import AppContainer from "../components/container/AppContainer";
import AppBar from "../components/appbar/AppBar";
import User from "../controller/database/User";

type LoginFormValues = {
  name: string;
  first_name: string;
  password: string;
  confirm_password: string;
  private_key: string;
};

const inputColor = theme.soft_gray;

const CreateUser = () => {
  const [showSecuredText, setShowSecuredText] = React.useState<boolean>(false);
  const [showSecuredTextConfirmation, setShowSecuredTextConfirmation] =
    React.useState<boolean>(false);
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

  const handleAuth = React.useCallback(async (data: LoginFormValues) => {}, []);

  const handleShowPasswordAction = React.useCallback(() => {
    setShowSecuredText((p) => !p);
  }, []);

  const handleShowPasswordConfirmationAction = React.useCallback(() => {
    setShowSecuredTextConfirmation((p) => !p);
  }, []);

  const handleForgetPasswordAction = React.useCallback(() => {
    navigation.navigate("reset_pass");
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      User.verifyTable()
        .then((v) => {
          if (!v) {
            navigation.navigate("create_user");
          }
        })
        .catch((err) => console.log(err));
    }, [])
  );

  return (
    <AppContainer
      appbar={
        <AppBar
          title={t("screens.create.title").toString()}
          subtitle={t("screens.create.subtitle").toString()}
        />
      }
      height={heightPercentage(85)}
    >
      <View>
        <View style={styles.cardTitleContainer}>
          <StyledText textStyle={styles.cardTitle} weight="5">
            {t("screens.create.welcome")}
          </StyledText>
          <StyledText textStyle={styles.cardTitleDescription} weight="3">
            {t("screens.create.welcome_description")}
          </StyledText>
        </View>
        <ControlledInput
          name={"name"}
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
          placeholder={t("common.form.name").toString()}
          label={t("common.form.name").toString()}
          placeholderTextColor={inputColor}
          showIcon={false}
          rules={{
            required: true || t("message.errors.required").toString(),
          }}
        />
        <ControlledInput
          name={"first_name"}
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
          placeholder={t("common.form.firstname").toString()}
          label={t("common.form.firstname").toString()}
          placeholderTextColor={inputColor}
          showIcon={false}
          rules={{
            required: true || t("message.errors.required").toString(),
          }}
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
        />
        <ControlledInput
          name={"confirm_password"}
          control={control}
          leftIcon={() => (
            <MaterialIcons name="done-all" size={25} color={inputColor} />
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
          placeholder={t("common.form.confirm_pass").toString()}
          label={t("common.form.confirm_pass").toString()}
          placeholderTextColor={inputColor}
          secureTextEntry={!showSecuredText}
          rules={{
            required: true || t("message.errors.required").toString(),
          }}
        />
        <ControlledInput
          name={"private_key"}
          control={control}
          leftIcon={() => (
            <MaterialIcons name="shield" size={25} color={inputColor} />
          )}
          rightIcon={() => (
            <FontAwesome name="random" size={25} color={inputColor} />
          )}
          containerStyle={styles.containerStyle}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          placeholder={t("common.form.private_key").toString()}
          label={t("common.form.private_key").toString()}
          placeholderTextColor={inputColor}
          rules={{
            required: true || t("message.errors.required").toString(),
          }}
        />
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
    </AppContainer>
  );
};

export default CreateUser;

const styles = ExtendedStyleSheet.create({
  /* input */
  containerStyle: {
    marginTop: heightPercentage(1),
    marginBottom: heightPercentage(1),
  },
  input: {
    height: vScale(60),
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
    fontSize: moderateScale(20),
    color: theme.purple,
  },
  cardTitleDescription: {
    fontSize: moderateScale(14),
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
