export default class ProductCategory {
  static AUDIO = new ProductCategory("Audio");
  static COMPUTERS_AND_LAPTOPS = new ProductCategory("Computers and laptops");
  static MICE_AND_KEYBOARDS = new ProductCategory("Mice and keyboards");
  static TV_AND_MONITORS = new ProductCategory("TV and Monitors");

  constructor(name) {
    this.name = name;
  }

  static getValues() {
    return Object.values(ProductCategory);
  }
}