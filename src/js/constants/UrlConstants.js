const AUTH = "/auth";

export const HOME_URL = "/";
export const LOGIN_URL = `${AUTH}/login`;
export const REGISTER_URL = `${AUTH}/register`;
export const REFRESH_TOKEN_URL = `${AUTH}/refresh_token`;
export const PRODUCTS_URL = "/product";
export const PRODUCT_URL = `${PRODUCTS_URL}/:name`;
export const NAVIGATE_PRODUCTS_URL= `${PRODUCTS_URL}/:early_access?/:category?/:type?`;
export const CART_URL = "/cart";
export const COMPARE_URL = "/compare";
export const FAVORITES_URL = "/favorites";
