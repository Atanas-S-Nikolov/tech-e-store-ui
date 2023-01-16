import { PRODUCTS_URL } from "../../constants/UrlConstants";

export function buildProductUrl(name) {
  return `${PRODUCTS_URL}/${name}`;
}