import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import ProtectedContainer from "../components/container/ProtectedContainer";
import AppBar from "../components/appbar/AppBar";
import theme from "../constants/colors";
import sizes from "../constants/sizes";
import {
  hScale,
  heightPercentage,
  moderateScale,
  vScale,
  widthPercentage,
} from "../utils/functions.dimensions";
import { useTranslation } from "react-i18next";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  MainStackParamList,
  MainStackScreenRouteProp,
} from "../navigation/types";
import Account from "../controller/database/Account";
import SecurityQuestion from "../controller/database/SecurityQuestion";
import Loader from "../components/loader/Loader";
import StyledText from "../components/texts/StyledText";
import ExtendedStyleSheet from "../components/styles/ExtendedStyleSheet";
import FieldView from "../components/elements/FieldView";
import Icons from "../controller/backend/Icons";
import IconDisplay from "../components/image/IconDisplay";
import SecurityQuestionView from "../components/elements/SecurityQuestionView";
import { decryptString } from "../config/crypto/crypto";
import { StateType, useAppSelector } from "../config/redux";

export type DataType = {
  acc_id: number;
  acc_user: number;
  acc_name: string;
  acc_uname: string;
  acc_mail?: string;
  acc_token?: string;
  acc_password: string;
  acc_sm: number;
  acc_phone?: string;
  acc_addate: string;
  icon: string;
  platform: string;
  category_id: number;
  folder: string;
  category_fr: string;
  category_eng: string;
  security_questions?: {
    id: number;
    question: string;
    answer: string;
  }[];
};

const inputColor = theme.soft_gray;
const fabSize = moderateScale(65);

