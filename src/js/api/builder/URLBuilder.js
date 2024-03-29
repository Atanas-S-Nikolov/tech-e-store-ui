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

export function buildProductNameParam(name) {
  const params = {};
   if (name) {
     params.name = name; 
   }
   return params;
}

export function buildProductParams(page, size, category, type, earlyAccess = true) {
  const params = {};
  if (page || page >= 0) {
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
  if (page || page >= 0) {
    params.page = page;
  }
  if (size) {
    params.size = size;
  }
  return params;
}

export function buildOrderParams(page, size, startDate, endDate) {
  const params = {};
  if (page || page >= 0) {
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

export function buildSearchParams(keyword, earlyAccess = true) {
  const params = {};
  if (!earlyAccess) {
    params.earlyAccess = false;
  }
  if (keyword) {
    params.keyword = keyword; 
   }
   return params;
}

export function buildSearchQueryParams(page, size, keyword, earlyAccess = true) {
  const params = {};
  if (page || page >= 0) {
    params.page = page;
  }
  if (size) {
    params.size = size;
  }
  if (!earlyAccess) {
    params.earlyAccess = false;
  }
  if (keyword) {
    params.keyword = keyword; 
   }
   return params;
}
