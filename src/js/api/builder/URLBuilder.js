import { PRODUCTS_URL } from "../../constants/UrlConstants";

export function buildProductUrl(name) {
  return `${PRODUCTS_URL}/${name}`;
}

export function buildProductParams(page, size, category, type, earlyAccess = true) {
  const params = {};
  if (page) {
    params.page = page;
  }
  if (size) {
    params.size = size;
  }
  if (!earlyAccess) {
    params.earlyAccess = false;
  }
  if (category) {
    params.category = category; 
   }
   if (type) {
     params.type = type; 
   }
   return params;
}

export function buildUserParams(page, size) {
  const params = {};
  if (page) {
    params.page = page;
  }
  if (size) {
    params.size = size;
  }
  return params;
}
