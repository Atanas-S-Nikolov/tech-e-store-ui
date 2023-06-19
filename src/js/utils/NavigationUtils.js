import { store } from "@/js/redux/store";

const { isAuthenticated } = store.getState().authentication;

export function buildProductsNavigationUrlByCategory(category) {
  return isAuthenticated ? `/product?category=${category}` : `/product?earlyAccess=false&category=${category}`;
}

export function buildProductsNavigationUrlByCategoryAndType(category, type) {
  return isAuthenticated 
    ? `/product?category=${category}&type=${type}`
    : `/product?earlyAccess=false&category=${category}&type=${type}`;
}

export function buildProductsSearchQueryUrl(keyword) {
  return isAuthenticated
    ? `/product/search/query?keyword=${keyword}`
    : `/product/search/query?earlyAccess=false&keyword=${keyword}`;
}
