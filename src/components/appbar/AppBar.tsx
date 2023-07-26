import React from "react";
import {
  View,
  TouchableNativeFeedback,
  GestureResponderEvent,
} from "react-native";
import ExtendedStyleSheet from "../styles/ExtendedStyleSheet";
import StyledText from "../texts/StyledText";
import sizes from "../../constants/sizes";
import theme from "../../constants/colors";
import {
  heightPercentage,
  widthPercentage,
  moderateScale,
} from "../../utils/functions.dimensions";
import { useTranslation } from "react-i18next";

type AppBarProps = {
  title: string;
  subtitle?: string;
  leftIcon?: React.ReactNode;
  onLeftIconPress?: (event?: GestureResponderEvent) => void;
  rightIcon?: React.ReactNode;
  onRightIconPress?: (event?: GestureResponderEvent) => void;
  description?: string;
  subdescription?: string;
  buttonLabel?: string;
  onButtonPress?: (event?: GestureResponderEvent) => void;
};

const AppBar = ({
  title,
  subtitle,
  leftIcon,
  onLeftIconPress,
  rightIcon,
  onRightIconPress,
  description,
  subdescription,
  buttonLabel,
  onButtonPress,
}: AppBarProps) => {
  const leftIconPressAction = React.useCallback(
    async (event: GestureResponderEvent) => {
      if (onLeftIconPress) {
        onLeftIconPress(event);
      }
    },
    [onLeftIconPress]
  );
  const rightIconPressAction = React.useCallback(
    async (event: GestureResponderEvent) => {
      if (onRightIconPress) {
        onRightIconPress(event);
      }
    },
    [onRightIconPress]
  );
  const buttonPressAction = React.useCallback(
    async (event: GestureResponderEvent) => {
      if (onButtonPress) {
        onButtonPress(event);
      }
    },
    [onButtonPress]
  );

  return (
    <View style={styles.background}>
      <View style={[styles.circle, styles.position1]} />
      <View style={[styles.circle, styles.position2]} />
      <View
        style={[
          ExtendedStyleSheet.defaultStyles.flex_1,
          styles.appTitleMainContainer,
        ]}
      >
        <View
          style={[
            ExtendedStyleSheet.defaultStyles.flex_1,
            styles.appBarContainer,
          ]}
        >
          {leftIcon && (
            <TouchableNativeFeedback
              disabled={onLeftIconPress ? false : true}
              onPress={leftIconPressAction}
            >
              <View style={[styles.iconContainer, styles.leftIconContainer]}>
                {leftIcon}
              </View>
            </TouchableNativeFeedback>
          )}
          <View style={styles.appTitleContainer}>
            <StyledText textStyle={styles.appTitleLabel} weight="5">
              {title}
            </StyledText>
            <StyledText textStyle={styles.appDescriptionLabel} weight="3">
              {subtitle}
            </StyledText>
          </View>
          {rightIcon && (
            <TouchableNativeFeedback
              disabled={onRightIconPress ? false : true}
              onPress={rightIconPressAction}
            >
              <View style={[styles.iconContainer, styles.rightIconContainer]}>
                {rightIcon}
              </View>
            </TouchableNativeFeedback>
          )}
        </View>
        {description && (
          <View
            style={[
              ExtendedStyleSheet.defaultStyles.flex_2,
              styles.appActionContainer,
            ]}
          >
            {description && (
              <View style={styles.appActionLeftContainer}>
                {description && (
                  <StyledText weight="4" textStyle={styles.appActionLeftTitle}>
                    {description}
                  </StyledText>
                )}
                {subdescription && (
                  <StyledText
                    weight="3"
                    textStyle={styles.appActionLeftSubtitle}
                  >
                    {subdescription}
                  </StyledText>
                )}
              </View>
            )}
            {buttonLabel && (
              <View style={styles.appActionRightContainer}>
                <TouchableNativeFeedback onPress={buttonPressAction}>
                  <View style={styles.appActionLeftButton}>
                    <StyledText
                      weight="4"
                      textStyle={styles.appActionLeftButtonLabel}
                    >
                      {buttonLabel}
                    </StyledText>
                  </View>
                </TouchableNativeFeedback>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default AppBar;

const styles = ExtendedStyleSheet.create({
  background: {
    flex: 1,
  },
  card: {
    backgroundColor: theme.background,
    flex: 4,
    borderTopEndRadius: sizes.cardBorderRadius,
    borderTopStartRadius: sizes.cardBorderRadius,
    paddingHorizontal: widthPercentage(8),
    justifyContent: "space-between",
  },
  circle: {
    backgroundColor: theme.card,
    opacity: 0.2,
    width: sizes.circleSize,
    height: sizes.circleSize,
    borderRadius: sizes.circleSize / 2,
    position: "absolute",
  },
  position1: {
    top: -sizes.circleSize / 3,
    right: 0,
  },
  position2: {
    top: 0,
    right: -sizes.circleSize / 2,
  },

  /* title */
  appTitleMainContainer: {
    paddingHorizontal: widthPercentage(5),
    paddingTop: heightPercentage(1),
    ...ExtendedStyleSheet.defaultStyles.center,
  },
  appTitleContainer: {
    alignItems: "center",
    flex: 1,
  },
  appActionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  appBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appTitleLabel: {
    fontSize: moderateScale(20),
    color: theme.text,
  },
  appDescriptionLabel: {
    fontSize: moderateScale(14),
    color: theme.text,
    textAlign: "center",
  },

  /* icon container */
  iconContainer: {
    ...ExtendedStyleSheet.defaultStyles.center,
    width: "15%",
  },
  leftIconContainer: {},
  rightIconContainer: {},

  /* actions */
  appActionLeftContainer: {
    flex: 2,
    justifyContent: "center",
  },
  appActionRightContainer: {
    ...ExtendedStyleSheet.defaultStyles.justifyCenter,
    alignItems: "flex-end",
    flex: 1,
  },
  appActionLeftTitle: {
    color: theme.text,
    fontSize: moderateScale(16),
  },
  appActionLeftSubtitle: {
    color: theme.text,
  },
  /* button */
  appActionLeftButtonLabel: {
    color: theme.purple,
    fontSize: moderateScale(16),
  },
  appActionLeftButton: {
    ...ExtendedStyleSheet.defaultStyles.center,
    backgroundColor: theme.card,
    borderRadius: sizes.borderRadius,
    height: "40%",
    paddingHorizontal: widthPercentage(5),
  },
});
