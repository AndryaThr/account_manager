import React, { useEffect, useState } from "react";
import {
  View,
  TouchableNativeFeedback,
  ScrollView,
  TouchableHighlight,
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
import { useFieldArray, useForm } from "react-hook-form";
import ControlledInput from "../components/input/ControlledInput";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import {
  useNavigation,
  NavigationProp,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import {
  MainStackParamList,
  MainStackScreenRouteProp,
} from "../navigation/types";
import AppBar from "../components/appbar/AppBar";
import { validateEmail, validateUsername } from "../utils/functions.string";
import ControlledPicker from "../components/input/ControlledPicker";
import SocialMedia from "../controller/database/SocialMedia";
import ControlledIconPicker from "../components/input/ControlledIconPicker";
import { NumberBetweenZeroAndFifteen, UserType } from "../controller/types";
import { findInObject } from "../utils/functions.objects";
import Loader from "../components/loader/Loader";
import ControlledSecurityQuestion from "../components/input/ControlledSecurityQuestion";
import { StateType, useAppDispatch, useAppSelector } from "../config/redux";
import AccountManagement from "../controller/backend/AccountManagement";
import { AccountFormValues, CategoryType } from "./types";
import { decryptString, encryptString } from "../config/crypto/crypto";
import ProtectedContainer from "../components/container/ProtectedContainer";
import { default_image } from "../constants/images";

const inputColor = theme.soft_gray;

const AccountForm = () => {
  const [showSecuredText, setShowSecuredText] = useState<boolean>(false);
  const [readyState, setReadyState] = useState<boolean>(false);
  const [categories, setCategories] = useState<
    {
      id?: NumberBetweenZeroAndFifteen;
      value: string;
      folder: string;
    }[]
  >([]);

  const { params } = useRoute<MainStackScreenRouteProp<"add_account">>();
  const { user } = useAppSelector<StateType>((state) => state.authReducer);

  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  const { control, handleSubmit, watch, setValue } = useForm<AccountFormValues>(
    {
      mode: "onSubmit",
      defaultValues: params.account_info
        ? {
            ...params.account_info,
            password: decryptString(
              params.account_info.password,
              user?.user_private_key as string
            ),
          }
        : {
            platform: {
              icon: default_image,
            },
          },
    }
  );
  const { fields, append, remove } = useFieldArray({
    name: "security_question",
    control,
  });

  const { category, platform } = watch();

  const handleFormSubmit = React.useCallback(
    async (data: AccountFormValues) => {
      if (!user) {
        throw new Error("Should login first");
      }

      const final_data = {
        account: {
          acc_user: user?.user_id as number,
          acc_name: data.name,
          acc_uname: data.username,
          acc_mail: data.mail,
          acc_token: data.token,
          acc_password: encryptString(data.password, user.user_private_key),
          acc_phone: data.phone,
        },
        platform: {
          id: data.platform.id,
          category: data.category.id,
        },
        security_question:
          data.security_question?.map((e) => ({
            id: e.id,
            question: e.question ?? "",
            answer: e.answer ?? "",
          })) ?? [],
      };

      if (params?.account_id) {
        const modifAcc = await AccountManagement.updateExistingAccount(
          final_data,
          params.account_id,
          params.account_info?.security_question?.map((e) => e.id) ?? []
        );

        if (modifAcc) {
          navigation.goBack();
        } else {
          Alert.alert(
            t("common.message.err_message.err_update").toString(),
            t("common.message.err_message.err_update_desc").toString(),
            [
              {
                text: "ok",
                style: "cancel",
              },
            ],
            {
              cancelable: true,
            }
          );
        }
      } else {
        const addAcc = await AccountManagement.addNewAccount(final_data);
        if (addAcc) {
          navigation.navigate("home");
        } else {
          Alert.alert(
            t("common.message.err_message.err_insert").toString(),
            t("common.message.err_message.err_insert_desc").toString(),
            [
              {
                text: "ok",
                style: "cancel",
              },
            ],
            {
              cancelable: true,
            }
          );
        }
      }
    },
    []
  );

  const handleShowPasswordAction = React.useCallback(() => {
    setShowSecuredText((p) => !p);
  }, []);

  const handleResetButtonPress = React.useCallback(async () => {
    try {
      let currentCategory = findInObject(categories, "folder", "00");
      let currentPlatform = await SocialMedia.fetchSocialMediaById(0);

      setValue("category", {
        id: currentCategory.id,
        label: currentCategory.value,
      });

      setValue("platform", {
        id: 0,
        icon: currentPlatform.sm_image,
        folder: currentPlatform.folder,
        label: currentPlatform.sm_label,
      });
    } catch (error) {
      console.error(error);
    }
  }, [categories]);

  const handleAddSQButtonAction = React.useCallback(() => {
    if (!fields) {
      setValue("security_question", [
        {
          id: 0,
          question: "",
          answer: "",
        },
      ]);
    } else {
      append({
        id: fields.length,
        question: "",
        answer: "",
      });
    }
  }, []);

  const handleRemoveSQAction = React.useCallback((id: number) => {
    remove(id);
  }, []);

  useEffect(() => {
    SocialMedia.fetchSocialMediaCategory()
      .then((smCategories) => {
        let final: CategoryType[] = smCategories.map((e) => ({
          id: e.id as NumberBetweenZeroAndFifteen,
          value: e.label_fr,
          folder: e.folder,
        }));
        final.unshift({
          value: t("common.all").toString(),
          folder: "",
        });

        setCategories(final);
      })
      .catch((err) => {
        Alert.alert(err.message, err + "\n" + JSON.stringify(err, null, 4));
        setCategories([]);
      })
      .finally(() => {
        setReadyState(true);
      });
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      if (platform?.folder) {
        let currentCategory = findInObject(
          categories,
          "folder",
          platform.folder
        );
        if (currentCategory) {
          setValue("category", {
            id: currentCategory.id,
            label: currentCategory.value,
          });
        } else {
          console.warn("cannot resolve folder ", platform.folder);
          setValue("category", {
            id: categories[0].id,
            label: categories[0].value,
          });
        }
      }
    }
  }, [platform.folder, categories]);

  return (
    <ProtectedContainer
      appbar={
        <AppBar
          title={params.title}
          subtitle={params.subtitle}
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
      paddingHorizontalPercentage={5}
      requireDigitAuth={false}
    >
      {readyState ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollview}
        >
          <View style={styles.cardTitleContainer}>
            <StyledText textStyle={styles.cardTitle} weight="4">
              {t("screens.new.warning")}
            </StyledText>
          </View>
          {/* NAME */}
          <View>
            <View style={styles.formContainer}>
              <StyledText textStyle={styles.formLabel}>
                {t("screens.new.platform_info")}
              </StyledText>
              <ControlledIconPicker
                control={control}
                name={"platform"}
                category_id={category?.id}
                label={t("common.form.sm_label").toString()}
                placeholder={t("common.form.placeholder_sm_label").toString()}
              />
              <ControlledPicker
                name="category"
                label={t("common.form.category").toString()}
                placeholder={t("common.form.placeholder_cat").toString()}
                control={control}
                leftIcon={
                  <MaterialIcons
                    name="category"
                    color={inputColor}
                    size={sizes.inputIcon}
                  />
                }
                rules={{
                  required: false || t("message.errors.required").toString(),
                }}
                optionList={categories}
              />
              <TouchableHighlight onPress={handleResetButtonPress}>
                <View style={styles.defaultButton}>
                  <StyledText weight="4" textStyle={styles.defaultButtonLabel}>
                    {t("common.button.default")}
                  </StyledText>
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.formContainer}>
              <StyledText textStyle={styles.formLabel}>
                {t("screens.new.account_info")}
              </StyledText>
              <ControlledInput
                name={"name"}
                control={control}
                leftIcon={() => (
                  <MaterialIcons
                    name="info"
                    size={sizes.inputIcon}
                    color={inputColor}
                  />
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
              />

              {/* USERNAME */}
              <ControlledInput
                name={"username"}
                control={control}
                leftIcon={() => (
                  <MaterialIcons
                    name="person"
                    size={sizes.inputIcon}
                    color={inputColor}
                  />
                )}
                containerStyle={styles.containerStyle}
                style={styles.input}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                placeholderStyle={styles.placeholderStyle}
                textErrorStyle={styles.textErrorStyle}
                placeholder={t("common.form.username").toString()}
                label={t("common.form.username").toString()}
                placeholderTextColor={inputColor}
                showIcon={false}
                rules={{
                  required: false || t("message.errors.required").toString(),
                  validate: {
                    invalid: (str) =>
                      validateUsername(str) ||
                      t("message.errors.username").toString(),
                  },
                }}
              />

              {/* MAIL */}
              <ControlledInput
                name={"mail"}
                control={control}
                leftIcon={() => (
                  <MaterialIcons
                    name="mail"
                    size={sizes.inputIcon}
                    color={inputColor}
                  />
                )}
                containerStyle={styles.containerStyle}
                style={styles.input}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                placeholderStyle={styles.placeholderStyle}
                textErrorStyle={styles.textErrorStyle}
                placeholder={t("example@example.mail").toString()}
                label={t("common.form.mail").toString()}
                placeholderTextColor={inputColor}
                showIcon={false}
                rules={{
                  required: false || t("message.errors.required").toString(),
                  validate: {
                    invalid: (str) =>
                      validateEmail(str) || t("message.errors.mail").toString(),
                  },
                }}
                keyboardType="email-address"
              />

              {/* PHONE */}
              <ControlledInput
                name={"phone"}
                control={control}
                leftIcon={() => (
                  <MaterialIcons
                    name="phone"
                    size={sizes.inputIcon}
                    color={inputColor}
                  />
                )}
                containerStyle={styles.containerStyle}
                style={styles.input}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                placeholderStyle={styles.placeholderStyle}
                textErrorStyle={styles.textErrorStyle}
                placeholder={t("common.form.phone").toString()}
                label={t("common.form.phone").toString()}
                placeholderTextColor={inputColor}
                showIcon={false}
                rules={{
                  required: false || t("message.errors.required").toString(),
                  pattern: {
                    value: /^(\+)?\d{8,}$/, // 8-digit+ phone number pattern
                    message: t("message.errors.phone_number"),
                  },
                }}
                keyboardType="number-pad"
              />

              {/* PASSWORD */}
              <ControlledInput
                name={"password"}
                control={control}
                leftIcon={() => (
                  <MaterialIcons
                    name="lock"
                    size={sizes.inputIcon}
                    color={inputColor}
                  />
                )}
                rightIcon={() => (
                  <Ionicons
                    name={showSecuredText ? "eye" : "eye-off"}
                    size={sizes.inputIcon}
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

              {/* TOKEN */}
              <ControlledInput
                name={"token"}
                control={control}
                leftIcon={() => (
                  <MaterialIcons
                    name="vpn-key"
                    size={sizes.inputIcon}
                    color={inputColor}
                  />
                )}
                containerStyle={styles.containerStyle}
                style={styles.input}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                placeholderStyle={styles.placeholderStyle}
                textErrorStyle={styles.textErrorStyle}
                placeholder={t("common.form.placeholder_token").toString()}
                label={t("common.form.token").toString()}
                placeholderTextColor={inputColor}
                showIcon={false}
              />
            </View>
            <View style={styles.formContainer}>
              <StyledText textStyle={styles.formLabel}>
                {t("screens.new.security_question")}
              </StyledText>

              {fields.length > 0 ? (
                fields?.map((e, i) => {
                  return (
                    <ControlledSecurityQuestion
                      key={i}
                      arrayId={i}
                      control={control}
                      name={`security_question.${i}`}
                      onCrossPress={handleRemoveSQAction}
                    />
                  );
                })
              ) : (
                <View style={styles.sqEmptyContainer}>
                  <StyledText textStyle={styles.sqEmptyLabel}>
                    {t("screens.new.sq_description")}
                  </StyledText>
                </View>
              )}

              <TouchableHighlight onPress={handleAddSQButtonAction}>
                <View style={styles.defaultButton}>
                  <StyledText weight="4" textStyle={styles.defaultButtonLabel}>
                    {t("common.button.new")}
                  </StyledText>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      ) : (
        <Loader />
      )}
      <TouchableNativeFeedback onPress={handleSubmit(handleFormSubmit)}>
        <View style={styles.pressableButton}>
          <StyledText weight="4" textStyle={styles.pressableButtonLabel}>
            {t("common.button.create")}
          </StyledText>
        </View>
      </TouchableNativeFeedback>
    </ProtectedContainer>
  );
};

export default AccountForm;

const styles = ExtendedStyleSheet.create({
  scrollview: {
    paddingBottom: heightPercentage(10),
  },
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
    paddingTop: heightPercentage(3),
    paddingHorizontal: widthPercentage(3),
  },
  cardTitle: {
    fontSize: moderateScale(16),
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
    marginTop: heightPercentage(1.5),
    marginBottom: heightPercentage(1),
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

  /* account form */
  formContainer: {
    borderWidth: 0.5,
    paddingHorizontal: widthPercentage(5),
    paddingVertical: heightPercentage(2),
    borderRadius: sizes.borderRadius,
    borderColor: theme.soft_gray,
    marginTop: heightPercentage(3),
    marginBottom: heightPercentage(3),
  },
  formLabel: {
    fontSize: moderateScale(16),
    position: "absolute",
    top: -heightPercentage(2.5) / 2,
    backgroundColor: "white",
    marginLeft: hScale(30),
    paddingHorizontal: widthPercentage(1),
  },
  defaultButton: {
    position: "absolute",
    bottom: -heightPercentage(2) - heightPercentage(3) / 2,
    right: 0,
    backgroundColor: theme.purple,
    paddingHorizontal: "8%",
    borderRadius: sizes.borderRadius,
    height: heightPercentage(3),
    ...ExtendedStyleSheet.defaultStyles.center,
  },
  defaultButtonLabel: {
    color: theme.text,
    fontSize: moderateScale(12),
  },

  /* sq */
  sqEmptyContainer: {
    ...ExtendedStyleSheet.defaultStyles.center,
    height: heightPercentage(10),
  },
  sqEmptyLabel: {
    fontSize: moderateScale(12),
    color: theme.soft_gray,
    textAlign: "center",
  },
});
