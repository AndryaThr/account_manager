import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import theme, { colorOfCategory } from "../../constants/colors";
import {
  heightPercentage,
  moderateScale,
  widthPercentage,
} from "../../utils/functions.dimensions";
import sizes from "../../constants/sizes";
import ExtendedStyleSheet from "../styles/ExtendedStyleSheet";
import { AccountInformationType } from "../../controller/types";
import Icons from "../../controller/backend/Icons";
import StyledText from "../texts/StyledText";
import * as FS from "expo-file-system";
import { MaterialIcons } from "@expo/vector-icons";
import IconDisplay from "../image/IconDisplay";

type AccountElementType = {
  item: AccountInformationType;
  onPress?: () => void;
};

const AccountElement = ({ item, onPress }: AccountElementType) => {
  const [im, setIm] = React.useState<string>(
    Icons.resolveImageUri("00", "Default.png")
  );

  const handlePress = React.useCallback(() => {
    if (onPress) {
      onPress();
    }
  }, [item]);

  React.useEffect(() => {
    FS.getInfoAsync(Icons.resolveImageUri(item.folder, item.icon)).then(
      (val) => {
        if (val.exists) {
          setIm(val.uri);
        }
      }
    );
  }, []);

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={[
          styles.touchable,
          {
            borderLeftColor: colorOfCategory(item.category_id),
          },
        ]}
      >
        <View style={styles.leftIconContainer}>
          <IconDisplay icon_path={im} />
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
              ExtendedStyleSheet.defaultStyles.justifyCenter,
            ]}
          >
            <StyledText textStyle={styles.descriptionLabel}>
              {item.acc_name}
            </StyledText>
          </View>
          <View
            style={[
              ExtendedStyleSheet.defaultStyles.flex_1,
              ExtendedStyleSheet.defaultStyles.row,
              ExtendedStyleSheet.defaultStyles.justifyEnd,
            ]}
          >
            <StyledText italic textStyle={styles.categoryLabel}>
              {item.category_fr}
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
  );
};

export default AccountElement;

const styles = ExtendedStyleSheet.create({
  touchable: {
    marginVertical: heightPercentage(1),
    height: heightPercentage(9),
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
    width: "25%",
    padding: "3%",
  },
  labelContainer: {
    flex: 1,
    paddingLeft: widthPercentage(1),
  },
  rightIconContainer: {
    width: "17%",
    ...ExtendedStyleSheet.defaultStyles.center,
  },

  titleLabel: {
    fontSize: moderateScale(18),
  },
  descriptionLabel: {
    fontSize: moderateScale(14),
    color: theme.dark_gray,
  },
  categoryLabel: {
    fontSize: moderateScale(13),
    color: theme.soft_gray,
  },
});
