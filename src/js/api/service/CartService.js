import { request, buildAccessTokenConfig } from "../backend";

export function getCart(usernameDto) {
  return request.post("/cart", JSON.stringify(usernameDto), buildAccessTokenConfig());
}

export function addProductToCart(cartDto) {
  return request.put("/cart/add", JSON.stringify(cartDto), buildAccessTokenConfig());
}

export function removeProductFromCart(cartDto) {
  return request.put("/cart/remove", JSON.stringify(cartDto), buildAccessTokenConfig());
}

export function cartPurchase(usernameDto) {
  return request.put("/cart/purchase", JSON.stringify(usernameDto), buildAccessTokenConfig())
}

export function clearCart(usernameDto) {
  return request.put("/cart/clear", JSON.stringify(usernameDto), buildAccessTokenConfig());
}

export function deleteCart(usernameDto) {
  return request.delete("/cart", JSON.stringify(usernameDto), buildAccessTokenConfig());
}