export default class ProductCompareError extends Error {
  constructor(message) {
    super(message);
    this.name = "ProductCompareError";
  }
}