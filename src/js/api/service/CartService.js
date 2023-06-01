import { request } from "../backend";
import { buildCartUrl, buildCartQuickOrderValidateUrl, buildCartPurchaseUrl } from "../builder/URLBuilder";

export function createCart(cartDto) {
  return request.post("/cart", JSON.stringify(cartDto));
}

export function getCart(cartKey) {
  return request.get(buildCartUrl(cartKey));
}

export function addProductToCart(updateCartDto) {
  return request.put("/cart/add", JSON.stringify(updateCartDto));
}

export function removeProductFromCart(updateCartDto) {
  return request.put("/cart/remove", JSON.stringify(updateCartDto));
}

export function validateQuickOrder(cartKey, quickOrderDto) {
  return request.put(buildCartQuickOrderValidateUrl(cartKey), JSON.stringify(quickOrderDto));
}

export function cartPurchase(cartKey, quickOrderDto) {
  return request.put(buildCartPurchaseUrl(cartKey), JSON.stringify(quickOrderDto));
}

export function deleteCart(cartKey) {
  return request.delete(buildCartUrl(cartKey));
}
