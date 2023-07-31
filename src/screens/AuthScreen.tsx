import React from "react";
import {
  View,
  TouchableNativeFeedback,
  Alert,
  BackHandler,
} from "react-native";
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
import { Auth } from "../controller/backend/Auth";
import Loader from "../components/loader/Loader";
import { useAppDispatch } from "../config/redux";
import { userLoginAction } from "../config/redux/actions";
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
  password: string;
};

const inputColor = theme.soft_gray;

const AuthScreen = () => {
  const [showSecuredText, setShowSecuredText] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [userCheck, setUserCheck] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>();
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
      let name = data.name;
      let password = data.password;

      const auth = await Auth.authUser(password);
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

  useFocusEffect(
    React.useCallback(() => {
      User.verifyTable()
        .then((v) => {
          if (!v) {
            navigation.navigate("create_user");
          } else {
            User.fetchAllUsername()
              .then((val) => {
                setName(val[0].user_name + " " + val[0].user_firstname);
              })
              .catch((err) => {
                Alert.alert(
                  err.message,
                  err + "\n" + JSON.stringify(err, null, 4)
                );
              });
          }
        })
        .catch((err) => {
          Alert.alert(err.message, err + "\n" + JSON.stringify(err, null, 4));
        })
        .finally(() => {
          setUserCheck(true);
        });
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      const handleBackPress = () => {
        if (!navigation.canGoBack()) {
          Alert.alert(
            t("message.quit.title").toString(),
            t("message.quit.description").toString(),
            [
              {
                text: t("common.button.no").toString(),
                style: "cancel",
              },
              {
                text: t("common.button.yes").toString(),
                onPress: () => {
                  BackHandler.exitApp();
                },
              },
            ],
            {
              cancelable: true,
            }
          );

          return true;
        } else {
          navigation.goBack();
        }
      };

      const bh = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress
      );

      return () => {
        bh.remove();
      };
    }, [])
  );

  if (!userCheck) {
    return <Loader color="#000000" />;
  }

  return (
    <AppContainer
      appbar={
        <AppBar
          title={t("common.app_title").toString()}
          subtitle={t("common.app_description").toString()}
        />
      }
      height={heightPercentage(85)}
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
          label={t("common.form.name").toString()}
          placeholder={t("common.form.name").toString()}
          placeholderTextColor={inputColor}
          showIcon={false}
          editable={false}
          defaultValue={name ?? "test"}
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
          placeholder={t("common.form.password").toString()}
          label={t("common.form.password").toString()}
          placeholderTextColor={inputColor}
          secureTextEntry={!showSecuredText}
          rules={{
            required: false || t("message.errors.required").toString(),
          }}
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
