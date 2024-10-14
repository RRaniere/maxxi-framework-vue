export const DirAttrSet = (dir: 'ltr' | 'rtl') => {
  // Check if document exists for SSR
  if (typeof document !== 'undefined') document.documentElement.setAttribute('dir', dir);
};

/**
 * Convert Hex color to rgb
 */

export const HexToRgb = (hex: string) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

  hex = hex.replace(shorthandRegex, (m: string, r: string, g: string, b: string) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result ? `${Number.parseInt(result[1], 16)},${Number.parseInt(result[2], 16)},${Number.parseInt(result[3], 16)}` : null;
};
