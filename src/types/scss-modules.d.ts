// Type declarations for SCSS modules so TS can import `*.module.scss` files
declare module "*.module.scss" {
  const classes: { [className: string]: string };
  export default classes;
}

// Generic declaration for plain `.scss` imports (in case some imports use plain scss)
declare module "*.scss" {
  const content: { [className: string]: string } | string;
  export default content;
}
