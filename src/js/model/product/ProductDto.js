export default class ProductDto{
  constructor(price, stocks, category, type, brand, model, description, earlyAccess) {
    this.price = price;
    this.stocks = stocks;
    this.category = category;
    this.type = type;
    this.brand = brand;
    this.model = model;
    this.description = description;
    this.earlyAccess = earlyAccess;
  }
}