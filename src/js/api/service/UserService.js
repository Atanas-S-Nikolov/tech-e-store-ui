import { request, buildAccessTokenConfig } from "../backend";

const ROLE_ADMIN = "ROLE_ADMIN";
const ROLE_CUSTOMER = "ROLE_CUSTOMER";

export function createAdmin(userDto) {
  return createUserWithRole(userDto, ROLE_ADMIN);
}

export function createCustomer(userDto) {
  return createUserWithRole(userDto, ROLE_CUSTOMER);
}

function createUserWithRole(userDto, role) {
  return request.post(`/user/role/${role}`, JSON.stringify(userDto), buildAccessTokenConfig());
}

export function updateUser(userDto) {
  return request.put("/user", JSON.stringify(userDto), buildAccessTokenConfig());
}

export function getAllUsers() {
  return request.get("/user", buildAccessTokenConfig());
}

export function deleteUser(authenticationDto) {
  return request.delete("/user", JSON.stringify(authenticationDto), buildAccessTokenConfig());
}