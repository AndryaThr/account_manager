import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
import { StateType, useAppDispatch, useAppSelector } from "../config/redux";
import AppBar from "../components/appbar/AppBar";
import AppContainer from "../components/container/AppContainer";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainStackParamList } from "../navigation/types";
import { userLogoutAction } from "../config/redux/actions";
import Account from "../controller/database/Account";
import { AccountInformationType } from "../controller/types";
import Loader from "../components/loader/Loader";
import AccountElement from "../components/elements/AccountElement";

const HomeScreen = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector<StateType>((state) => state.authReducer);
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const dispatch = useAppDispatch();

  const username = React.useRef(
    `${user?.user_name} ${user?.user_firstname} / ${user?.user_uname} `
  );

  const [list, setList] = React.useState<
    AccountInformationType[] | undefined
  >();

  const logOut = () => dispatch(userLogoutAction());

  const handleAddButtonAction = React.useCallback(() => {
    navigation.navigate("add_account");
  }, []);

  const handleLogOutButtonAction = React.useCallback(async () => {
    logOut();
  }, []);

  const handleSortButtonAction = React.useCallback(async () => {
    console.log("Sort button pressed");
  }, []);

  React.useEffect(() => {
    if (user) {
      Account.fetchAccountOfUser(user?.user_id)
        .then((val) => {
          setList(val);
        })
        .catch((err) => {
          console.log(err);
          setList([]);
        });
    }
  }, []);

  return (
    <AppContainer
      appbar={
        <AppBar
          title={t("screens.home.title")}
          subtitle={username.current}
          leftIcon={
            <MaterialCommunityIcons
              name="database"
              color={theme.text}
              size={sizes.icon}
            />
          }
          rightIcon={
            <Ionicons
              name="log-out-outline"
              color={theme.text}
              size={sizes.icon}
            />
          }
          buttonLabel={t("common.button.new").toString()}
          description={t("screens.home.subtitle").toString()}
          subdescription={t("screens.home.description").toString()}
          onButtonPress={handleAddButtonAction}
          onRightIconPress={handleLogOutButtonAction}
        />
      }
    >
      <View>
        <View style={styles.cardTitleContainer}>
          <StyledText textStyle={styles.cardTitle} weight="4">
            {t("screens.home.saved_account")}
          </StyledText>
          <TouchableOpacity onPress={handleSortButtonAction}>
            <View
              style={[
                ExtendedStyleSheet.defaultStyles.row,
                ExtendedStyleSheet.defaultStyles.alignCenter,
              ]}
            >
              <StyledText textStyle={styles.cardTitle} weight="4">
                {t("screens.home.sort")}
              </StyledText>
              <MaterialCommunityIcons
                name="filter"
                size={sizes.inputIcon}
                color={theme.dark_gray}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {!list ? (
        <Loader />
      ) : (
        <FlatList
          data={list}
          renderItem={({ item }) => {
            return <AccountElement item={item} />;
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatlist}
        />
      )}
    </AppContainer>
  );
};

export default HomeScreen;

const styles = ExtendedStyleSheet.create({
  /* card title */
  cardTitleContainer: {
    paddingTop: heightPercentage(2),
    paddingBottom: heightPercentage(1),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: moderateScale(16),
    color: theme.dark_gray,
    marginHorizontal: widthPercentage(2),
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

  /* error */
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: heightPercentage(3),
  },
  errorLabel: {
    color: theme.error,
  },

  /* content */
  scrollableContent: {},
  flatlist: {
    paddingBottom: heightPercentage(20),
  },
});