const AccountDetails = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const { params } = useRoute<MainStackScreenRouteProp<"details_account">>();
  const { user } = useAppSelector<StateType>((state) => state.authReducer);

  const [data, setData] = useState<DataType>();
  const [showSecuredText, setShowSecuredText] = useState<boolean>(false);
  const [showToken, setShowToken] = useState<boolean>(false);

  const fetchAccountInformation = useCallback(async () => {
    try {
      const account = await Account.fetchAccountDetailsById(params.account_id);
      const securityQuestions =
        await SecurityQuestion.fetchSecurityQuestionById(params.account_id);

      let addate = new Date(account.acc_addate);
      const d = {
        ...account,
        acc_addate: `${addate.toLocaleDateString()}, ${addate.toLocaleTimeString()}`,
        icon: Icons.resolveImageUri(account.folder, account.icon),
        acc_password: decryptString(
          account.acc_password,
          user?.user_private_key as string
        ),
        security_questions: securityQuestions,
      };

      return d;
    } catch (err) {
      console.log(err);
      throw new Error("Account details fetch error");
    }
  }, []);

  const handleShowSecuredTextAction = React.useCallback(
    (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
      setter((p) => !p);
    },
    []
  );

  useEffect(() => {
    fetchAccountInformation()
      .then((val) => {
        setData(val);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);

  return (
    <ProtectedContainer
      appbar={
        <AppBar
          title={t("screens.details.title")}
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
      floatingButton={
        <TouchableOpacity>
          <View style={styles.fab}>
            <MaterialIcons
              name="edit"
              color={theme.text}
              size={moderateScale(30)}
            />
          </View>
        </TouchableOpacity>
      }
    >
      {!data ? (
        <Loader />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollview}
        >
          <View style={styles.cardTitleContainer}>
            <StyledText textStyle={styles.cardTitle} weight="4">
              {t("screens.details.description")}
            </StyledText>
          </View>
          <View style={{ marginTop: heightPercentage(2) }}>
            <FieldView
              label={t("common.date").toString()}
              value={data.acc_addate}
              leftIcon={
                <MaterialCommunityIcons
                  name="calendar"
                  size={sizes.inputIcon}
                  color={inputColor}
                />
              }
            />
            <View style={styles.formContainer}>
              <StyledText textStyle={styles.formLabel}>
                {t("screens.new.platform_info")}
              </StyledText>
              <View style={styles.platformContainer}>
                <View style={styles.iconContainer}>
                  <IconDisplay icon_path={data.icon} />
                </View>
                <View style={[ExtendedStyleSheet.defaultStyles.flex_1]}>
                  <FieldView
                    label={t("common.form.sm_label").toString()}
                    value={data.platform}
                  />
                </View>
              </View>
              <FieldView
                label={t("common.form.category").toString()}
                value={data.category_fr}
                leftIcon={
                  <MaterialIcons
                    name="category"
                    color={inputColor}
                    size={sizes.inputIcon}
                  />
                }
              />
            </View>
            <View style={styles.formContainer}>
              <StyledText textStyle={styles.formLabel}>
                {t("screens.new.account_info")}
              </StyledText>
              <FieldView
                label={t("common.form.name").toString()}
                value={data.acc_name}
                leftIcon={
                  <MaterialIcons
                    name="info"
                    size={sizes.inputIcon}
                    color={inputColor}
                  />
                }
              />
              <FieldView
                label={t("common.form.username").toString()}
                value={data.acc_uname}
                leftIcon={
                  <MaterialIcons
                    name="person"
                    size={sizes.inputIcon}
                    color={inputColor}
                  />
                }
              />
              <FieldView
                label={t("common.form.mail").toString()}
                value={data.acc_mail ?? t("common.undefined").toString()}
                leftIcon={
                  <MaterialIcons
                    name="mail"
                    size={sizes.inputIcon}
                    color={inputColor}
                  />
                }
              />
              <FieldView
                label={t("common.form.phone").toString()}
                value={data.acc_phone ?? t("common.undefined").toString()}
                leftIcon={
                  <MaterialIcons
                    name="phone"
                    size={sizes.inputIcon}
                    color={inputColor}
                  />
                }
              />
              <FieldView
                label={t("common.form.password").toString()}
                value={data.acc_password}
                hidden={!showSecuredText}
                leftIcon={
                  <MaterialIcons
                    name="lock"
                    size={sizes.inputIcon}
                    color={inputColor}
                  />
                }
                rightIcon={
                  <Ionicons
                    name={showSecuredText ? "eye" : "eye-off"}
                    size={sizes.inputIcon}
                    color={inputColor}
                  />
                }
                onRightIconPress={() =>
                  handleShowSecuredTextAction(setShowSecuredText)
                }
              />
              <FieldView
                label={t("common.form.token").toString()}
                value={data.acc_token ?? t("common.undefined").toString()}
                hidden={!showToken}
                leftIcon={
                  <MaterialIcons
                    name="vpn-key"
                    size={sizes.inputIcon}
                    color={inputColor}
                  />
                }
                rightIcon={
                  <Ionicons
                    name={showToken ? "eye" : "eye-off"}
                    size={sizes.inputIcon}
                    color={inputColor}
                  />
                }
                onRightIconPress={() =>
                  handleShowSecuredTextAction(setShowToken)
                }
              />
            </View>
            <View style={styles.formContainer}>
              <StyledText textStyle={styles.formLabel}>
                {t("screens.new.security_question")}
              </StyledText>

              {data.security_questions && data.security_questions.length > 0 ? (
                data.security_questions.map((e, _) => {
                  return (
                    <SecurityQuestionView
                      key={e.id.toString()}
                      q={e.question}
                      a={e.answer}
                    />
                  );
                })
              ) : (
                <View style={styles.sqEmptyContainer}>
                  <StyledText textStyle={styles.sqEmptyLabel}>
                    {t("screens.details.sq_description")}
                  </StyledText>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </ProtectedContainer>
  );
};

export default AccountDetails;

const styles = ExtendedStyleSheet.create({
  scrollview: {
    paddingBottom: heightPercentage(20),
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

  /* account form */
  formContainer: {
    borderWidth: 0.5,
    paddingHorizontal: widthPercentage(5),
    paddingVertical: heightPercentage(2),
    borderRadius: sizes.borderRadius,
    borderColor: theme.soft_gray,
    marginTop: heightPercentage(3),
    marginBottom: heightPercentage(1),
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

  iconContainer: {
    ...ExtendedStyleSheet.defaultStyles.center,
    width: "20%",
    marginRight: "3%",
    paddingVertical: "3%",
  },
  platformContainer: {
    marginVertical: heightPercentage(1),
    flexDirection: "row",
    alignItems: "center",
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

  fab: {
    width: fabSize,
    height: fabSize,
    borderRadius: fabSize / 2,
    backgroundColor: theme.purple,
    elevation: 2,
    ...ExtendedStyleSheet.defaultStyles.center,
  },
});
