import axios from "axios";
import { LOGIN_URL, REFRESH_TOKEN_URL, REGISTER_URL } from "../constants/UrlConstants";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const ROLE_ADMIN = "ROLE_ADMIN";
const ROLE_CUSTOMER = "ROLE_CUSTOMER";

const backendRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json"
  }
})

const backendFormDataRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "multipart/form-data"
  }
})

//product
function buildFormData(productDto, images) {
  const formData = new FormData();
  formData.append("product", productDto);
  images?.forEach(image => formData.append("images", image));
  return formData;
}

export function createProduct(productDto, images) {
  return backendFormDataRequest.post("/product", buildFormData(productDto, images));
}

export function updateProduct(productDto, images) {
  return backendFormDataRequest.put("/product", buildFormData(productDto, images));
}

export function getProduct(productName) {
  return backendFormDataRequest.get(`/product/${productName}`);
}

export function getAllNotEarlyAccessProducts() {
  return backendFormDataRequest.get(`/product/?early_access=false`);
}

export function getAllProducts() {
  return backendFormDataRequest.get("/product");
}

export function deleteProduct(productName) {
  return backendFormDataRequest.delete(`/product/${productName}`);
}

//cart
export function getCart(usernameDto) {
  return backendRequest.get("/cart", JSON.stringify(usernameDto));
}

export function updateCart(cartDto) {
  return backendRequest.put("/cart", JSON.stringify(cartDto));
}

export function clearCart(usernameDto) {
  return backendRequest.put("/cart/clear", JSON.stringify(usernameDto));
}

export function deleteCart(usernameDto) {
  return backendRequest.delete("/cart", JSON.stringify(usernameDto));
}

//user
function createUserWithRole(userDto, role) {
  return backendRequest.post(`/user/role/${role}`, JSON.stringify(userDto));
}

export function createAdmin(userDto) {
  return createUserWithRole(userDto, ROLE_ADMIN);
}

export function createCustomer(userDto) {
  return createUserWithRole(userDto, ROLE_CUSTOMER);
}

export function updateUser(userDto) {
  return backendRequest.put("/user", JSON.stringify(userDto));
}

export function getAllUsers() {
  return backendRequest.get("/user");
}

export function deleteUser(authenticationDto) {
  return backendRequest.delete("/user", JSON.stringify(authenticationDto));
}

//auth
export function login(authenticationDto) {
  return backendRequest.post(LOGIN_URL, JSON.stringify(authenticationDto));
}

export function register(userDto) {
  return backendRequest.post(REGISTER_URL, JSON.stringify(userDto));
}

export function refreshToken() {
  return backendRequest.get(REFRESH_TOKEN_URL);
}