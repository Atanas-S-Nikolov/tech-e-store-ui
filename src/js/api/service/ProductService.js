import { request, formDataRequest, buildAccessTokenConfig } from "../backend";
import { buildProductUrl, buildProductParams } from "../builder/URLBuilder";
import { PRODUCTS_URL } from "../../constants/UrlConstants";

function buildFormData(productDto, images) {
  const formData = new FormData();
  formData.append("product",  new Blob([JSON.stringify(productDto)], {
    type: "application/json"
  }));
  images?.forEach(image => formData.append("images", image));
  return formData;
}

export function createProduct(productDto, images) {
  return formDataRequest.post(PRODUCTS_URL, buildFormData(productDto, images), buildAccessTokenConfig());
}

export function updateProduct(productDto, images) {
  return formDataRequest.put(PRODUCTS_URL, buildFormData(productDto, images), buildAccessTokenConfig());
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

export function deleteProduct(productName) {
  return formDataRequest.delete(buildProductUrl(productName), buildAccessTokenConfig());
}
