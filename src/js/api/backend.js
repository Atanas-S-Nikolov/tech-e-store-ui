import axios from "axios";
import { LOGIN_URL, REFRESH_TOKEN_URL, REGISTER_URL } from "../constants/UrlConstants";
import { buildProductUrl } from "./builder/URLBuilder";
import { store } from "../redux/store.js";
import { refreshTokenReducer } from "../redux/authenticationSlice";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const ROLE_ADMIN = "ROLE_ADMIN";
const ROLE_CUSTOMER = "ROLE_CUSTOMER";

const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json"
  }
})

const formDataRequest = axios.create({
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


function buildAccessTokenConfig() {
  const accessToken = store.getState().authentication.accessToken;
  const config = {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  };
  return config;
}

function buildRefreshTokenConfig() {
  const refreshToken = store.getState().authentication.refreshToken;
  return {
    headers: {
      'Authorization': `Bearer ${refreshToken}`
    }
  }
}

export function createProduct(productDto, images) {
  return executeBackendRequestWithRetry(() =>
    formDataRequest.post("/product", buildFormData(productDto, images), buildAccessTokenConfig()));
}

export function updateProduct(productDto, images) {
  return executeBackendRequestWithRetry(() => 
    formDataRequest.put("/product", buildFormData(productDto, images), buildAccessTokenConfig()));
}

export async function getProduct(productName) {
  return await request.get(buildProductUrl(productName));
}

export function getNotEarlyAccessProducts(category, type) {
  const categoryParamPart = category ? `&category=${category}` : "";
  const typeParamPart = type ? `&type=${type}` : "";
  return request.get(`/product?early_access=false${categoryParamPart}${typeParamPart}`);
}

export function getProducts(category, type) {
  const categoryParamPart = category ? `?category=${category}` : "";
  const typeParamPart = type ? `?type=${type}` : "";
  return request.get(`/product${categoryParamPart}${typeParamPart}`, buildAccessTokenConfig());
}

export function deleteProduct(productName) {
  return executeBackendRequestWithRetry(() => formDataRequest.delete(`/product/${productName}`, buildAccessTokenConfig()));
}

//cart
export function getCart(usernameDto) {
  return request.post("/cart", JSON.stringify(usernameDto), buildAccessTokenConfig());
}

export function updateCart(cartDto) {
  return request.put("/cart", JSON.stringify(cartDto), buildAccessTokenConfig());
}

export async function clearCart(usernameDto) {
  return await request.put("/cart/clear", JSON.stringify(usernameDto), buildAccessTokenConfig());
}

export function deleteCart(usernameDto) {
  return executeBackendRequestWithRetry(() =>
    request.delete("/cart", JSON.stringify(usernameDto), buildAccessTokenConfig()));
}

//user
function createUserWithRole(userDto, role) {
  return executeBackendRequestWithRetry(() => 
    request.post(`/user/role/${role}`, JSON.stringify(userDto), buildAccessTokenConfig()));
}

export function createAdmin(userDto) {
  return createUserWithRole(userDto, ROLE_ADMIN);
}

export function createCustomer(userDto) {
  return createUserWithRole(userDto, ROLE_CUSTOMER);
}

export function updateUser(userDto) {
  return executeBackendRequestWithRetry(() => request.put("/user", JSON.stringify(userDto), buildAccessTokenConfig()));
}

export function getAllUsers() {
  return executeBackendRequestWithRetry(() => request.get("/user", buildAccessTokenConfig()));
}

export function deleteUser(authenticationDto) {
  return executeBackendRequestWithRetry(() => 
    request.delete("/user", JSON.stringify(authenticationDto), buildAccessTokenConfig()));
}

//auth
export function login(authenticationDto) {
  return request.post(LOGIN_URL, JSON.stringify(authenticationDto));
}

export function register(userDto) {
  return request.post(REGISTER_URL, JSON.stringify(userDto));
}

export async function sendRefreshToken() {
  return await request.get(REFRESH_TOKEN_URL, buildRefreshTokenConfig());
}

export async function executeBackendRequestWithRetry(promise, retry = 1) {
  let result = undefined;
  
  try {
    result = await promise;
  } catch(error) {
    const statusCode = error.response.status;
    const data = error.response.data;
    if (statusCode === 400) {
      console.log(data);
    } else if (statusCode === 403) {
      const accessTokenFromBackend = sendRefreshToken().data.accessToken;
      store.dispatch(refreshTokenReducer({ accessToken: accessTokenFromBackend }));
      if (retry > 0) {
        executeBackendRequestWithRetry(Promise.resolve(promise), retry--)
      }
    }
    throw Error("Internal server error!");
  }


  // promise
  //   .then(response => {
  //     result = response.data;
  //   })
  //   .catch(error => {
  //     const statusCode = error.response.status;
  //     const data = error.response.data;
  //     if (statusCode === 400) {
  //       console.log(data);
  //     } else if (statusCode === 403) {
  //       const accessTokenFromBackend = sendRefreshToken().data.accessToken;
  //       store.dispatch(refreshTokenReducer({ accessToken: accessTokenFromBackend }));
  //       if (retry > 0) {
  //         executeBackendRequestWithRetry(Promise.resolve(promise), retry--)
  //       }
  //     }
  //     throw new Error("Internal server error!");
  //   });
  console.log(result.data);
  return result.data;
}