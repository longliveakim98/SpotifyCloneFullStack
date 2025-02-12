function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  return [r, g, b];
}

function calculateLuminance([r, g, b]) {
  return 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
}

export function sortColorsByBrightness(colors) {
  return colors.sort(
    (a, b) => calculateLuminance(hexToRgb(b)) - calculateLuminance(hexToRgb(a))
  );
}
