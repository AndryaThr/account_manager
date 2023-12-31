import React from "react";
import { View } from "react-native";
import ExtendedStyleSheet from "../styles/ExtendedStyleSheet";
import theme from "../../constants/colors";
import sizes from "../../constants/sizes";
import {
  heightPercentage,
  widthPercentage,
} from "../../utils/functions.dimensions";
import { useFocusEffect } from "@react-navigation/native";
import { color } from "react-native-reanimated";
import { AppBarContext } from "../../main/context";

type AppContainerProps = {
  appbar: React.ReactNode;
  children: React.ReactNode;
  height?: number;
  paddingHorizontalPercentage?: number;
};

const AppContainer = ({
  appbar,
  children,
  height,
  paddingHorizontalPercentage,
}: AppContainerProps) => {
  const { setColor } = React.useContext(AppBarContext);

  useFocusEffect(
    React.useCallback(() => {
      if (!appbar) {
        setColor(theme.background);
      }
    }, [])
  );

  return (
    <View style={[styles.container]}>
      {appbar && appbar}
      <View
        style={[
          styles.card,
          height ? { height } : { flex: 4 },
          {
            paddingHorizontal: paddingHorizontalPercentage
              ? widthPercentage(paddingHorizontalPercentage)
              : widthPercentage(8),
          },
        ]}
      >
        {children ?? null}
      </View>
    </View>
  );
};

export default AppContainer;

const styles = ExtendedStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.purple,
  },
  card: {
    backgroundColor: theme.background,
    borderTopEndRadius: sizes.cardBorderRadius,
    borderTopStartRadius: sizes.cardBorderRadius,

    justifyContent: "space-between",
  },
});
