import { Dimensions } from "react-native";

const guidelineBaseWidth = 430;
const guidelineBaseHeight = 924;

/**
 * convert size to fit screen width
 *
 * @param {number} size : size to be converted
 * @returns
 */
export const hScale = (size: number) =>
  (Dimensions.get("window").width / guidelineBaseWidth) * size;

/**
 * convert size to fit screen height
 *
 * @param {number} size : size to be converted
 * @returns
 */
export const vScale = (size: number) =>
  (Dimensions.get("window").height / guidelineBaseHeight) * size;

/**
 * normalize fontSize to fit screen density
 *
 * @param {number} size : size to be converted
 * @param {number} factor : conversion factor
 * @returns
 */
export const moderateScale = (size: number, factor = 0.7) =>
  size + (hScale(size) - size) * factor;

/**
 * returns height of percentage% of the screen
 *
 * @param {number} percentage
 * @returns {number}
 */
export function heightPercentage(percentage: number) {
  if (percentage) {
    return (Dimensions.get("window").height * percentage) / 100;
  } else {
    return Dimensions.get("window").height;
  }
}

/**
 * returns width of percentage% of the screen
 *
 * @param {number} percentage
 * @returns {number}
 */
export function widthPercentage(percentage: number) {
  if (percentage) {
    return (Dimensions.get("window").width * percentage) / 100;
  } else {
    return Dimensions.get("window").width;
  }
}

// CONSTANTS
export const screen_width = Dimensions.get("window").width;
export const screen_height = Dimensions.get("window").height;
