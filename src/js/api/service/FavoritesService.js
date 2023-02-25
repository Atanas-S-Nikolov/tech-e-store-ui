import { request, buildAccessTokenConfig } from "../backend";

export function getFavorites(usernameDto) {
  return request.post("/favorites", JSON.stringify(usernameDto), buildAccessTokenConfig());
}

export function addFavorite(favoritesDto) {
  return request.put("/favorites/add", JSON.stringify(favoritesDto), buildAccessTokenConfig());
}

export function removeFavorite(favoritesDto) {
  return request.put("/favorites/remove", JSON.stringify(favoritesDto), buildAccessTokenConfig());
}

export function deleteFavorites(usernameDto) {
  return request.delete("/favorites", JSON.stringify(usernameDto), buildAccessTokenConfig());
}