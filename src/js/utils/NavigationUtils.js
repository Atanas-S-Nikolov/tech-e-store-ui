import { store } from "@/js/redux/store";

const state = store.getState();
const { isAuthenticated } = state.authentication;

export function buildProductsNavigationUrlByCategory(category) {
  return isAuthenticated ? `/product?category=${category}` : `/product?early_access=false&category=${category}`;
}

export function buildProductsNavigationUrlByCategoryAndType(category, type) {
  return isAuthenticated 
    ? `/product?category=${category}&type=${type}`
    : `/product?early_access=false&category=${category}&type=${type}`;
}