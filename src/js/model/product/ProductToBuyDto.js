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

  static buildProductToBuy(name, quantity = 1) {
    return [{
      "product": { name: name },
      "quantity": quantity
    }];
  }
}