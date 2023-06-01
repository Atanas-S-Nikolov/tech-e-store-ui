import { store } from "@/js/redux/store";

export const CART_ITEMS_STEP = 'Cart items';
export const CART_CHECKOUT_STEP = 'Checkout';
export const CART_ORDER_INFORMATION_STEP = `Order information`;

const AUTHENTICATED_STEPS = [CART_ITEMS_STEP, CART_CHECKOUT_STEP];
const STEPS = [CART_ITEMS_STEP, CART_ORDER_INFORMATION_STEP, CART_CHECKOUT_STEP];

export default function getSteps() {
  const { isAuthenticated } = store.getState().authentication;
  return isAuthenticated ? AUTHENTICATED_STEPS : STEPS;
}
