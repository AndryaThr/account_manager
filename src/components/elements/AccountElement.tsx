import React from "react";
import { View, Image, TouchableOpacity, Alert } from "react-native";
import theme, { colorOfCategory } from "../../constants/colors";
import {
  heightPercentage,
  moderateScale,
  widthPercentage,
} from "../../utils/functions.dimensions";
import sizes from "../../constants/sizes";
import ExtendedStyleSheet from "../styles/ExtendedStyleSheet";
import { AccountInformationReducedType } from "../../controller/types";
import Icons from "../../controller/backend/Icons";
import StyledText from "../texts/StyledText";
import * as FileSystem from "expo-file-system";
import { MaterialIcons } from "@expo/vector-icons";
import IconDisplay from "../image/IconDisplay";
import { formatDateToString } from "../../utils/functions.string";
import { useTranslation } from "react-i18next";
import Account from "../../controller/database/Account";
import SecurityQuestion from "../../controller/database/SecurityQuestion";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainStackParamList } from "../../navigation/types";

type AccountElementType = {
  item: AccountInformationReducedType;
};

const AccountElement = ({ item }: AccountElementType) => {
  const [im, setIm] = React.useState<string>(
    Icons.resolveImageUri("00", "Default.png")
  );
  const [date, setDate] = React.useState<string>("");

  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  const handlePress = React.useCallback(() => {
    // const userDetails = await Account.fetchAccountDetailsById(item.acc_id);
    // const securityQuestions = await SecurityQuestion.fetchSecurityQuestionById(
    //   item.acc_id
    // );
    navigation.navigate("details_account", {
      account_id: item.acc_id,
    });
  }, [item]);

  React.useEffect(() => {
    let d = formatDateToString(new Date(item.acc_addate));
    setDate(d);

    // FileSystem.getInfoAsync(Icons.resolveImageUri(item.folder, item.icon))
    //   .then((val) => {
    //     if (val.exists) {
    //       setIm(val.uri);
    //     }
    //   })
    //   .catch((err) => {
    //     Alert.alert(err.message, err + "\n" + JSON.stringify(err, null, 4));
    //   });
  }, []);

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        onLongPress={() => {
          console.log("hello");
        }}
      >
        <View
          style={[
            styles.touchable,
            {
              borderLeftColor: colorOfCategory(item.category_id),
            },
          ]}
        >
          <View style={styles.leftIconContainer}>
            <IconDisplay icon_path={item.image} />
          </View>
          <View style={styles.labelContainer}>
            <View
              style={[
                ExtendedStyleSheet.defaultStyles.flex_1,
                ExtendedStyleSheet.defaultStyles.justifyEnd,
              ]}
            >
              <StyledText weight="4" textStyle={styles.titleLabel}>
                {item.platform}
              </StyledText>
            </View>
            <View
              style={[
                ExtendedStyleSheet.defaultStyles.flex_1,
                ExtendedStyleSheet.defaultStyles.justifyStart,
              ]}
            >
              <StyledText textStyle={styles.descriptionLabel}>
                {item.acc_uname}
              </StyledText>
            </View>
            <View
              style={[
                ExtendedStyleSheet.defaultStyles.flex_1,
                ExtendedStyleSheet.defaultStyles.row,
                ExtendedStyleSheet.defaultStyles.justifyEnd,
                ExtendedStyleSheet.defaultStyles.alignCenter,
              ]}
            >
              <StyledText italic textStyle={styles.categoryLabel}>
                {t("screens.digit.added", { x: date })}
              </StyledText>
            </View>
          </View>
          <View style={styles.rightIconContainer}>
            <MaterialIcons
              name="arrow-forward-ios"
              size={sizes.arrowSize}
              color={theme.purple}
            />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default AccountElement;

const styles = ExtendedStyleSheet.create({
  touchable: {
    marginVertical: heightPercentage(0.75),
    height: heightPercentage(10),
    borderRadius: sizes.borderRadius,
    flexDirection: "row",
    backgroundColor: theme.card,

    borderLeftWidth: 5,
  },
  container: {
    borderRadius: sizes.elementBorderRadius,
  },
  leftIconContainer: {
    ...ExtendedStyleSheet.defaultStyles.center,
    width: "22%",
    padding: "4.5%",
  },
  labelContainer: {
    flex: 1,
    paddingLeft: widthPercentage(1),
  },
  rightIconContainer: {
    width: "15%",
    ...ExtendedStyleSheet.defaultStyles.center,
  },

  titleLabel: {
    fontSize: moderateScale(16),
  },
  descriptionLabel: {
    fontSize: moderateScale(13),
    color: theme.dark_gray,
  },
  categoryLabel: {
    fontSize: moderateScale(11),
    color: theme.soft_gray,
  },
});
