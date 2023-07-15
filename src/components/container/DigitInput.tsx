import React, { useCallback, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList, TouchableOpacity, View, Animated } from "react-native";
import ExtendedStyleSheet from "../styles/ExtendedStyleSheet";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppBarContext } from "../../main/context";
import theme from "../../constants/colors";
import {
  heightPercentage,
  moderateScale,
  widthPercentage,
} from "../../utils/functions.dimensions";
import StyledText from "../texts/StyledText";
import { useTranslation } from "react-i18next";
import { Auth } from "../../controller/backend/Auth";
import { StateType, useAppSelector } from "../../config/redux";
import { decryptString } from "../../config/crypto/crypto";
import { VerificationContext } from "./context";

type InitialPinKeys = "a" | "b" | "c" | "d" | "e" | "f";
const initialPin = { a: "", b: "", c: "", d: "", e: "", f: "" };
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, "v", 0, "x"];

const screenBackground = theme.purple;
const xTranslation = 3;
const shakeDuration = 50;
const flashDuration = 150;

const DigitInput = () => {
  const [pin, setPin] = React.useState(initialPin);
  const [hidden, setHidden] = React.useState<boolean>(true);
  const [isAnimating, setIsAnimating] = React.useState<boolean>(false);
  const [decryptedDigit, setDecryptedDigit] = React.useState<string>("");

  const { user } = useAppSelector<StateType>((state) => state.authReducer);
  const setVerified = React.useContext(VerificationContext);

  const { t } = useTranslation();
  const { color, setColor } = React.useContext(AppBarContext);
  const navigation = useNavigation();

  const shakeAnimation = React.useRef(new Animated.Value(0)).current;
  const textFlashAnimation = React.useRef(new Animated.Value(0)).current;
  const dotFlashAnimation = React.useRef(new Animated.Value(0)).current;

  const animatedViewShake = {
    transform: [{ translateX: shakeAnimation }],
  };

  const animatedTextFlashColor = {
    color: textFlashAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.text, theme.error],
    }),
  };

  const animatedDotFlashColor = {
    backgroundColor: dotFlashAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.text, theme.error],
    }),
  };

  const pinValue = React.useMemo(() => {
    let pinValue = Object.keys(pin)
      .map((pinKey) => pin[pinKey as InitialPinKeys])
      .filter((x) => x)
      .join("");

    return pinValue;
  }, [pin]);

  const startErrorAnimation = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      Animated.parallel([
        Animated.sequence([
          Animated.timing(shakeAnimation, {
            toValue: xTranslation,
            duration: shakeDuration,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnimation, {
            toValue: -xTranslation,
            duration: shakeDuration,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnimation, {
            toValue: xTranslation,
            duration: shakeDuration,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnimation, {
            toValue: -xTranslation,
            duration: shakeDuration,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnimation, {
            toValue: xTranslation,
            duration: shakeDuration,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnimation, {
            toValue: 0,
            duration: shakeDuration,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(textFlashAnimation, {
            toValue: 1,
            duration: flashDuration,
            useNativeDriver: false,
          }),
          Animated.timing(textFlashAnimation, {
            toValue: 0,
            duration: flashDuration,
            useNativeDriver: false,
          }),
          Animated.timing(textFlashAnimation, {
            toValue: 1,
            duration: flashDuration,
            useNativeDriver: false,
          }),
          Animated.timing(textFlashAnimation, {
            toValue: 0,
            duration: flashDuration,
            useNativeDriver: false,
          }),
        ]),
        Animated.sequence([
          Animated.timing(dotFlashAnimation, {
            toValue: 1,
            duration: flashDuration,
            useNativeDriver: false,
          }),
          Animated.timing(dotFlashAnimation, {
            toValue: 0,
            duration: flashDuration,
            useNativeDriver: false,
          }),
          Animated.timing(dotFlashAnimation, {
            toValue: 1,
            duration: flashDuration,
            useNativeDriver: false,
          }),
          Animated.timing(dotFlashAnimation, {
            toValue: 0,
            duration: flashDuration,
            useNativeDriver: false,
          }),
        ]),
      ]).start(() => {
        setIsAnimating(false);
      });
    }
  };

  const onEnterPin = React.useCallback(
    (btn: string | number) => {
      if (typeof btn == "number") {
        if (pinValue.length < 6) {
          for (let i = 0; i < Object.keys(pin).length; i += 1) {
            let key = Object.keys(pin)[i];
            if (!pin[key as InitialPinKeys]) {
              const newPin = { ...pin };
              newPin[key as InitialPinKeys] = btn.toString();
              setPin(newPin);
              break;
            }
          }
        }
      } else {
        if (btn == "x") {
          for (let i = 0; i < Object.keys(pin).length; i += 1) {
            let key = Object.keys(pin).reverse()[i];
            if (pin[key as InitialPinKeys]) {
              const newPin = { ...pin };
              newPin[key as InitialPinKeys] = "";
              setPin(newPin);
              break;
            }
          }
        }

        if (btn == "v") {
          handleChangePasswordVisibility();
        }
      }
    },
    [pin]
  );

  const clearValues = useCallback(() => {
    setPin(initialPin);
  }, []);

  const handleChangePasswordVisibility = useCallback(() => {
    setHidden((v) => !v);
  }, []);

  const handleBackButtonPress = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      console.log("cannot go back");
    }
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      if (color !== screenBackground) {
        setColor(screenBackground);
      }
    }, [])
  );

  useEffect(() => {
    if (pinValue.length === Object.keys(pin).length) {
      if (decryptedDigit === pinValue) {
        setVerified(true);
      } else {
        startErrorAnimation();
      }
    }
  }, [pinValue]);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        const digit = decryptString(user.user_digit, user.user_private_key);
        setDecryptedDigit(digit);
      }
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={moderateScale(35)}
            color={theme.text}
            onPress={handleBackButtonPress}
          />
        </View>
        <View style={styles.titleContainer}>
          <StyledText weight="4" textStyle={styles.titleStyle}>
            {t("screens.digit.title")}
          </StyledText>
        </View>
      </View>
      <View
        style={[
          ExtendedStyleSheet.defaultStyles.center,
          { height: heightPercentage(15) },
        ]}
      >
        <View style={styles.descriptionIconContainer}>
          <MaterialCommunityIcons
            name="server-security"
            size={moderateScale(60)}
            color={theme.text}
            onPress={handleBackButtonPress}
          />
        </View>
        <View style={styles.descriptionLabelContainer}>
          <StyledText textStyle={styles.descriptionStyle}>
            {t("screens.digit.description")}
          </StyledText>
        </View>
      </View>
      <View style={styles.topContainer}>
        <Animated.View style={[styles.optContainer, animatedViewShake]}>
          {Object.keys(pin).map((pinKey) => (
            <View key={pinKey} style={styles.optSubContainer}>
              {pin[pinKey as InitialPinKeys] ? (
                hidden ? (
                  <Animated.View
                    style={[styles.pinDot, animatedDotFlashColor]}
                  />
                ) : (
                  <Animated.Text style={[styles.pin, animatedTextFlashColor]}>
                    {pin[pinKey as InitialPinKeys]}
                  </Animated.Text>
                )
              ) : (
                <View style={styles.empty} />
              )}
            </View>
          ))}
        </Animated.View>
      </View>
      <View style={styles.numberContainer}>
        <FlatList
          data={data}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onEnterPin(item)}>
              <View style={styles.btn}>
                {typeof item === "string" ? (
                  item === "x" ? (
                    <MaterialCommunityIcons
                      name="backspace-outline"
                      size={moderateScale(25)}
                      color={theme.text}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name={!hidden ? "eye" : "eye-off"}
                      size={moderateScale(30)}
                      color={theme.text}
                    />
                  )
                ) : (
                  <StyledText weight="4" textStyle={styles.btnTxt}>
                    {item}
                  </StyledText>
                )}
              </View>
            </TouchableOpacity>
          )}
          numColumns={3}
          contentContainerStyle={styles.flatlistContentStyle}
        />
      </View>
    </View>
  );
};

