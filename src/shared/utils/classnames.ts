/**
 * Utility function that conditionally joins class names into a single string.
 * Works similarly to the popular `classnames` library.
 *
 * Accepts any mix of:
 * - strings
 * - objects where keys are class names and values indicate whether to include them
 * - null or undefined values (ignored)
 *
 * @param {...(string | Record<string, boolean> | undefined | null)} args
 *  A list of class name values to evaluate.
 *
 * @returns {string} A space-separated string of valid class names.
 *
 * @example
 * classNames("btn", { active: true, disabled: false }, undefined);
 * // Returns: "btn active"
 */
export function classNames(
  ...args: (string | Record<string, boolean> | undefined | null)[]
): string {
  const classes: string[] = [];

  args.forEach((arg) => {
    if (!arg) return;

    if (typeof arg === "string") {
      classes.push(arg);
    } else if (typeof arg === "object") {
      for (const key in arg) {
        if (arg[key]) {
          classes.push(key);
        }
      }
    }
  });

  return classes.join(" ");
}
