import React from "react";
import { Alert, View } from "react-native";
import ExtendedStyleSheet from "../components/styles/ExtendedStyleSheet";
import StyledText from "../components/texts/StyledText";
import DigitInput from "../components/container/DigitInput";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  MainStackParamList,
  MainStackScreenRouteProp,
} from "../navigation/types";
import { useTranslation } from "react-i18next";
import { StackNavigationProp } from "@react-navigation/stack";
import { encryptString } from "../config/crypto/crypto";
import { Auth } from "../controller/backend/Auth";

const AddDigit = () => {
  const { params } = useRoute<MainStackScreenRouteProp<"add_digit">>();
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();

  const onCreatePinEnd = React.useCallback(
    async (pin: string) => {
      const payload = {
        user_data: params.user_data,
        digit: pin,
      };

      navigation.push("add_digit", payload);
      return true;
    },
    [params]
  );

  const onConfirmPinEnd = React.useCallback(
    async (pin: string) => {
      if (params.digit) {
        if (params.digit === pin) {
          const encryptedPin = encryptString(pin, params.user_data.private_key);
          const user_details = {
            ...params.user_data,
            digit: encryptedPin,
          };

          const a = await Auth.createUser(user_details);

          if (a.success) {
            navigation.navigate("auth");
          } else {
            Alert.alert(
              t("message.error").toString(),
              t("message.err_message.err_insert").toString(),
              [
                {
                  text: "Ok",
                  style: "cancel",
                },
              ],
              { cancelable: true }
            );
          }
          return true;
        } else {
          return false;
        }
      }

      return false;
    },
    [params]
  );

  useFocusEffect(React.useCallback(() => {}, []));

  const labels = React.useMemo(
    () => ({
      title: params.digit
        ? t("screens.add_digit.title_2")
        : t("screens.add_digit.title_1"),
      description: params.digit
        ? t("screens.add_digit.description_2")
        : t("screens.add_digit.description_1"),
    }),
    [params.digit]
  );

  return (
    <DigitInput
      title={labels.title}
      description={labels.description}
      onInputEnd={params.digit ? onConfirmPinEnd : onCreatePinEnd}
    />
  );
};

export default AddDigit;

const styles = ExtendedStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
