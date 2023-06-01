import { PRODUCTS_URL, CART_URL } from "../../constants/UrlConstants";

export function buildProductUrl(name) {
  return `${PRODUCTS_URL}/${name}`;
}

export function buildCartUrl(cartKey) {
  return `${CART_URL}/${cartKey}`;
}

export function buildCartQuickOrderValidateUrl(cartKey) {
  return`${CART_URL}/validate/${cartKey}`;
}

export function buildCartPurchaseUrl(cartKey) {
  return`${CART_URL}/purchase/${cartKey}`;
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

export function buildOrderParams(page, size, startDate, endDate) {
  const params = {};
  if (page) {
    params.page = page;
  }
  if (size) {
    params.size = size;
  }
  if (startDate) {
    params.startDate = startDate;
  }
  if (endDate) {
    params.endDate = endDate;
  }
  return params;
}
