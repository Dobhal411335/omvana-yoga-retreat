/**
 * Pause execution for a given number of milliseconds.
 * @param {number} ms
 */
export function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
