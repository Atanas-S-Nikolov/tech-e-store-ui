export default class ProductDto{
  constructor(name, price, stocks, category, type, earlyAccess) {
    this.name = name;
    this.price = price;
    this.stocks = stocks;
    this.category = category;
    this.type = type;
    this.earlyAccess = earlyAccess;
  }
}