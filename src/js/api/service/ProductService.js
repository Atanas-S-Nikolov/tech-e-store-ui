import { request, formDataRequest, buildAccessTokenConfig } from "../backend";
import { buildProductUrl } from "../builder/URLBuilder";

function buildFormData(productDto, images) {
  const formData = new FormData();
  formData.append("product", productDto);
  images?.forEach(image => formData.append("images", image));
  return formData;
}

export function createProduct(productDto, images) {
  return formDataRequest.post("/product", buildFormData(productDto, images), buildAccessTokenConfig());
}

export function updateProduct(productDto, images) {
  return formDataRequest.put("/product", buildFormData(productDto, images), buildAccessTokenConfig());
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
  const typeParamPart = type ? `&type=${type}` : "";
  return request.get(`/product${categoryParamPart}${typeParamPart}`, buildAccessTokenConfig());
}

export function deleteProduct(productName) {
  return formDataRequest.delete(`/product/${productName}`, buildAccessTokenConfig());
}