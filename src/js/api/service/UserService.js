import { USERS_URL } from "../../constants/UrlConstants";
import { request, buildAccessTokenConfig } from "../backend";
import { buildUserParams } from "../builder/URLBuilder";

export async function createUser(userDto) {
  return await request.post(USERS_URL, JSON.stringify(userDto), buildAccessTokenConfig());
}

export async function updateUser(userDto) {
  return await request.put(USERS_URL, JSON.stringify(userDto), buildAccessTokenConfig());
}

export function getAllUsers(page, size) {
  const config = buildAccessTokenConfig();
  config.params = buildUserParams(page, size)
  return request.get(USERS_URL, config);
}

export function deleteUser(authenticationDto) {
  return request.delete(USERS_URL, JSON.stringify(authenticationDto), buildAccessTokenConfig());
}