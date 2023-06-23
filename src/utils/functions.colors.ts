function isColorDark(color: string) {
  // Remove any leading "#" symbol from the color string
  if (color.startsWith("#") && color.length <= 7) {
    color = color.slice(1);
  } else {
    throw new Error("unsupported color format");
  }

  // Convert the color to its RGB components
  const red = parseInt(color.substring(0, 2), 16);
  const green = parseInt(color.substring(2, 4), 16);
  const blue = parseInt(color.substring(4, 6), 16);

  // Calculate the relative luminance
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

  // Compare the relative luminance with the threshold (0.5 for simplicity)
  return luminance < 0.5;
}

export { isColorDark };
