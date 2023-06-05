import {
  ORDER_URL, 
  GET_ORDER_URL, 
  GET_ALL_ORDERS_URL, 
  DELIVER_ORDER_URL,
  CANCEL_ORDER_URL,
  RETURN_ORDER_URL, 
  FINALIZE_ORDER_URL 
} from "@/js/constants/UrlConstants";
import { buildAccessTokenConfig, request } from "../backend";
import { buildOrderParams } from "../builder/URLBuilder";

export function createOrder(orderDto) {
  return request.post(ORDER_URL, JSON.stringify(orderDto), buildAccessTokenConfig());
}

export function getOrder(orderDto) {
  return request.post(GET_ORDER_URL, JSON.stringify(orderDto), buildAccessTokenConfig());
}

export function getAllOrders(page, size, startDate, endDate) {
  const config = buildAccessTokenConfig();
  config.params = buildOrderParams(page, size, startDate, endDate);
  return request.get(GET_ALL_ORDERS_URL, config);
}

export function getAllOrdersForUser(usernameDto, page, size, startDate, endDate) {
  const config = buildAccessTokenConfig();
  config.params = buildOrderParams(page, size, startDate, endDate);
  return request.post(GET_ALL_ORDERS_URL, JSON.stringify(usernameDto), config);
}

export function deliverOrder(orderDto) {
  return request.put(DELIVER_ORDER_URL, JSON.stringify(orderDto), buildAccessTokenConfig());
}

export function cancelOrder(orderDto) {
  return request.put(CANCEL_ORDER_URL, JSON.stringify(orderDto), buildAccessTokenConfig());
}

export function returnOrder(orderDto) {
  return request.put(RETURN_ORDER_URL, JSON.stringify(orderDto), buildAccessTokenConfig());
}

export function finalizeOrder(orderDto) {
  return request.put(FINALIZE_ORDER_URL, JSON.stringify(orderDto), buildAccessTokenConfig());
}

export function deleteOrder(orderDto) {
  return request.delete(ORDER_URL, JSON.stringify(orderDto), buildAccessTokenConfig());
}
