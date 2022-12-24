import { isNotBlank } from "../utils/StringUtils";

export default class ProductType {
  static DESKTOP_PC = new ProductType("Desktop PC", "Desktop PCs");
  static LAPTOP = new ProductType("Laptop", "Laptops");
  static TV = new ProductType("TV", "TVs");
  static MONITOR = new ProductType("Monitor", "Monitors");
  static KEYBOARD = new ProductType("Keyboard", "Keyboards")
  static MOUSE = new ProductType("Mouse", "Mice");
  static HEADSET = new ProductType("Headset", "Headsets");
  static EARPHONES = new ProductType("Earphones");
  static TWS = new ProductType("TWS");

  constructor(name, plural) {
    this.name = name;
    this.plural = isNotBlank(plural) ? plural : name;
  }

  static getValues() {
    return Object.values(ProductType);
  }
}