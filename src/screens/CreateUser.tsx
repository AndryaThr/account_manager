import React from "react";
import {
  View,
  TouchableNativeFeedback,
  ScrollView,
  BackHandler,
  Alert,
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
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import {
  useNavigation,
  NavigationProp,
  useFocusEffect,
} from "@react-navigation/native";
import { MainStackParamList } from "../navigation/types";
import AppContainer from "../components/container/AppContainer";
import AppBar from "../components/appbar/AppBar";
import User from "../controller/database/User";
import { encryptString, generateEncryptionKey } from "../config/crypto/crypto";

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

  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  const { control, handleSubmit, watch, setValue, trigger } =
    useForm<LoginFormValues>({
      mode: "onSubmit",
    });

  const { password } = watch();

  const handleNextButtonPress = React.useCallback(
    async (data: LoginFormValues) => {
      const params = {
        user_data: {
          name: data.name,
          first_name: data.first_name,
          password: encryptString(data.password, data.private_key),
          private_key: data.private_key,
        },
      };

      navigation.navigate("add_digit", params);
    },
    []
  );

  const handleShowPasswordAction = React.useCallback(() => {
    setShowSecuredText((p) => !p);
  }, []);

  const handleShowPasswordConfirmationAction = React.useCallback(() => {
    setShowSecuredTextConfirmation((p) => !p);
  }, []);

  const handleRandomButtonAction = React.useCallback(() => {
    const a = generateEncryptionKey(16);
    setValue("private_key", a);
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

      const handleBackPress = () => {
        if (true) {
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
      <ScrollView>
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
            required: false || t("message.errors.required").toString(),
          }}
          defaultValue="Andriamanantsoa"
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
            required: false || t("message.errors.required").toString(),
          }}
          defaultValue="Tsitohaina"
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
            required: false || t("message.errors.required").toString(),
          }}
          defaultValue="password"
        />
        <ControlledInput
          name={"confirm_password"}
          control={control}
          leftIcon={() => (
            <MaterialIcons name="done-all" size={25} color={inputColor} />
          )}
          rightIcon={() => (
            <Ionicons
              name={showSecuredTextConfirmation ? "eye" : "eye-off"}
              size={25}
              color={inputColor}
              onPress={handleShowPasswordConfirmationAction}
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
          secureTextEntry={!showSecuredTextConfirmation}
          rules={{
            required: false || t("message.errors.required").toString(),
            validate: {
              confirmation: (str) =>
                str === password || t("message.errors.confirmation").toString(),
            },
          }}
          defaultValue="password"
        />
        <ControlledInput
          name={"private_key"}
          control={control}
          leftIcon={() => (
            <MaterialIcons name="shield" size={25} color={inputColor} />
          )}
          rightIcon={() => (
            <FontAwesome
              name="random"
              size={25}
              color={inputColor}
              onPress={handleRandomButtonAction}
            />
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
            required: false || t("message.errors.required").toString(),
            validate: {
              space_not_allowed: (str) =>
                !str.includes(" ") ||
                t("message.errors.space_not_allowed").toString(),
            },
          }}
        />
      </ScrollView>
      <TouchableNativeFeedback onPress={handleSubmit(handleNextButtonPress)}>
        <View style={styles.pressableButton}>
          <StyledText weight="4" textStyle={styles.pressableButtonLabel}>
            {t("screens.auth.sign_in")}
          </StyledText>
        </View>
      </TouchableNativeFeedback>
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
    height: hScale(48),
    borderRadius: sizes.roundedRadius,
    marginTop: heightPercentage(1.5),
    marginBottom: heightPercentage(1),
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
