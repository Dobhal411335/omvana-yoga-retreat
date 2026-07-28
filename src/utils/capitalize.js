/**
 * Capitalize the first character of a string.
 * @param {string} value
 */
export function capitalize(value) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}