export default DigitInput;

const iconButtonSize = widthPercentage(20);

const styles = ExtendedStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: screenBackground,
  },
  appBar: {
    height: heightPercentage(8),
    justifyContent: "space-between",
    flexDirection: "row",
  },
  topContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  optContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  numberContainer: {
    width: "100%",
    flexDirection: "row",
    flex: 3,
  },
  btn: {
    ...ExtendedStyleSheet.defaultStyles.center,
    width: iconButtonSize,
    height: iconButtonSize,
    backgroundColor: theme.transparent.blue,
    borderRadius: iconButtonSize / 2,
    marginHorizontal: widthPercentage(3),
    marginBottom: heightPercentage(1),
  },
  btnTxt: {
    fontSize: moderateScale(30),
    color: theme.text,
  },
  optSubContainer: {
    width: 100 / 10 + "%",
    marginHorizontal: widthPercentage(1),
    alignItems: "center",
    justifyContent: "center",
  },
  pinDot: {
    height: 15,
    width: 15,
    borderRadius: 10,
    backgroundColor: theme.text,
  },
  pin: {
    fontSize: moderateScale(30),
    color: theme.text,
    fontWeight: "700",
  },
  empty: {
    height: 2,
    width: "100%",
    backgroundColor: theme.soft_gray,
  },
  flatlistContentStyle: {
    alignItems: "center",
  },

  iconContainer: {
    ...ExtendedStyleSheet.defaultStyles.center,
    width: "20%",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
  },
  titleStyle: {
    fontSize: moderateScale(20),
    color: theme.text,
  },
  descriptionStyle: {
    fontSize: moderateScale(16),
    color: theme.text,
    textAlign: "center",
  },
  descriptionIconContainer: {
    ...ExtendedStyleSheet.defaultStyles.center,
    width: "80%",
  },
  descriptionLabelContainer: {
    marginTop: "5%",
  },
});
