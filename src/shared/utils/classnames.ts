// This function mimics the behavior of the 'classnames' library.
export function classNames(...args: (string | Record<string, boolean> | undefined | null)[]): string {
  const classes: string[] = [];

  args.forEach(arg => {
    if (!arg) return;

    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (typeof arg === 'object') {
      for (const key in arg) {
        if (arg[key]) { // If the value is true...
          classes.push(key); // ...push the key as a class.
        }
      }
    }
  });

  return classes.join(' ');
}