import React, { useRef } from "react";
import { View } from "react-native";
import ExtendedStyleSheet from "../styles/ExtendedStyleSheet";
import theme from "../../constants/colors";
import sizes from "../../constants/sizes";
import {
  heightPercentage,
  widthPercentage,
} from "../../utils/functions.dimensions";
import DigitInput from "./DigitInput";
import { VerificationContext, VerificationValueContext } from "./context";
import { useFocusEffect } from "@react-navigation/native";

type AppContainerProps = {
  appbar?: React.ReactNode;
  children?: React.ReactNode;
  floatingButton?: React.ReactNode;
  height?: number;
  paddingHorizontalPercentage?: number;
  requireDigitAuth?: boolean;
};

const ProtectedContainer = ({
  appbar,
  children,
  floatingButton,
  height,
  paddingHorizontalPercentage,
  requireDigitAuth,
}: AppContainerProps) => {
  const [isVerified, setVerified] = React.useState<boolean>(false);

  useFocusEffect(
    React.useCallback(() => {
      // change this to false if auth is required, true otherwise
      let ver = false;

      if (requireDigitAuth === false) {
        ver = true;
      }

      setVerified(ver);
    }, [])
  );

  return (
    <VerificationContext.Provider value={setVerified}>
      <VerificationValueContext.Provider value={isVerified}>
        {!isVerified ? (
          <DigitInput />
        ) : (
          <View style={[styles.container]}>
            {appbar && appbar}
            <View
              style={[
                styles.card,
                height ? { height } : { flex: 4 },
                {
                  paddingHorizontal: paddingHorizontalPercentage
                    ? widthPercentage(paddingHorizontalPercentage as number)
                    : widthPercentage(8),
                },
              ]}
            >
              {children ?? null}
            </View>
            {floatingButton && (
              <View style={styles.fabContainer}>{floatingButton}</View>
            )}
          </View>
        )}
      </VerificationValueContext.Provider>
    </VerificationContext.Provider>
  );
};

export default ProtectedContainer;

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
  fabContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    marginBottom: heightPercentage(8),
    marginRight: widthPercentage(8),
  },
});
