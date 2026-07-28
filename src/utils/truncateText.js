/**
 * Truncate text to a maximum length with an ellipsis.
 * @param {string} value
 * @param {number} [maxLength=120]
 */
export function truncateText(value, maxLength = 120) {
  if (!value) return "";
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trimEnd()}...`;
}
