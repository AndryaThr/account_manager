import { StyleSheet, Dimensions } from "react-native";

const { width, height, scale, fontScale } = Dimensions.get("window");

const ExtendedStyleSheet = {
  ...StyleSheet,

  windowWidth: width,
  windowHeight: height,
  scale: scale,
  fontScale: fontScale,

  defaultStyles: StyleSheet.create({
    flex_1: { flex: 1 },
    flex_2: { flex: 2 },

    row: { flexDirection: "row" },

    center: { alignItems: "center", justifyContent: "center" },
    absolute: { position: "absolute" },
    alignCenter: { alignItems: "center" },
    alignEnd: { alignItems: "flex-end" },
    alignStart: { alignItems: "flex-start" },
    justifyCenter: { justifyContent: "center" },
    justifyEnd: { justifyContent: "flex-end" },
    justifyStart: { justifyContent: "flex-start" },
    justifySpaceBetween: { justifyContent: "space-between" },

    elevated_1: { elevation: 1 },
    elevated_2: { elevation: 2 },
    elevated_5: { elevation: 5 },

    full_width: { width: "100%" },
    full_height: { height: "100%" },

    half_width: { width: "50%" },
    half_height: { height: "50%" },
  }),
};

export default ExtendedStyleSheet;
