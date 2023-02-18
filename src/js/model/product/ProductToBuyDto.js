export default class ProductToBuyDto{
  constructor(productName, quantity) {
    this.productName = productName;
    this.quantity = quantity;
  }

  static convertToProductsToBuy(products) {
    const productsToBuy = [];
    products.forEach(p => {
      productsToBuy.push({
        "productName": p.product.name,
        "quantity": p.quantity
      })
    });
    return productsToBuy;
  }

  static buildProductsToBuy(name, quantity) {
    return [{
      "product": { name: name },
      "quantity": quantity
    }];
  }

  static buildProductToBuy(name) {
    return this.buildProductsToBuy(name, 1);
  }
}