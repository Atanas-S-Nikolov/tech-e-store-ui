import { request, formDataRequest, buildAccessTokenConfig } from "../backend";
import { buildProductUrl, buildProductParams, buildSearchParams, buildSearchQueryParams } from "../builder/URLBuilder";
import { PRODUCTS_URL, PRODUCTS_SEARCH_URL, PRODUCTS_SEARCH_QUERY_URL } from "../../constants/UrlConstants";

function buildFormData(productDto, images = [], mainImage, deleteImagesDto) {
  const formData = new FormData();
  formData.append("product",  new Blob([JSON.stringify(productDto)], {
    type: "application/json"
  }));
  images.forEach(image => formData.append("images", image));
  formData.append("mainImage", mainImage);
  if (deleteImagesDto) {
    formData.append("deleteImages",  new Blob([JSON.stringify(deleteImagesDto)], {
      type: "application/json"
    }));
  }
  
  return formData;
}

export function createProduct(productDto, images, mainImage) {
  return formDataRequest.post(PRODUCTS_URL, buildFormData(productDto, images, mainImage), buildAccessTokenConfig());
}

export function updateProduct(productDto, images, mainImage, deleteImages) {
  return formDataRequest.put(PRODUCTS_URL, buildFormData(productDto, images, mainImage, deleteImages), buildAccessTokenConfig());
}

export async function getProduct(productName) {
  return await request.get(buildProductUrl(productName));
}

export function getNotEarlyAccessProducts(page, size, category, type) {
  const params = buildProductParams(page, size, category, type, false);
  return request.get(PRODUCTS_URL, { params: params });
}

export function getProducts(page, size, category, type) {
  const config = buildAccessTokenConfig();
  config.params = buildProductParams(page, size, category, type);
  return request.get(PRODUCTS_URL, config);
}

export function searchProductsWithoutEarlyAccess(keyword) {
  const params = buildSearchParams(keyword, false);
  return request.get(PRODUCTS_SEARCH_URL, { params: params });
}

export function searchProducts(keyword) {
  const config = buildAccessTokenConfig();
  config.params = buildSearchParams(keyword);
  return request.get(PRODUCTS_SEARCH_URL, config);
}

export function searchQueryProductsWithoutEarlyAccess(page, size, keyword) {
  const params = buildSearchQueryParams(page, size, keyword, false);
  return request.get(PRODUCTS_SEARCH_QUERY_URL, { params: params });
}

export function searchQueryProducts(page, size, keyword) {
  const config = buildAccessTokenConfig();
  config.params = buildSearchQueryParams(page, size, keyword);
  return request.get(PRODUCTS_SEARCH_QUERY_URL, config);
}

export function deleteProduct(productName) {
  return formDataRequest.delete(buildProductUrl(productName), buildAccessTokenConfig());
}
