import { Text, TextProps, TextStyle } from "react-native";
import ExtendedStyleSheet from "../styles/ExtendedStyleSheet";

type ExtendedTextProps = {
  children?: React.ReactNode | string | JSX.Element;
  italic?: boolean;
  weight?: "1" | "2" | "3" | "4" | "5";
  textStyle?: Omit<TextStyle, "fontStyle" | "fontWeight">;
} & Partial<Omit<TextProps, "style" | "children">>;

const StyledText = (props: ExtendedTextProps) => {
  const styles = buildStyle(props.italic, props.weight);

  return (
    <Text {...props} style={[styles.main, props.textStyle]}>
      {props.children}
    </Text>
  );
};

export default StyledText;

const buildStyle = (
  isItalic: boolean = false,
  weight: "1" | "2" | "3" | "4" | "5" = "3"
) => {
  let font = "";
  switch (weight) {
    case "1":
      font = isItalic ? "MontserratItalicThin" : "MontserratThin";
      break;
    case "2":
      font = isItalic ? "MontserratItalicLight" : "MontserratLight";
      break;
    case "4":
      font = isItalic ? "MontserratItalicSemiBold" : "MontserratSemiBold";
      break;
    case "5":
      font = isItalic ? "MontserraItalicBold" : "MontserraBold";
      break;
    case "3":
    default:
      font = isItalic ? "MontserratItalicRegular" : "MontserratRegular";
      break;
  }

  return ExtendedStyleSheet.create({
    main: {
      fontFamily: font,
    },
  });
};
