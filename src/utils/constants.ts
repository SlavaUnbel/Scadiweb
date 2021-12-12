const getPublicFolder = (file: string) => process.env.PUBLIC_URL + file;

export const Icons = {
  brand: getPublicFolder("/assets/brand-icon.png"),
  expand: getPublicFolder("/assets/expand-icon.png"),
  cart: getPublicFolder("/assets/empty-cart-icon.png"),
  whiteCart: getPublicFolder("/assets/white-cart-icon.png"),
};

export const loader = process.env.PUBLIC_URL + "/assets/loader.svg";
export const notFound = process.env.PUBLIC_URL + "/assets/not-found.png";
