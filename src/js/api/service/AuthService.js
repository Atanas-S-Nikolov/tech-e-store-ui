import { request, buildRefreshTokenConfig } from "../backend";
import { LOGIN_URL, REFRESH_TOKEN_URL, REGISTER_URL, RESET_PASSWORD_URL } from "../../constants/UrlConstants";

export function login(authenticationDto) {
  return request.post(LOGIN_URL, JSON.stringify(authenticationDto));
}

export function register(userDto) {
  return request.post(REGISTER_URL, JSON.stringify(userDto));
}

export async function sendRefreshToken() {
  return await request.get(REFRESH_TOKEN_URL, buildRefreshTokenConfig());
}

export function resetPassword(resetPasswordDto) {
  return request.put(RESET_PASSWORD_URL, JSON.stringify(resetPasswordDto));
}
