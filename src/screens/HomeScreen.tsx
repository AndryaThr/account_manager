import React from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  RefreshControl,
  GestureResponderEvent,
} from "react-native";
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
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { MainStackParamList } from "../navigation/types";
import { userLogoutAction } from "../config/redux/actions";
import Account from "../controller/database/Account";
import { AccountInformationReducedType } from "../controller/types";
import Loader from "../components/loader/Loader";
import AccountElement from "../components/elements/AccountElement";
import FilterModal from "../components/modals/FilterModal";
import { FilterModalHandle, SearchFilter } from "../components/types";
import { FormProvider, useForm } from "react-hook-form";
import SocialMedia from "../controller/database/SocialMedia";

const HomeScreen = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector<StateType>((state) => state.authReducer);
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const dispatch = useAppDispatch();

  const username = React.useRef(`${user?.user_name} ${user?.user_firstname}`);
  const filterModalRef = React.useRef<FilterModalHandle>(null);

  const [list, setList] = React.useState<
    AccountInformationReducedType[] | undefined
  >();
  const [categories, setCategories] = React.useState<
    { id: number; label: string }[] | undefined
  >();

  const methods = useForm<SearchFilter>({
    mode: "onChange",
    defaultValues: {
      sortKey: "name",
      sortType: "asc",
    },
  });

  const { watch } = methods;

  const { sortKey, sortType, category } = watch();

  const renderedList = React.useMemo(() => {
    if (!list) {
      return undefined;
    }

    if (category == undefined) {
      return list;
    }

    return list.filter((e) => e.category_id === category);
  }, [list, category]);

  const logOut = () => dispatch(userLogoutAction());

  const handleAddButtonAction = React.useCallback(() => {
    navigation.navigate("add_account", {
      title: t("screens.new.title").toString(),
      subtitle: t("screens.new.description").toString(),
    });
  }, []);

  const handleLogOutButtonAction = React.useCallback(async () => {
    logOut();
  }, []);

  const handleSortButtonAction = React.useCallback(async () => {
    filterModalRef.current?.showModal();
  }, []);

  const fetchUserAccounts = React.useCallback(() => {
    setList(undefined);

    if (user) {
      Account.fetchAccountsOfUser(user?.user_id, sortKey, sortType)
        .then((val) => {
          setList(val);
        })
        .catch((err) => {
          console.log(err);
          setList([]);
        });
    }
  }, [sortKey, sortType]);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserAccounts();
    }, [sortKey, sortType])
  );

  React.useEffect(() => {
    SocialMedia.fetchSocialMediaCategory()
      .then((val) => {
        const tmp: { id: number; label: string }[] = val.map((e) => ({
          id: e.id,
          label: e.label_fr,
        }));
        setCategories(tmp);
      })
      .catch((err) => {
        console.log(err);
      });
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
      {!renderedList || !categories ? (
        <Loader />
      ) : renderedList.length > 0 ? (
        <FlatList
          data={renderedList}
          renderItem={({ item }) => {
            return <AccountElement item={item} />;
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatlist}
        />
      ) : (
        <View
          style={[
            ExtendedStyleSheet.defaultStyles.flex_1,
            ExtendedStyleSheet.defaultStyles.center,
          ]}
        >
          <StyledText>{t("common.nothing")}</StyledText>
        </View>
      )}
      {categories && (
        <FormProvider {...methods}>
          <FilterModal ref={filterModalRef} categories={categories} />
        </FormProvider>
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
    fontSize: moderateScale(14),
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
