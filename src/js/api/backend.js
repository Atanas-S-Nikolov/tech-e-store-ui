import axios from "axios";
import { store } from "../redux/store.js";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json"
  }
})

export const formDataRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "multipart/form-data"
  }
})

export function buildAccessTokenConfig() {
  const accessToken = store.getState().authentication.accessToken;
  const config = {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  };
  return config;
}

export function buildRefreshTokenConfig() {
  const refreshToken = store.getState().authentication.refreshToken;
  return {
    headers: {
      'Authorization': `Bearer ${refreshToken}`
    }
  }
}