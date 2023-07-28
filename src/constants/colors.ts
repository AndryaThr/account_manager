import { NumberBetweenZeroAndFifteen } from "../controller/types";

const theme = {
  background: "#ffffff",
  card: "#f5f5f5",
  blue: "#6D72C3",
  purple: "#5941A9",
  dark_gray: "#514F59",
  soft_gray: "#95939F",
  dark: "#1D1128",
  backdrop: "#000000",
  warning: "#d32f2f",

  text: "#ffffff",
  negative_text: "#dddddd",

  error: "#ff0000",
  category_colors: {
    0: "#50edba",
    1: "#D53032",
    2: "#4E5452",
    3: "#DC9D00",
    4: "#999950",
    5: "#D84B20",
    6: "#EA899A",
    7: "#FFFF00",
    8: "#EC7C26",
    9: "#73dae4",
    10: "#d70e86",
    11: "#2d76ec",
    12: "#b6f963",
    13: "#6ff335",
    14: "#341536",
    15: "#375b68",
  },

  transparent: {
    blue: "#6D72C377",
  },
};

export function colorOfCategory(category: NumberBetweenZeroAndFifteen) {
  return theme.category_colors[category];
}

export default theme;
